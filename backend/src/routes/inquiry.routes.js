import {Router} from "express";
import {Inquiry} from "../models/Inquiry.module.js";

const router = Router();

router.route('/')
    .get(async (req, res) => {
        try {
            const allInquiries = await Inquiry.find().sort({ createdAt: -1 });
            return res.status(200).json({
                success: true,
                count: allInquiries.length, 
                data: allInquiries
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: "Server Error: Unable to fetch inquiries from the database.",
                error: error.message
            });
        }
    })
    .post(async(req,res)=>{
        try{
            const {name,email,phone,message,company} = req.body;
            if (!name || !email || !phone || !message) {
                return res.status(400).json({
                    success: false,
                    message: "Validation Error: All fields are mandatory."
                });
            }
            const newInquiry = await Inquiry.create({
                name,
                email,
                phone,
                message,
                company,
            });
            return res.status(201).json({
                success: true,
                message: "Inquiry successfully logged in Atlas!",
                data: newInquiry
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: "Server Error: Could not process submission.",
                error: error.message
            });
        }
      });

router.route('/:id')
      .delete(async(req,res)=>{
        try{
            const {id} = req.params;
            const deletedInquiry = await Inquiry.findByIdAndDelete(id);
            if (!deletedInquiry) {
                return res.status(404).json({
                    success: false,
                    message: "Inquiry not found."
                });
            }   
            return res.status(200).json({
                success: true,
                message: "Inquiry cleanly purged from the cloud database cluster!",
                data: deletedInquiry 
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: "Server Error: Could not complete deletion workflow.",
                error: error.message
            });
        }
      })
      .patch(async(req,res)=>{
        try{
            const {id} = req.params;
            const {status} = req.body;
            if (!status) {
                return res.status(400).json({
                    success: false,
                    message: "Validation Error: Status field is required for this update."
                });
            }
            const updatedInquiry = await Inquiry.findByIdAndUpdate(
                id,
                { status },
                { 
                    returnDocument: 'after', 
                    runValidators: true 
                }
            );
            if (!updatedInquiry) {
                return res.status(404).json({
                    success: false,
                    message: "Update Failed: No matching record found."
                });
            }
            return res.status(200).json({
                success: true,
                message: `Inquiry status updated to '${status}' successfully!`,
                data: updatedInquiry
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: "Server Error: Could not complete update workflow.",
                error: error.message
            });
        }
      });
export default router;