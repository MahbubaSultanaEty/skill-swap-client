import { requiredRole } from '@/lib/core/session';

export const metadata = {
  title: "Client Dashboard | SkillSwap - Manage Tasks & Hire Top Freelancers",
  description:
    "Post new tasks, review submitted proposals, track ongoing project progress, and manage secure payments seamlessly from your SkillSwap Client Dashboard.",
  robots: {
    index: false, 
    follow: false,
  },
};

export default async function ClientLayout({ children }) {
    await requiredRole("client")
    return children;
}
