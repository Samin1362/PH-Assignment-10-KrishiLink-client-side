import React, { useState } from "react";

const contactInfo = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#4CAF50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: "Email Us",
    value: "support@krishilink.com",
    sub: "We reply within 24 hours",
    href: "mailto:support@krishilink.com",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#4CAF50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: "Call Us",
    value: "+880 1700-000000",
    sub: "Mon–Sat, 9am–6pm BST",
    href: "tel:+8801700000000",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#4CAF50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: "Visit Us",
    value: "Dhaka, Bangladesh",
    sub: "Farmgate, Dhaka-1215",
    href: null,
  },
];

const subjects = [
  "General Inquiry",
  "Technical Support",
  "Listing Issues",
  "Account & Profile",
  "Partnership / Collaboration",
  "Feedback & Suggestions",
  "Other",
];

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-16 font-[Poppins,sans-serif]">
      {/* Hero Section */}
      <section className="bg-linear-to-br from-[#4CAF50] via-[#388E3C] to-[#2E7D32] py-20">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            We're Here to Help
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5">
            Get in <span className="text-[#A5D6A7]">Touch</span>
          </h1>
          <p className="text-[#E8F5E9] text-lg max-w-xl mx-auto">
            Have a question, feedback, or need support? Our team is ready to assist you. Reach out through any channel below.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactInfo.map(({ icon, label, value, sub, href }) => (
            <div
              key={label}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center"
            >
              <div className="w-16 h-16 bg-[#E8F5E9] rounded-full flex items-center justify-center mx-auto mb-5">
                {icon}
              </div>
              <h3 className="font-bold text-[#1A1A1A] text-lg mb-2">{label}</h3>
              {href ? (
                <a
                  href={href}
                  className="text-[#4CAF50] font-semibold hover:underline text-base block mb-1"
                >
                  {value}
                </a>
              ) : (
                <p className="text-[#4CAF50] font-semibold text-base mb-1">{value}</p>
              )}
              <p className="text-gray-500 text-sm">{sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form + Office Hours */}
      <section className="bg-linear-to-b from-[#F8FFF8] to-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-10">
                <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">Send Us a Message</h2>
                <p className="text-gray-500 mb-8">Fill out the form below and we'll get back to you as soon as possible.</p>

                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-20 h-20 bg-[#E8F5E9] rounded-full flex items-center justify-center mb-5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#4CAF50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Message Sent!</h3>
                    <p className="text-gray-600 mb-6">Thank you for reaching out, <span className="font-semibold text-[#4CAF50]">{form.name}</span>. We'll get back to you within 24 hours.</p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                      className="btn-outline"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold text-[#1A1A1A] mb-1.5" htmlFor="name">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={form.name}
                          onChange={handleChange}
                          placeholder="e.g. Rahul Hasan"
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-[#4CAF50] text-[#1A1A1A] placeholder-gray-400 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#1A1A1A] mb-1.5" htmlFor="email">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-[#4CAF50] text-[#1A1A1A] placeholder-gray-400 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#1A1A1A] mb-1.5" htmlFor="subject">
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={form.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-[#4CAF50] text-[#1A1A1A] transition-colors bg-white"
                      >
                        <option value="" disabled>Select a subject</option>
                        {subjects.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#1A1A1A] mb-1.5" htmlFor="message">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Describe your question or issue in detail..."
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-[#4CAF50] text-[#1A1A1A] placeholder-gray-400 resize-none transition-colors"
                      />
                    </div>

                    <button type="submit" className="btn-primary w-full text-center text-base">
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Sidebar: Office Hours + Map Placeholder */}
            <div className="space-y-6">
              {/* Office Hours */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-7">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-[#E8F5E9] rounded-xl flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#4CAF50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-[#1A1A1A] text-lg">Office Hours</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { day: "Saturday – Thursday", time: "9:00 AM – 6:00 PM" },
                    { day: "Friday", time: "10:00 AM – 2:00 PM" },
                  ].map(({ day, time }) => (
                    <div key={day} className="flex justify-between items-center py-2.5 border-b border-gray-100 last:border-0">
                      <span className="text-sm text-gray-600">{day}</span>
                      <span className="text-sm font-semibold text-[#4CAF50]">{time}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center py-2.5">
                    <span className="text-sm text-gray-600">Public Holidays</span>
                    <span className="text-sm font-semibold text-red-500">Closed</span>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-linear-to-br from-[#E8F5E9] to-[#A5D6A7] h-44 flex flex-col items-center justify-center relative">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#4CAF50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <p className="text-[#2E7D32] font-semibold text-sm">Farmgate, Dhaka</p>
                  <p className="text-[#388E3C] text-xs mt-0.5">Bangladesh</p>
                </div>
                <div className="p-5">
                  <p className="text-sm text-gray-600 text-center">
                    House 12, Road 7, Farmgate<br />Dhaka-1215, Bangladesh
                  </p>
                </div>
              </div>

              {/* Quick Tips */}
              <div className="bg-[#4CAF50] rounded-2xl p-6 text-white">
                <h3 className="font-bold text-lg mb-3">💡 Quick Tips</h3>
                <ul className="space-y-2 text-[#E8F5E9] text-sm">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5">•</span>
                    For faster support, include your registered email in the message.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5">•</span>
                    For listing issues, mention the crop title and listing ID.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5">•</span>
                    We aim to respond to all inquiries within one business day.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Teaser */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-linear-to-r from-[#F8FFF8] to-white rounded-3xl border border-[#A5D6A7] p-10 text-center">
          <div className="text-4xl mb-4">❓</div>
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-3">Looking for Quick Answers?</h2>
          <p className="text-gray-600 max-w-md mx-auto mb-6">
            Check out our How It Works page for answers to the most common questions about using KrishiLink.
          </p>
          <a href="/how-it-works" className="btn-outline">
            View FAQ
          </a>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
