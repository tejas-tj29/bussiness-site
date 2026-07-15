import React from "react";
import { Helmet } from "react-helmet-async";

function Profile() {
  return (
    <div className="min-h-[80vh] bg-white py-16 px-6 sm:px-12 lg:px-24 relative overflow-hidden">
      
      {/* 🟢 SEO Optimization for Profile Page */}
      <Helmet>
        <title>Company Profile | Sarawagi Enterprises</title>
        <meta
          name="description"
          content="Learn about Sarawagi Enterprises. We deliver reliable industrial and construction solutions across Eastern India based on trust, quality, and performance."
        />
      </Helmet>

      {/* 🎨 Subtle Background Accent (Optional: Mimics the watermark feel on the left) */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gray-50 rounded-full mix-blend-multiply filter blur-3xl opacity-60 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

      {/* Main Content Container */}
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Fouress Style Header: Large, Uppercase, Heavy Blue */}
        <h1 className="text-3xl md:text-[40px] font-extrabold text-[#3B82F6] mb-8 tracking-wide uppercase">
          SARAWAGI ENTERPRISES
        </h1>

        {/* Fouress Style Text: Left aligned, widely spaced, sophisticated gray */}
        <div className="space-y-6 text-[#374151] text-[17px] md:text-[18px] leading-[1.85] font-normal">
          
          <p>
            At Sarawagi Enterprises, we are committed to delivering reliable industrial and construction 
            solutions that help our customers build, maintain, and improve their operations. Established 
            with a vision of providing quality products backed by exceptional service, we have grown into 
            a trusted partner for industries, infrastructure projects, contractors, and institutional 
            clients across Eastern India.
          </p>

          <p>
            Our strength lies in understanding our customers' requirements and providing solutions that 
            meet the highest standards of quality, performance, and reliability. We believe that every 
            project deserves products that perform consistently and a partner who can be relied upon from 
            inquiry to delivery and beyond. With a customer-first approach, we focus on building long-term 
            relationships through technical guidance, prompt service, transparent business practices, and 
            dependable support.
          </p>

          <p>
            Our experienced team works closely with clients to ensure they receive the right solutions for 
            their specific applications while maintaining efficiency, safety, and cost-effectiveness. Over 
            the years, we have earned the trust of leading industries by consistently delivering value 
            through professionalism, responsiveness, and an unwavering commitment to excellence. As we 
            continue to grow, our goal remains the same—to be recognized as one of the most trusted 
            industrial and construction solution providers in the region. At Sarawagi Enterprises, we don't 
            simply supply products—we build lasting partnerships based on trust, quality, and performance.
          </p>
          
        </div>
      </div>
    </div>
  );
}

export default Profile;