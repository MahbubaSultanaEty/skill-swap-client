"use client";
import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";

export default function Testimonials() {

 const reviews = [
  {
    id: 1,
    name: "Arif Rahman",
    role: "Client (Web Developer)",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    comment: "Coming to SkillSwap, I got my CSS bug fixed by an expert freelancer within just 2 hours. Top-notch service!",
    rating: 5
  },
  {
    id: 2,
    name: "Nusrat Jahan",
    role: "Freelancer (UI Designer)",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    comment: "This platform is amazing for earning part-time by doing small micro-tasks. The payment system and security are completely worry-free.",
    rating: 5
  },
  {
    id: 3,
    name: "Siam Ahmed",
    role: "Client (Startup Founder)",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    comment: "I found several skilled freelancers at once for my logo design and content writing needs. Budget-friendly and super fast!",
    rating: 4
  }
];

  return (
    <section className="w-full bg-[#f8faf8] py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f1a0f] tracking-tight mb-3">
            What Our Users Say
          </h2>
          <p className="text-sm md:text-base text-gray-600 max-w-xl mx-auto">
            See how clients and freelancers are swapping skills and building successful relationships worldwide.
          </p>
        </div>

        {/* Testimonials Grid Layout */}
        {/* md:grid-cols-3 নিশ্চিত করবে বড় স্ক্রিনে পাশাপাশি ৩টা কার্ড থাকবে এবং ছোট স্ক্রিনে কলামে ১টা করে দেখাবে */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div 
              key={review.id} 
              className="bg-white border border-[#15803d]/10 hover:border-[#15803d]/40 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      strokeWidth={2}
                      // রেটিং অনুযায়ী স্টার কালার পরিবর্তন (গ্রিন অ্যাকসেন্ট)
                      color={i < review.rating ? "#22c55e" : "#e2e8f0"} 
                      className={i < review.rating ? "fill-[#22c55e]" : "fill-transparent"}
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-[#0f1a0f] text-sm md:text-base leading-relaxed italic mb-6">
                  "{review.comment}"
                </p>
              </div>

              {/* User Info Wrapper */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#15803d]/20">
                  <Image 
                    src={review.image} 
                    alt={review.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0f1a0f] group-hover:text-[#15803d] transition-colors">
                    {review.name}
                  </h4>
                  <p className="text-xs text-gray-500 font-medium">
                    {review.role}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}