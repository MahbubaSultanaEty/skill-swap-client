import { getTaskById } from '@/lib/api/task';
import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import { Calendar, DollarSign, Tag, User, AlertTriangle, ArrowRight } from 'lucide-react';
import TaskProposalForm from '@/components/tasks/TaskProposalForm';
import { getProposalsByFreelancerEmail } from '@/lib/api/proposals';
import Link from 'next/link';
import { Label, ProgressBar } from '@heroui/react';

export default async function ProposalPage({ params }) {
  const { id } = await params;
  const user = await getUserSession();
  const task = await getTaskById(id);

  if (!user) redirect(`/auth/login?redirect=/tasks/${id}/proposal`);
  if (user?.role !== "freelancer") redirect("/unauthorized");

  const proposals = await getProposalsByFreelancerEmail(user.email);

  const plan = {
    name: "Free",
    maxProposalsPerMonth: 3,
  };

  const usedCount = proposals?.length || 0;
  const limitReached = usedCount >= plan.maxProposalsPerMonth;
  const progressPercent = Math.min((usedCount / plan.maxProposalsPerMonth) * 100, 100);
  const progressColor = usedCount >= plan.maxProposalsPerMonth ? "#ef4444" : usedCount === plan.maxProposalsPerMonth - 1 ? "#f59e0b" : "#15803d";

  return (
    <div style={{ background: "#f8faf8", minHeight: "100vh" }} className="px-4 py-12">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest mb-3" style={{ background: "#dcfce7", color: "#15803d" }}>
            ✦ Submit Proposal
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: "#1a1919" }}>
            Apply for this Task
          </h1>
          <p className="mt-1 text-sm" style={{ color: "#6b7280" }}>
            Review the task details and submit your best proposal
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">

          {/* LEFT: Task Details */}
          <div className="lg:col-span-2">
            <div className="sticky top-20 rounded-2xl border shadow shadow-[#92400e40] p-6" style={{ background: "#fff",  }}>
              <div className="mb-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold" style={{ background: "#dcfce7", color: "#92400e" }}>
                <Tag size={11} /> {task?.category}
              </div>
              <h2 className="mb-3 text-lg font-bold leading-snug" style={{ color: "#14532d" }}>
                {task?.title}
              </h2>
              <p className="mb-5 text-sm leading-relaxed" style={{ color: "#6b7280" }}>
                {task?.description}
              </p>
              <div className="space-y-3 border-t pt-4" style={{ borderColor: "#dcfce7" }}>
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex size-7 items-center justify-center rounded-lg" style={{ background: "#dcfce7" }}>
                    <DollarSign size={13} color="#15803d" />
                  </div>
                  <span style={{ color: "#6b7280" }}>Budget:</span>
                  <span className="font-semibold" style={{ color: "#0f1a0f" }}>${task?.budget}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex size-7 items-center justify-center rounded-lg" style={{ background: "#dcfce7" }}>
                    <Calendar size={13} color="#15803d" />
                  </div>
                  <span style={{ color: "#6b7280" }}>Deadline:</span>
                  <span className="font-semibold" style={{ color: "#0f1a0f" }}>
                    {new Date(task?.deadline).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex size-7 items-center justify-center rounded-lg" style={{ background: "#dcfce7" }}>
                    <User size={13} color="#15803d" />
                  </div>
                  <span style={{ color: "#6b7280" }}>Client:</span>
                  <span className="font-semibold" style={{ color: "#0f1a0f" }}>{task?.clientName}</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Proposal Form or Limit */}
          <div className="lg:col-span-3">

            {/* Proposal Limit Bar */}
            <div className="mb-4 rounded-2xl border p-4" style={{ background: "#fff", borderColor: "#dcfce7" }}>
  <ProgressBar value={progressPercent}>
    <div className="flex items-center justify-between mb-2">
      <Label className="text-xs font-medium" style={{ color: "#6b7280" }}>
        Proposals used this month
      </Label>
      <ProgressBar.Output className="text-xs font-semibold" style={{ color: progressColor }}>
  {usedCount} / {plan.maxProposalsPerMonth}
</ProgressBar.Output>
    </div>
    <ProgressBar.Track>
      <ProgressBar.Fill style={{ background: progressColor }} />
    </ProgressBar.Track>
  </ProgressBar>
  <p className="mt-1.5 text-[11px]" style={{ color: "#9ca3af" }}>
    {plan.name} plan — {plan.maxProposalsPerMonth} proposals/month
  </p>
</div>
            {limitReached ? (
              
              <div className="rounded-2xl border p-8 text-center" style={{ background: "#fff", borderColor: "#fecaca" }}>
                <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full" style={{ background: "#fef2f2" }}>
                  <AlertTriangle size={26} color="#ef4444" />
                </div>
                <h3 className="mb-2 text-lg font-bold" style={{ color: "#FFBD58" }}>
                  Proposal Limit Reached
                </h3>
                <p className="mb-6 text-sm leading-relaxed" style={{ color: "#6b7280" }}>
                  You've used all <strong>{plan.maxProposalsPerMonth}</strong> proposals for this month on the <strong>{plan.name}</strong> plan. Upgrade to send more proposals.
                </p>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white no-underline transition-all hover:opacity-90"
                  style={{ background: "#15803d" }}
                >
                  Upgrade Plan <ArrowRight size={15} />
                </Link>
              </div>
            ) : (
              /* Proposal Form */
              <div className="rounded-2xl border p-6" style={{ background: "#fff", borderColor: "#dcfce7" }}>
                <h3 className="mb-5 text-lg font-bold" style={{ color: "#14532d" }}>Your Proposal</h3>
                <TaskProposalForm
                  taskId={task?._id?.toString() || id}
                  taskTitle={task?.title}
                  clientId={task?.clientId}
                  clientName={task?.clientName}
                  clientEmail={task?.clientEmail}
                  freelancerId={user?.id}
                  freelancerName={user?.name}
                  freelancerEmail={user?.email}
                />
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}