import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const faqs = [
  {
    question: "Is KrishiLink free to use?",
    answer:
      "Yes! Creating an account and browsing crop listings is completely free. Farmers can list their crops at no cost and buyers can connect without any subscription fees.",
  },
  {
    question: "How do I verify a seller's crop quality?",
    answer:
      "Every listing includes detailed crop information, photos, and the seller's profile with ratings. You can also message the seller directly to ask questions before agreeing on a deal.",
  },
  {
    question: "What areas does KrishiLink cover?",
    answer:
      "KrishiLink currently covers 20+ districts across Bangladesh, with ongoing expansion. Farmers from Dhaka, Chittagong, Rajshahi, Khulna, Sylhet, Barishal, Rangpur, and Mymensingh divisions are all active on the platform.",
  },
  {
    question: "How do I handle payments?",
    answer:
      "KrishiLink facilitates the connection between buyers and sellers. Payment is negotiated directly between the two parties. We recommend using trusted mobile banking services like bKash or Nagad for secure transactions.",
  },
  {
    question: "Can I post multiple crop listings?",
    answer:
      "Absolutely! You can post as many crop listings as you have available. Each listing can have its own price, quantity, location, and photos.",
  },
  {
    question: "What happens after I express interest in a crop?",
    answer:
      "When you mark interest in a listing, the seller is notified. Both parties can then connect through the platform's messaging system to negotiate and finalize the deal.",
  },
];

const farmerSteps = [
  {
    step: 1,
    title: "Create Your Account",
    desc: "Sign up for free using your email. Set up your farmer profile with your location, farm details, and contact information.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#4CAF50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
    ),
  },
  {
    step: 2,
    title: "List Your Crops",
    desc: "Add your crop details — name, variety, quantity, price, harvest date, and photos. The more detail you add, the faster you'll attract buyers.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#4CAF50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    ),
  },
  {
    step: 3,
    title: "Receive Buyer Interests",
    desc: "Get notified when buyers express interest in your listing. Review their profiles and respond to inquiries directly through the platform.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#4CAF50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
  },
  {
    step: 4,
    title: "Finalize & Get Paid",
    desc: "Negotiate pricing and delivery details directly with the buyer. Complete the transaction and build long-term relationships for repeat business.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#4CAF50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const buyerSteps = [
  {
    step: 1,
    title: "Browse Listings",
    desc: "Explore thousands of fresh crop listings from verified farmers across Bangladesh. Filter by crop type, price, location, and availability.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#2E7D32]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    step: 2,
    title: "Review Crop Details",
    desc: "Check crop photos, variety, quantity, pricing, and harvest date. Read the farmer's profile and ratings from previous transactions.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#2E7D32]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    step: 3,
    title: "Express Interest",
    desc: "Click 'I'm Interested' on a listing to notify the farmer. The farmer will get in touch to discuss availability and negotiate pricing.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#2E7D32]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    step: 4,
    title: "Complete the Deal",
    desc: "Agree on a price, arrange delivery or pickup, and complete the purchase. Leave a review to help the community and build trust.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#2E7D32]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
];

const benefits = [
  { title: "No Middlemen", desc: "Deal directly with farmers or buyers and keep more of your money.", emoji: "🤝" },
  { title: "Fresh & Local", desc: "Source produce directly from farms for maximum freshness.", emoji: "🌿" },
  { title: "Verified Listings", desc: "All crop details are provided by registered, accountable farmers.", emoji: "✅" },
  { title: "Fair Prices", desc: "Transparent pricing that benefits both farmers and buyers.", emoji: "💰" },
  { title: "Wide Coverage", desc: "Connect with farmers and buyers from 20+ districts nationwide.", emoji: "🗺️" },
  { title: "Secure & Trusted", desc: "A platform built on community trust, reviews, and transparency.", emoji: "🔒" },
];

const HowItWorksPage = () => {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="pt-16 font-[Poppins,sans-serif]">
      {/* Hero Section */}
      <section className="bg-linear-to-br from-[#4CAF50] via-[#388E3C] to-[#2E7D32] py-20">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Simple. Fast. Transparent.
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5">
            How <span className="text-[#A5D6A7]">KrishiLink</span> Works
          </h1>
          <p className="text-[#E8F5E9] text-lg max-w-2xl mx-auto leading-relaxed">
            Whether you're a farmer looking to sell or a buyer searching for fresh produce,
            KrishiLink makes the process simple, fair, and efficient.
          </p>
        </div>
      </section>

      {/* For Farmers Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-12 h-12 bg-[#E8F5E9] rounded-xl flex items-center justify-center text-2xl">🌾</div>
          <div>
            <h2 className="text-3xl font-bold text-[#1A1A1A]">For Farmers</h2>
            <p className="text-gray-600">Sell your crops directly and earn more</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {farmerSteps.map(({ step, title, desc, icon }) => (
            <div key={step} className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 h-full">
                <div className="absolute -top-5 left-7">
                  <div className="w-10 h-10 bg-[#4CAF50] rounded-xl flex items-center justify-center text-white text-lg font-bold shadow-md">
                    {step}
                  </div>
                </div>
                <div className="mt-4 mb-4">
                  <div className="w-16 h-16 bg-[#E8F5E9] rounded-full flex items-center justify-center mx-auto">
                    {icon}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-2 text-center">{title}</h3>
                <p className="text-gray-600 text-sm text-center leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto px-4">
        <div className="border-t border-gray-100"></div>
      </div>

      {/* For Buyers Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-12 h-12 bg-[#E8F5E9] rounded-xl flex items-center justify-center text-2xl">🛒</div>
          <div>
            <h2 className="text-3xl font-bold text-[#1A1A1A]">For Buyers</h2>
            <p className="text-gray-600">Source fresh produce directly from farms</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {buyerSteps.map(({ step, title, desc, icon }) => (
            <div key={step} className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 h-full">
                <div className="absolute -top-5 left-7">
                  <div className="w-10 h-10 bg-[#2E7D32] rounded-xl flex items-center justify-center text-white text-lg font-bold shadow-md">
                    {step}
                  </div>
                </div>
                <div className="mt-4 mb-4">
                  <div className="w-16 h-16 bg-[#E8F5E9] rounded-full flex items-center justify-center mx-auto">
                    {icon}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-2 text-center">{title}</h3>
                <p className="text-gray-600 text-sm text-center leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-linear-to-b from-[#F8FFF8] to-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-3">
              Why Thousands Choose <span className="text-[#4CAF50]">KrishiLink</span>
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Built with farmers and buyers in mind — here's what makes us different.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map(({ title, desc, emoji }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-7 shadow-md border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-start gap-4"
              >
                <div className="w-14 h-14 bg-[#E8F5E9] rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                  {emoji}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1A1A1A] mb-1">{title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-3">
            Frequently Asked <span className="text-[#4CAF50]">Questions</span>
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Have questions? We've got answers. If you can't find what you're looking for, feel free to{" "}
            <NavLink to="/contact" className="text-[#4CAF50] hover:underline font-medium">contact us</NavLink>.
          </p>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span className="font-semibold text-[#1A1A1A] pr-4">{faq.question}</span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${openFaq === i ? "bg-[#4CAF50] text-white rotate-45" : "bg-[#E8F5E9] text-[#4CAF50]"}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
              </button>
              {openFaq === i && (
                <div className="px-6 pb-5">
                  <p className="text-gray-600 leading-relaxed border-t border-gray-100 pt-4">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 pb-20">
        <div className="bg-linear-to-r from-[#4CAF50] to-[#2E7D32] rounded-3xl p-12 text-center shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-[#E8F5E9] text-lg mb-8 max-w-xl mx-auto">
            Join the KrishiLink community today — it's free, simple, and built for Bangladesh's agricultural sector.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <NavLink
              to="/register"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#4CAF50] px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Create Free Account
            </NavLink>
            <NavLink
              to="/all-crops"
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-[#4CAF50] transition-all duration-200"
            >
              Browse Crops
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksPage;
