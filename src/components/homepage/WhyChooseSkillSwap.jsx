"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  BriefcaseBusiness,
  BadgeDollarSign,
  Users,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description:
      "Protected Stripe payments ensure safe transactions between clients and freelancers.",
  },
  {
    icon: Users,
    title: "Verified Talent",
    description:
      "Browse skilled freelancers with profiles, ratings, and completed projects.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Quality Proposals",
    description:
      "Receive competitive proposals and hire the best match for your task.",
  },
  {
    icon: BadgeDollarSign,
    title: "Affordable Pricing",
    description:
      "Get work done within your budget without compromising quality.",
  },
];

export default function WhyChooseSkillSwap() {
  return (
    <section className="bg-gradient-to-b from-white to-green-50/40 py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-[#166534]">
            Why Choose Us
          </span>

          <h2 className="mt-5 text-4xl font-bold text-[#0f1a0f]">
            Everything You Need to Hire
            <span className="block text-[#166534]">
              and Get Hired Faster
            </span>
          </h2>

          <p className="mt-5 text-lg text-gray-600">
            SkillSwap connects clients and freelancers through a
            simple, secure, and efficient workflow.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
                className="group rounded-3xl border border-[#92400e]/30 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#92400e]/100 hover:shadow-xl"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-[#166534] transition group-hover:bg-[#166534] group-hover:text-white">
                  <Icon size={28} />
                </div>

                <h3 className="mb-3 text-xl font-bold text-[#0f1a0f]">
                  {feature.title}
                </h3>

                <p className="leading-7 text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}