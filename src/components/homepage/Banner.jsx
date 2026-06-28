import { Layers3Diagonal } from '@gravity-ui/icons'
import Link from 'next/link'
import React from 'react'

export const Banner = () => {
  return (
   <section className="relative overflow-hidden">
  {/* Background Blur */}
  <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-green-200/40 blur-3xl" />
  <div className="absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-green-100/60 blur-3xl" />

  <div className="mx-auto grid min-h-[80vh] max-w-7xl items-center gap-12 px-4 py-16 lg:grid-cols-2">
    {/* Left Content */}
    <div>
      <span className="inline-flex items-center rounded-full border gap-2 border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-[#0f172a]">
        <Layers3Diagonal /> Freelance Micro-Task Marketplace
      </span>

      <h1 className="mt-6 text-4xl font-bold leading-tight text-[#0f1a0f] md:text-6xl">
        Get Your Tasks Done
        <span className="block text-[#15803d]">
          by Skilled Freelancers
        </span>
      </h1>

      <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
        Post tasks, receive proposals, hire top talent, and manage
        everything securely in one place. SkillSwap makes freelancing
        simple, fast, and reliable.
      </p>

                  <div className="mt-8 flex flex-wrap gap-4">
                      <Link href={"/tasks"}>
                             <button className="rounded-xl bg-[#166534] px-6 py-3 font-semibold text-white transition hover:bg-[#15803d]">
          Post a Task
        </button>

                      </Link>
                      <Link href={"/tasks"}>
                             <button className="rounded-xl border border-green-200 bg-white px-6 py-3 font-semibold text-[#166534] transition hover:bg-green-50">
          Browse Tasks
        </button>
                      </Link>
     
      </div>

      {/* Stats */}
      <div className="mt-10 grid max-w-xl grid-cols-3 gap-4">
        <div>
          <h3 className="text-2xl font-bold text-[#92400e]">
            1200+
          </h3>
          <p className="text-sm text-gray-600">
            Tasks Posted
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-[#92400e]">
            450+
          </h3>
          <p className="text-sm text-gray-600">
            Freelancers
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-[#92400e]">
            98%
          </h3>
          <p className="text-sm text-gray-600">
            Success Rate
          </p>
        </div>
      </div>
    </div>

    {/* Right Content */}
    <div className="relative">
      {/* Main Dashboard Card */}
      <div className="rounded-3xl border border-green-100 bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="font-semibold text-[#0f1a0f]">
            Client Dashboard
          </h3>

          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-[#166534]">
            Live
          </span>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-2xl border border-green-100 p-4">
            <p className="text-sm text-gray-500">
              Active Tasks
            </p>

            <h4 className="mt-2 text-2xl font-bold text-[#92400e]">
              24
            </h4>
          </div>

          <div className="rounded-2xl border border-green-100 p-4">
            <p className="text-sm text-gray-500">
              Open Jobs
            </p>

            <h4 className="mt-2 text-2xl font-bold text-[#92400e]">
              12
            </h4>
          </div>

          <div className="rounded-2xl border border-green-100 p-4">
            <p className="text-sm text-gray-500">
              Total Spent
            </p>

            <h4 className="mt-2 text-2xl font-bold text-[#92400e]">
              $4.5k
            </h4>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="mb-4 font-semibold text-[#0f1a0f]">
            Recent Tasks
          </h4>

          <div className="space-y-3">
            {[
              "Logo Design Project",
              "Landing Page UI",
              "Fix React Bug",
            ].map((task) => (
              <div
                key={task}
                className="flex items-center justify-between rounded-xl border border-green-100 p-3"
              >
                <span className="text-sm font-medium">
                  {task}
                </span>

                <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-[#166534]">
                  Open
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Cards */}
      <div className="absolute -left-6 top-10 hidden rounded-2xl border border-green-100 bg-white px-4 py-3 shadow-lg md:block">
        ✓ Secure Payments
      </div>

      <div className="absolute -right-6 top-24 hidden rounded-2xl border border-green-100 bg-white px-4 py-3 shadow-lg md:block">
        ✓ Verified Freelancers
      </div>

      <div className="absolute bottom-10 -left-8 hidden rounded-2xl border border-green-100 bg-white px-4 py-3 shadow-lg md:block">
        ✓ Fast Hiring
      </div>
    </div>
  </div>
</section>
  )
}
