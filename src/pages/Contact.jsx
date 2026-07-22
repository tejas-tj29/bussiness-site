import ContactForm from "../components/ContactForm.jsx";
import { Helmet } from "react-helmet-async";

export default function Contact() {

  return (
    <div className="w-full bg-slate-950 py-16 px-4 min-h-[calc(100vh-4rem)]">
      <Helmet>
        <title>Contact Sarawagi Enterprises | Get a Quote Today</title>
        <meta
          name="description"
          content="Contact Sarawagi Enterprises for bulk industrial material orders. Reach out to our Jamshedpur office for inquiries, quotes, and distributorship details."
        />
        <meta
          name="keywords"
          content="Contact Sarawagi Enterprises, get industrial quote, chemical supplier contact, Jamshedpur office"
        />
      </Helmet>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Branding Side */}
        <div className="space-y-6">
          <span className="text-emerald-400 font-semibold uppercase tracking-wider text-sm">
            Sarawagi Enterprises B2B
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Let's build a powerful commercial pipeline.
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Have a bulk enterprise requirement or a custom product request? Fill
            out our secure portal form, and our commercial distribution team
            will review your specifications immediately.
          </p>
        </div>

        {/* Right Form Side */}
        <div>
          <ContactForm />
        </div>
      </div>
    </div>  
  );
}
