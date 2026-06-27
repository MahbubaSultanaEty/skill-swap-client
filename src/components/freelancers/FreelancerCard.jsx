import Link from "next/link";
import {
  Avatar,
  Card,
  Chip,
} from "@heroui/react";
import { ArrowRight } from "lucide-react";

const FreelancerCard = ({ freelancer }) => {
  return (
    <Link href={`/freelancers/${freelancer._id}`} className="group block">
      <Card className="relative overflow-hidden rounded-3xl border border-green-100 bg-white p-6 transition-all duration-300 hover:-translate-y-2 hover:border-green-300 hover:shadow-2xl">

        
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-r from-green-100 via-emerald-50 to-green-50" />

        {/* Content */}
        <div className="relative flex flex-col items-center">

          {/* Avatar */}
          <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
            {freelancer.image ? (
              <Avatar.Image
                src={freelancer.image}
                alt={freelancer.name}
              />
            ) : null}

            <Avatar.Fallback className="text-xl font-bold">
              {freelancer.name?.charAt(0)}
            </Avatar.Fallback>
          </Avatar>

          {/* Name */}
          <h3 className="mt-5 text-xl font-extrabold text-[#0f1a0f] text-center">
            {freelancer.name}
          </h3>

          {/* Professional Title */}
          <p className="mt-1 text-sm font-medium text-neutral-500 text-center">
            {freelancer.title || "Freelancer"}
          </p>

          {/* Skills */}
          <div className="mt-5 flex h-7 flex-wrap justify-center gap-2">
            {freelancer.skills?.slice(0, 3).map((skill) => (
              <Chip
                key={skill}
                size="sm"
                variant="flat"
                className="bg-green-100 text-green-800 font-semibold"
              >
                {skill}
              </Chip>
            ))}
          </div>

         
          <div className="mt-8 flex w-full items-center justify-between border-t border-neutral-100 pt-5">

            <div>
              <p className="text-xs uppercase tracking-wide text-neutral-400">
                Rating
              </p>

              <p className="font-bold text-amber-500">
                ⭐ New
              </p>
            </div>

            <div className="flex items-center gap-2 font-semibold text-green-700 transition-all group-hover:gap-3">
              View Profile
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </div>

          </div>
        </div>
      </Card>
    </Link>
  );
};

export default FreelancerCard;