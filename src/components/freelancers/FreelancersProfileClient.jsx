// components/freelancers/FreelancerProfileClient.jsx

"use client";

import { Chip } from "@heroui/react";
import { Mail, Briefcase, Calendar, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function FreelancerProfileClient({ freelancer }) {
  const router = useRouter();

  const joinedDate = new Date(freelancer.createdAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <main className="min-h-screen py-10 px-4 mt-16" style={{ background: "#f8faf8" }}>
      <div className="max-w-3xl mx-auto flex flex-col gap-6">

        {/* Back */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-sm w-fit"
          style={{ color: "#15803d" }}
        >
          <ArrowLeft size={16} />
          Back
        </button>

        {/* Profile Hero Card */}
        <div
          className="rounded-2xl border border-green-100 overflow-hidden"
          style={{ background: "#fff" }}
        >
          {/* Banner */}
          <div
            className="h-32 w-full"
            style={{ background: "linear-gradient(135deg, #15803d, #bbf7d0)" }}
          />

          {/* Avatar + Info */}
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-12">
              <img
                src={freelancer.image}
                alt={freelancer.name}
                className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-md"
              />
              <div className="flex items-center gap-2 pb-1">
                <span
                  className="text-xs font-semibold px-3 py-1 rounded-full"
                  style={{ background: "#dcfce7", color: "#15803d" }}
                >
                  Freelancer
                </span>
                {freelancer.emailVerified && (
                  <span
                    className="text-xs font-semibold px-3 py-1 rounded-full"
                    style={{ background: "#e0f2fe", color: "#0369a1" }}
                  >
                    Verified
                  </span>
                )}
              </div>
            </div>

            <div className="mt-4">
              <h1 className="text-2xl font-bold" style={{ color: "#14532d" }}>
                {freelancer.name}
              </h1>
              {freelancer.title && (
                <p className="text-sm font-medium mt-0.5" style={{ color: "#15803d" }}>
                  {freelancer.title}
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-4 mt-4 text-xs text-gray-400">
              <span className="flex items-center gap-1.5">
                <Mail size={13} />
                {freelancer.email}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={13} />
                Joined {joinedDate}
              </span>
            </div>
          </div>
        </div>

        {/* Bio */}
        {freelancer.bio && (
          <div
            className="rounded-2xl border border-green-100 p-6"
            style={{ background: "#fff" }}
          >
            <h2 className="font-semibold mb-3" style={{ color: "#14532d" }}>
              About
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">{freelancer.bio}</p>
          </div>
        )}

        {/* Skills */}
        {freelancer.skills?.length > 0 && (
          <div
            className="rounded-2xl border border-green-100 p-6"
            style={{ background: "#fff" }}
          >
            <h2
              className="font-semibold mb-4 flex items-center gap-2"
              style={{ color: "#14532d" }}
            >
              <Briefcase size={16} />
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {freelancer.skills.map((skill) => (
                <Chip
                  key={skill}
                  size="sm"
                  style={{ background: "#dcfce7", color: "#15803d" }}
                >
                  {skill}
                </Chip>
              ))}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}