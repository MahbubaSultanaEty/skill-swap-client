"use client";

import Link from "next/link";
import { Palette, PenLine, Code, Megaphone, LayoutGrid } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const categories = [
  { name: "Design", icon: Palette, href: "/tasks?category=Design", gradient: "linear-gradient(135deg, #bbf7d0, #86efac)" },
  { name: "Writing", icon: PenLine, href: "/tasks?category=Writing", gradient: "linear-gradient(135deg, #a7f3d0, #6ee7b7)" },
  { name: "Development", icon: Code, href: "/tasks?category=Development", gradient: "linear-gradient(135deg, #d1fae5, #a7f3d0)" },
  { name: "Marketing", icon: Megaphone, href: "/tasks?category=Marketing", gradient: "linear-gradient(135deg, #bbf7d0, #4ade80)" },
  { name: "Other", icon: LayoutGrid, href: "/tasks?category=Other", gradient: "linear-gradient(135deg, #dcfce7, #86efac)" },
];

export default function CategorySlider() {
  return (
    <>
      <style>{`
        .cat-section { padding: 64px 24px; background: #f8faf8; }
        .cat-inner { max-width: 1280px; margin: 0 auto; }
        .cat-header { margin-bottom: 40px; }
        .cat-tag { display: inline-flex; align-items: center; gap: 6px; background: #dcfce7; color: #15803d; font-size: 12px; font-weight: 600; padding: 4px 12px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 12px; }
        .cat-title { font-size: 36px; font-weight: 700; color: #14532d; letter-spacing: -0.8px; line-height: 1.2; margin: 0 0 10px; }
        .cat-subtitle { font-size: 15px; color: #6b7280; margin: 0; }

        .cat-card { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; border-radius: 20px; padding: 36px 20px; text-decoration: none; position: relative; overflow: hidden; border: 1.5px solid #dcfce7; background: #fff; transition: transform 0.3s cubic-bezier(.34,1.56,.64,1), box-shadow 0.3s ease, border-color 0.3s ease; cursor: pointer; }
        .cat-card:hover { transform: translateY(-8px) scale(1.02); box-shadow: 0 20px 40px rgba(21,128,61,0.15); border-color: #86efac; }
        .cat-card::before { content: ''; position: absolute; inset: 0; opacity: 0; transition: opacity 0.3s ease; }
        .cat-card:hover::before { opacity: 1; }

        .cat-icon-wrap { width: 64px; height: 64px; border-radius: 16px; display: flex; align-items: center; justify-content: center; transition: transform 0.3s cubic-bezier(.34,1.56,.64,1); }
        .cat-card:hover .cat-icon-wrap { transform: scale(1.15) rotate(-5deg); }

        .cat-name { font-size: 16px; font-weight: 700; color: #14532d; }
        .cat-count { font-size: 12px; color: #6b7280; }
        .cat-arrow { font-size: 18px; color: #15803d; opacity: 0; transform: translateX(-6px); transition: all 0.25s ease; }
        .cat-card:hover .cat-arrow { opacity: 1; transform: translateX(0); }

        .swiper { padding-bottom: 12px !important; }
        .swiper-slide { height: auto; }
      `}</style>

      <section className="cat-section">
        <div className="cat-inner">
          <div className="cat-header">
            <div className="cat-tag">✦ Categories</div>
            <h2 className="cat-title">Browse by Category</h2>
            <p className="cat-subtitle">Find skilled freelancers for every type of task</p>
          </div>

          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 2200, disableOnInteraction: false, pauseOnMouseEnter: true }}
            loop={true}
            spaceBetween={16}
            slidesPerView={1.3}
            breakpoints={{
              480: { slidesPerView: 2.2 },
              768: { slidesPerView: 3.2 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 4 },
            }}
          >
            {categories.map(({ name, icon: Icon, href, gradient }) => (
              <SwiperSlide key={name}>
                <Link href={href} className="cat-card">
                  <div className="cat-icon-wrap" style={{ background: gradient }}>
                    <Icon size={28} color="#15803d" />
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div className="cat-name">{name}</div>
                    <div className="cat-count">Explore tasks →</div>
                  </div>
                  <span className="cat-arrow">→</span>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
}