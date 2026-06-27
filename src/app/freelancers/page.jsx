
import { getFreelancers } from "@/lib/actions/freelancer";
import FreelancerCard from "@/components/freelancers/FreelancerCard";
import { Target } from "lucide-react";

export const metadata = {
  title: "Browse Freelancers | SkillSwap",
  description:
    "Browse talented freelancers and find the perfect person for your next project.",
};

const FreelancersPage = async () => {
    const freelancers = await getFreelancers();
  

  return (
    <section className="bg-white">
      {/* Hero */}
      <div className="border-b border-green-100 bg-gradient-to-br from-green-50 via-white to-emerald-50">
        <div className="mx-auto max-w-7xl px-5 py-20 text-center">
          <span className="inline-flex gap-3 items-center rounded-full border border-green-200 bg-green-100 px-4 py-1 text-sm font-semibold text-green-700">
            <Target/> Hire Skilled Freelancers
          </span>

          <h1 className="mt-6 text-4xl font-black tracking-tight text-[#0f1a0f] md:text-6xl">
            Find the Perfect Freelancer
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-neutral-600 md:text-lg">
            Explore talented professionals ready to help you complete your
            projects. Browse profiles, discover their expertise, and connect
            with the right freelancer for your next task.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-7xl px-5 py-14">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black text-[#0f1a0f]">
              Available Freelancers
            </h2>

            <p className="mt-2 text-neutral-500">
              {freelancers.length} freelancer
              {freelancers.length !== 1 && "s"} available on SkillSwap.
            </p>
          </div>
        </div>

        {freelancers.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-neutral-300 py-20 text-center">
            <h3 className="text-2xl font-bold text-neutral-700">
              No Freelancers Found
            </h3>

            <p className="mt-3 text-neutral-500">
              There are no freelancer profiles available at the moment.
            </p>
          </div>
        ) : (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {freelancers.map((freelancer) => (
              <FreelancerCard
                key={freelancer._id}
                freelancer={freelancer}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FreelancersPage;