import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const allArticles = [
  {
    id: 1,
    category: "Farming Tips",
    title: "Modern Farming Techniques for Better Yield",
    excerpt: "Discover how technology and innovative practices are revolutionizing agriculture and helping farmers increase their productivity across Bangladesh.",
    date: "March 1, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=400&fit=crop",
    author: "Md. Karim",
    authorRole: "Agricultural Expert",
  },
  {
    id: 2,
    category: "Organic",
    title: "The Rise of Organic Farming in Bangladesh",
    excerpt: "Learn about the growing trend of organic farming and how it's creating new opportunities for farmers while meeting the rising demand for chemical-free produce.",
    date: "February 25, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&h=400&fit=crop",
    author: "Fatima Khanam",
    authorRole: "Organic Farming Advisor",
  },
  {
    id: 3,
    category: "Market Trends",
    title: "Understanding Crop Price Fluctuations",
    excerpt: "Expert insights on market dynamics and strategies to maximize profits during different seasons and shifting market conditions in the region.",
    date: "February 20, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=600&h=400&fit=crop",
    author: "Rahim Uddin",
    authorRole: "Market Analyst",
  },
  {
    id: 4,
    category: "Technology",
    title: "Smart Irrigation: Saving Water, Growing More",
    excerpt: "How IoT-based irrigation systems are helping Bangladeshi farmers reduce water usage by up to 40% while maintaining or improving crop yields.",
    date: "February 15, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop",
    author: "Nusrat Jahan",
    authorRole: "AgriTech Researcher",
  },
  {
    id: 5,
    category: "Farming Tips",
    title: "Preparing Your Soil for the Rabi Season",
    excerpt: "A comprehensive guide to soil preparation techniques that ensure nutrient-rich land before the winter cropping season, with tips from experienced farmers.",
    date: "February 10, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&h=400&fit=crop",
    author: "Abdul Haque",
    authorRole: "Senior Agronomist",
  },
  {
    id: 6,
    category: "Market Trends",
    title: "Direct-to-Consumer Sales: A Game Changer for Farmers",
    excerpt: "How platforms like KrishiLink are empowering farmers to bypass traditional middlemen and connect directly with end consumers for better profits.",
    date: "February 5, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1592921870789-04563d55041c?w=600&h=400&fit=crop",
    author: "Sanjida Islam",
    authorRole: "Digital Agriculture Specialist",
  },
  {
    id: 7,
    category: "Organic",
    title: "Composting 101: Turn Waste into Crop Gold",
    excerpt: "A beginner's guide to building an effective composting system on your farm that reduces costs and produces rich, natural fertilizer for your crops.",
    date: "January 28, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop&crop=top",
    author: "Md. Hasan",
    authorRole: "Organic Farming Educator",
  },
  {
    id: 8,
    category: "Technology",
    title: "Mobile Apps Changing Agriculture in Bangladesh",
    excerpt: "Explore the top mobile applications helping farmers monitor weather, get price alerts, and access government subsidies right from their smartphones.",
    date: "January 22, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=600&h=400&fit=crop",
    author: "Reza Ahmed",
    authorRole: "Tech & Agriculture Blogger",
  },
  {
    id: 9,
    category: "Farming Tips",
    title: "Pest Management Without Harsh Chemicals",
    excerpt: "Effective, eco-friendly pest control strategies that protect your crops and the environment, while keeping production costs low and yields high.",
    date: "January 15, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=600&h=400&fit=crop",
    author: "Dr. Shirin Akter",
    authorRole: "Plant Pathologist",
  },
];

const categories = ["All", "Farming Tips", "Organic", "Market Trends", "Technology"];

const categoryColors = {
  "Farming Tips": "bg-[#4CAF50]",
  Organic: "bg-[#2E7D32]",
  "Market Trends": "bg-[#F57F17]",
  Technology: "bg-[#1565C0]",
};

const BlogsPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = allArticles.filter((a) => {
    const matchesCategory = activeCategory === "All" || a.category === activeCategory;
    const matchesSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-16 font-[Poppins,sans-serif]">
      {/* Hero Section */}
      <section className="bg-linear-to-br from-[#4CAF50] via-[#388E3C] to-[#2E7D32] py-20">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Knowledge & Insights
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5">
            Agro News & <span className="text-[#A5D6A7]">Blog</span>
          </h1>
          <p className="text-[#E8F5E9] text-lg max-w-2xl mx-auto mb-8">
            Stay up to date with the latest agricultural trends, farming tips, market insights,
            and success stories from across Bangladesh.
          </p>
          {/* Search Bar */}
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#A5D6A7] shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-[#4CAF50] text-white shadow-md scale-105"
                  : "bg-white text-[#4CAF50] border-2 border-[#4CAF50] hover:bg-[#4CAF50] hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Articles Grid */}
      <section className="container mx-auto px-4 pb-20">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">No articles found</h3>
            <p className="text-gray-500">Try adjusting your search or filter.</p>
          </div>
        ) : (
          <>
            <p className="text-gray-500 text-sm mb-6">
              Showing <span className="font-semibold text-[#4CAF50]">{filtered.length}</span> article{filtered.length !== 1 ? "s" : ""}
              {activeCategory !== "All" && (
                <> in <span className="font-semibold text-[#1A1A1A]">{activeCategory}</span></>
              )}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((article) => (
                <article
                  key={article.id}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-gray-200">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className={`absolute top-4 left-4 ${categoryColors[article.category] || "bg-[#4CAF50]"} text-white px-3 py-1 rounded-full text-xs font-semibold`}>
                      {article.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    {/* Meta */}
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {article.date}
                      </span>
                      <span className="text-gray-300">•</span>
                      <span>{article.readTime}</span>
                    </div>

                    <h3 className="text-lg font-bold text-[#1A1A1A] mb-2 group-hover:text-[#4CAF50] transition-colors leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3 flex-1">
                      {article.excerpt}
                    </p>

                    {/* Author & Read More */}
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#E8F5E9] rounded-full flex items-center justify-center text-[#4CAF50] font-bold text-sm">
                          {article.author.charAt(0)}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-[#1A1A1A]">{article.author}</p>
                          <p className="text-xs text-gray-500">{article.authorRole}</p>
                        </div>
                      </div>
                      <button className="text-[#4CAF50] text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                        Read
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </section>

      {/* Newsletter Section */}
      <section className="bg-linear-to-b from-[#F8FFF8] to-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-4xl mb-4">📬</div>
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-3">
              Stay in the <span className="text-[#4CAF50]">Loop</span>
            </h2>
            <p className="text-gray-600 mb-8">
              Get the latest agricultural news, farming tips, and market insights delivered straight to your inbox every week.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-[#4CAF50] text-[#1A1A1A]"
              />
              <button className="btn-primary whitespace-nowrap">Subscribe</button>
            </div>
            <p className="text-xs text-gray-400 mt-3">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-linear-to-r from-[#4CAF50] to-[#2E7D32] rounded-3xl p-10 text-center shadow-xl">
          <h2 className="text-3xl font-bold text-white mb-3">Want to Share Your Story?</h2>
          <p className="text-[#E8F5E9] text-lg mb-6 max-w-xl mx-auto">
            Are you a farmer with a success story or an agricultural expert? Join our community and reach thousands of readers.
          </p>
          <NavLink
            to="/contact"
            className="inline-flex items-center justify-center gap-2 bg-white text-[#4CAF50] px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all duration-200 shadow-lg hover:scale-105"
          >
            Get in Touch
          </NavLink>
        </div>
      </section>
    </div>
  );
};

export default BlogsPage;
