import { notFound } from "next/navigation";
import FreelancerProfileClient from "@/components/freelancers/FreelancersProfileClient";
import { serverFetch } from "@/lib/core/server";

async function getFreelancer(email) {
    
  const data = await serverFetch(`/api/users/email/${email}`); 
  return data;
}

export async function generateMetadata({ params }) {
  const { email } = await params;
  const freelancer = await getFreelancer(decodeURIComponent(email));
  if (!freelancer) return { title: "Freelancer Not Found | SkillSwap" };

  return {
    title: `${freelancer.name} | SkillSwap`,
    description: freelancer.bio?.slice(0, 155),
    openGraph: {
      title: `${freelancer.name} | SkillSwap`,
      description: freelancer.bio?.slice(0, 155),
      type: "profile",
    },
  };
}

export default async function FreelancerProfilePage({ params }) {
    const { email } = await params;
    console.log("raw email:", email);
  console.log("decoded email:", decodeURIComponent(email));
    const freelancer = await getFreelancer(decodeURIComponent(email));
    console.log(freelancer);
  if (!freelancer) notFound();

  return <FreelancerProfileClient freelancer={freelancer} />;
}