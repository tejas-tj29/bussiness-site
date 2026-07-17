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

      {/* 🎨 Subtle Background Accent */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gray-50 rounded-full mix-blend-multiply filter blur-3xl opacity-60 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

      {/* Main Content Container */}
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Fouress Style Header */}
        <h1 className="text-3xl md:text-[40px] font-extrabold text-[#3B82F6] mb-8 tracking-wide uppercase">
          SARAWAGI ENTERPRISES
        </h1>

        {/* Fouress Style Text with SEO Keywords subtly highlighted */}
        <div className="space-y-6 text-[#374151] text-[17px] md:text-[18px] leading-[1.85] font-normal">
          <p>
            At Sarawagi Enterprises, we are committed to delivering reliable
            industrial and construction solutions that help our customers build,
            maintain, and improve their operations. Established with a vision of
            providing quality products backed by exceptional service, we have
            grown into a trusted partner and{" "}
            <strong className="font-semibold text-[#1f2937]">
              authorized distributor
            </strong>{" "}
            for industries, infrastructure projects, contractors, and
            institutional clients across{" "}
            <strong className="font-semibold text-[#1f2937]">
              Jamshedpur, Jharkhand, and Eastern India
            </strong>
            .
          </p>

          <p>
            Our strength lies in understanding our customers' requirements and
            acting as a premier{" "}
            <strong className="font-semibold text-[#1f2937]">
              supplier of industrial valves, filters, actuators, and construction chemicals
            </strong>
            . We believe that every project deserves products that perform
            consistently and a partner who can be relied upon from inquiry to
            delivery and beyond. With a customer-first approach, we focus on
            building long-term relationships through technical guidance, prompt
            service, transparent business practices, and dependable support.
          </p>

          <p>
            Our experienced team works closely with clients to ensure they
            receive the right solutions for their specific applications while
            maintaining efficiency, safety, and cost-effectiveness. Over the
            years, we have earned the trust of leading industries—
            <strong className="font-semibold text-[#1f2937]">
              proudly serving industry giants like Tata Steel alongside numerous
              other valued enterprises
            </strong>
            —by consistently delivering value through professionalism,
            responsiveness, and an unwavering commitment to excellence. As we
            continue to grow, our goal remains the same—to be recognized as one
            of the most trusted{" "}
            <strong className="font-semibold text-[#1f2937]">
              industrial and construction material suppliers
            </strong>{" "}
            in the region. At Sarawagi Enterprises, we don't simply supply
            products—we build lasting partnerships based on trust, quality, and
            performance.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
