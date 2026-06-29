import { notFound } from "next/navigation";
import FreelancerProfileClient from "@/components/freelancers/FreelancersProfileClient";
import { serverFetch } from "@/lib/core/server";
import { getUserByEmail } from "@/lib/actions/freelancer";

async function getReviews(email) {
  const data = await serverFetch(`/api/reviews?revieweeEmail=${email}`);
  return data || [];
}

export async function generateMetadata({ params }) {
  const { email } = await params;
  const freelancer = await getUserByEmail(decodeURIComponent(email));
  console.log("freelancer", freelancer);
  if (!freelancer) notFound();

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
  const decoded = decodeURIComponent(email);
  const freelancer = await getUserByEmail(decoded);
  if (!freelancer) notFound();

  const reviews = await getReviews(decoded);

  return <FreelancerProfileClient freelancer={freelancer} reviews={reviews} />;
}