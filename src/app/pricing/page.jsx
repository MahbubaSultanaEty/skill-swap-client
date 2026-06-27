import PricingClient from "@/components/pricing/PricingClient";
import { Rocket, Zap, Crown, Star, Shield, Gem } from "lucide-react";
import { getUserSession } from "@/lib/core/session";

const clientPlans = [
  {
    name: "Starter",
    price: 0,
    period: "month",
    description: "Perfect for individuals with occasional tasks",
    icon: "Star",
    popular: false,
    features: ["Post up to 3 tasks/month", "Basic proposal management", "Email support", "7-day task visibility"],
    cta: "Get Started Free",
  },
  {
    name: "Pro",
    price: 19,
    period: "month",
    description: "For growing businesses with frequent hiring needs",
    icon: "Rocket",
    popular: true,
    features: ["Post up to 20 tasks/month", "Priority proposal ranking", "Live chat support", "30-day task visibility", "Featured task badge", "Proposal analytics"],
    cta: "Start Pro Plan",
  },
  {
    name: "Business",
    price: 49,
    period: "month",
    description: "For teams and agencies managing multiple projects",
    icon: "Crown",
    popular: false,
    features: ["Unlimited task posts", "Dedicated account manager", "24/7 priority support", "90-day task visibility", "Advanced analytics", "Custom invoicing"],
    cta: "Go Business",
  },
];

const freelancerPlans = [
  {
    name: "Basic",
    price: 0,
    period: "month",
    description: "Start your freelance journey with essential tools",
    icon: "Shield",
    popular: false,
    features: ["Submit up to 5 proposals/month", "Basic profile listing", "Standard search ranking", "Community support"],
    cta: "Join for Free",
  },
  {
    name: "Growth",
    price: 14,
    period: "month",
    description: "Boost your visibility and win more projects",
    icon: "Zap",
    popular: true,
    features: ["Submit up to 30 proposals/month", "Highlighted profile badge", "Boosted search ranking", "Priority support", "Skills verification badge", "Early task access"],
    cta: "Start Growing",
  },
  {
    name: "Elite",
    price: 39,
    period: "month",
    description: "For top freelancers who want maximum exposure",
    icon: "Gem",
    popular: false,
    features: ["Unlimited proposals", "Elite profile badge", "Top search placement", "Advanced earnings analytics", "Featured freelancer listing", "Portfolio showcase"],
    cta: "Go Elite",
  },
];

export const metadata = {
  title: "Pricing | SkillSwap",
  description: "Simple, transparent pricing for clients and freelancers.",
};

export default async function PricingPage() {
 const user= getUserSession()

  return (
    <PricingClient
          role={user?.role}
          user={user}
      clientPlans={clientPlans}
      freelancerPlans={freelancerPlans}
    />
  );
}