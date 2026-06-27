import { notFound } from "next/navigation";
import FreelancerProfileClient from "@/components/freelancers/FreelancersProfileClient";
import { getFreelancerByEmail } from "@/lib/actions/freelancer";



export async function generateMetadata({ params }) {
  const { email } = await params;
  const freelancer = await getFreelancerByEmail(decodeURIComponent(email));
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
  //   console.log("raw email:", email);
  // console.log("decoded email:", decodeURIComponent(email));
    const freelancer = await getFreelancerByEmail(decodeURIComponent(email));
    // console.log(freelancer);
  if (!freelancer) notFound();

  return <FreelancerProfileClient freelancer={freelancer} />;
}