"use client";

import { useState } from "react";
import { Check, Briefcase, User } from "lucide-react";
import { Rocket, Zap, Crown, Star, Shield, Gem } from "lucide-react";

const ICONS = { Rocket, Zap, Crown, Star, Shield, Gem };

function PlanCard({ plan }) {
  const Icon = ICONS[plan.icon];

  return (
    <div
      className={`relative rounded-2xl border p-6 flex flex-col gap-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
        plan.popular ? "shadow-md" : ""
      }`}
      style={{
        background: plan.popular ? "#14532d" : "#fff",
        borderColor: plan.popular ? "#14532d" : "#e5e7eb",
      }}
    >
      {plan.popular && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap"
          style={{ background: "#dcfce7", color: "#15803d" }}
        >
          Most Popular
        </div>
      )}

      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{
            background: plan.popular ? "rgba(255,255,255,0.15)" : "#f3f4f6",
          }}
        >
          <Icon size={20} style={{ color: plan.popular ? "#fff" : "#15803d" }} />
        </div>
        <div>
          <h3
            className="font-bold text-lg"
            style={{ color: plan.popular ? "#fff" : "#111827" }}
          >
            {plan.name} 
          </h3>
          <p style={{ color: plan.popular ? "rgba(255,255,255,0.6)" : "#9ca3af" }} className="text-xs">
            {plan.description}
          </p>
        </div>
      </div>

      <div className="flex items-end gap-1">
        <span
          className="text-4xl font-black"
          style={{ color: plan.popular ? "#fff" : "#111827" }}
        >
          {plan.price === 0 ? "Free" : `$${plan.price}`}
        </span>
        {plan.price > 0 && (
          <span
            className="text-sm mb-1"
            style={{ color: plan.popular ? "rgba(255,255,255,0.5)" : "#9ca3af" }}
          >
            /{plan.period}
          </span>
        )}
      </div>

      <ul className="flex flex-col gap-2 flex-1">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm"
            style={{ color: plan.popular ? "rgba(255,255,255,0.8)" : "#374151" }}
          >
            <Check size={14} style={{ color: plan.popular ? "#86efac" : "#15803d" }} />
            {feature}
          </li>
        ))}
      </ul>

      <button
        type="submit"
        role="link"
        className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-110"
        style={
          plan.popular
            ? { background: "#fff", color: "#14532d" }
            : { background: "#0f172a", color: "#f8faf8" }
        }
      >
        {plan.cta}
      </button>
    </div>
  );
}

export default function PricingClient({ role, clientPlans, freelancerPlans }) {
  const [tab, setTab] = useState(role === "client" ? "client" : "freelancer");

  const plans = tab === "client" ? clientPlans : freelancerPlans;

  return (
    <main className="min-h-screen py-16 px-4" style={{ background: "#f9fafb" }}>
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-10">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-black" style={{ color: "#111827" }}>
            Simple, Transparent{" "}
            <span style={{ color: "#15803d" }}>Pricing</span>
          </h1>
          <p className="mt-3 max-w-lg" style={{ color: "#6b7280" }}>
            Choose the plan that fits your needs. Upgrade or downgrade anytime.
          </p>
        </div>

        {/* Tab */}
        {!role && (
          <div
            className="flex items-center gap-1 p-1 rounded-2xl border"
            style={{ background: "#fff", borderColor: "#e5e7eb" }}
          >
            <button
              onClick={() => setTab("freelancer")}
              className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
              style={
                tab === "freelancer"
                  ? { background: "#14532d", color: "#fff" }
                  : { color: "#6b7280" }
              }
            >
              <Briefcase size={15} />
              For Freelancers
            </button>
            <button
              onClick={() => setTab("client")}
              className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
              style={
                tab === "client"
                  ? { background: "#14532d", color: "#fff" }
                  : { color: "#6b7280" }
              }
            >
              <User size={15} />
              For Clients
            </button>
          </div>
        )}

        {/* Role label */}
        {role && (
          <div
            className="text-sm font-medium px-4 py-2 rounded-full border"
            style={{ background: "#fff", borderColor: "#e5e7eb", color: "#374151" }}
          >
            Showing{" "}
            <span style={{ color: "#15803d" }} className="font-bold">
              {role === "client" ? "Client" : "Freelancer"}
            </span>{" "}
            Plans
          </div>
        )}

        {/* Plans */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </div>

        <p className="text-sm text-center" style={{ color: "#9ca3af" }}>
          All plans include a 14-day free trial. No credit card required.
        </p>

      </div>
    </main>
  );
}