"use client";

import { useState } from "react";
import Link from "next/link";
import { ClipboardList, Inbox, BadgeCheck, ChevronDown, ArrowRight, Zap, Shield, Star } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Post a Task",
    description: "Describe what you need — add a title, category, budget, and deadline. It takes less than 2 minutes to go live.",
    bg: "linear-gradient(135deg, #bbf7d0, #86efac)",
    details: ["Set your own budget", "Choose a deadline", "Pick a category", "Task goes live instantly"],
  },
  {
    number: "02",
    icon: Inbox,
    title: "Receive Proposals",
    description: "Skilled freelancers review your task and send proposals with their price, timeline, and a personal message.",
    bg: "linear-gradient(135deg, #a7f3d0, #4ade80)",
    details: ["Compare proposals side by side", "Read cover messages", "Check freelancer ratings", "No obligation to accept"],
  },
  {
    number: "03",
    icon: BadgeCheck,
    title: "Hire & Pay Securely",
    description: "Accept the best proposal, pay via Stripe, and the freelancer gets to work. Release payment when you're satisfied.",
    bg: "linear-gradient(135deg, #dcfce7, #86efac)",
    details: ["Stripe-secured payment", "Work starts after payment", "Submit deliverables", "Leave a review after"],
  },
];

const faqs = [
  { question: "How do I know my payment is safe?", answer: "All payments go through Stripe — one of the world's most trusted payment platforms. Your card details are never stored on our servers." },
  { question: "Can I negotiate the price with a freelancer?", answer: "Yes! Freelancers submit their proposed budget in their proposal. You can message them to discuss before accepting." },
  { question: "What happens if I'm not happy with the work?", answer: "You can ask the freelancer to revise the deliverable. If needed, our support team is here to help resolve any disputes." },
  { question: "How do I become a freelancer on SkillSwap?", answer: "Simply register with your email and select the Freelancer option during sign-up. Complete your profile and start applying to tasks." },
  { question: "Is there a fee for posting tasks?", answer: "Posting tasks is completely free for clients. SkillSwap only takes a small platform fee from completed transactions." },
  { question: "How quickly can I get proposals?", answer: "Most tasks receive their first proposal within a few hours. Popular categories like Design and Development tend to get responses fastest." },
];

const whyUs = [
  { icon: Zap, title: "Fast & Simple", desc: "Post a task in under 2 minutes. No lengthy forms or contracts." },
  { icon: Shield, title: "Secure Payments", desc: "Every payment is processed through Stripe with full encryption." },
  { icon: Star, title: "Vetted Freelancers", desc: "Real ratings and reviews from verified clients on every profile." },
];

export default function HowItWorksPage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div style={{ background: "#f8faf8" }} className="min-h-screen">

      {/* HERO */}
      <section className="relative overflow-hidden px-6 pb-10 pt-20 text-center">
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(21,128,61,0.07), transparent)" }} />
        <div className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-5" style={{ background: "#dcfce7", color: "#15803d" }}>
          ✦ How It Works
        </div>
        <h1 className="mx-auto mb-4 max-w-2xl text-5xl font-extrabold leading-tight tracking-tight" style={{ color: "#14532d" }}>
          Get things done in{" "}
          <span style={{ color: "#15803d" }}>3 simple steps</span>
        </h1>
        <p className="mx-auto mb-8 max-w-md text-[17px] leading-relaxed" style={{ color: "#6b7280" }}>
          SkillSwap connects clients with skilled freelancers for fast, affordable micro-tasks.
        </p>      
      </section>

      {/* STEPS */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-14 text-center">
          <h2 className="mb-2 text-4xl font-extrabold tracking-tight" style={{ color: "#14532d" }}>The Process</h2>
          <p className="text-[15px]" style={{ color: "#6b7280" }}>Simple, transparent, and designed for speed</p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map(({ number, icon: Icon, title, description, bg, details }, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-3xl border p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              style={{ background: "#fff", borderColor: "#dcfce7" }}
            >
              {/* bg circle decoration */}
              <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full transition-transform duration-500 group-hover:scale-150" style={{ background: "#f0fdf4" }} />
              <div className="relative z-10">
                <div className="mb-4 text-7xl font-black leading-none" style={{ color: "#dcfce7" }}>{number}</div>
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:rotate-[-5deg] group-hover:scale-110" style={{ background: bg }}>
                  <Icon size={26} color="#15803d" />
                </div>
                <h3 className="mb-2 text-xl font-bold" style={{ color: "#14532d" }}>{title}</h3>
                <p className="mb-5 text-sm leading-relaxed" style={{ color: "#6b7280" }}>{description}</p>
                <ul className="space-y-1.5">
                  {details.map((d, j) => (
                    <li key={j} className="flex items-center gap-2 text-[13px]" style={{ color: "#374151" }}>
                      <span className="font-bold" style={{ color: "#15803d" }}>✓</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>      

      {/* FAQ */}
      <section className="mx-auto max-w-2xl px-6 py-20">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-4xl font-extrabold tracking-tight" style={{ color: "#14532d" }}>Frequently Asked Questions</h2>
          <p className="text-[15px]" style={{ color: "#6b7280" }}>Everything you need to know before getting started</p>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border transition-all duration-200"
              style={{
                background: "#fff",
                borderColor: openFaq === i ? "#86efac" : "#dcfce7",
                boxShadow: openFaq === i ? "0 8px 24px rgba(21,128,61,0.08)" : "none",
              }}
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="text-[15px] font-semibold" style={{ color: "#14532d" }}>{faq.question}</span>
                <ChevronDown
                  size={18}
                  style={{ color: "#15803d", flexShrink: 0, transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }}
                />
              </button>
              {openFaq === i && (
                <div className="border-t px-6 pb-5 pt-4 text-sm leading-relaxed" style={{ color: "#6b7280", borderColor: "#f0fdf4" }}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="mx-6 mb-20 max-w-7xl overflow-hidden rounded-3xl px-10 py-16 text-center relative xl:mx-auto" style={{ background: "linear-gradient(135deg, #14532d, #15803d)" }}>
        <div className="pointer-events-none absolute -right-14 -top-14 h-48 w-48 rounded-full" style={{ background: "rgba(255,255,255,0.05)" }} />
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-36 w-36 rounded-full" style={{ background: "rgba(255,255,255,0.05)" }} />
        <h2 className="relative z-10 mb-3 text-4xl font-extrabold tracking-tight" style={{ color: "#fff" }}>Ready to get started?</h2>
        <p className="relative z-10 mb-8 text-[16px]" style={{ color: "rgba(255,255,255,0.75)" }}>Join thousands of clients and freelancers already using SkillSwap</p>
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-3">
          {/* <Link href="/register" className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-[15px] font-bold no-underline transition-all hover:-translate-y-0.5" style={{ background: "#fff", color: "#14532d" }}>
            Post a Task <ArrowRight size={15} />
          </Link> */}
          <Link href="/tasks" className="inline-flex items-center rounded-xl border-2 px-7 py-3.5 text-[15px] font-semibold no-underline transition-all hover:opacity-80" style={{ borderColor: "rgba(255,255,255,0.4)", color: "#fff" }}>
            Browse Tasks
          </Link>
        </div>
      </div>

    </div>
  );
}