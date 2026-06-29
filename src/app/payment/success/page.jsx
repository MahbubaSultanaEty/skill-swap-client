import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { serverMutation } from '@/lib/core/server'

export default async function PaymentSuccessPage({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id) throw new Error('Please provide a valid session_id')

  const {
    status,
    customer_details: { email: customerEmail },
    metadata,
    amount_total,
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent'],
  })

  console.log("metadata:", metadata);
  console.log("amount_total:", amount_total);

  if (status === 'open') redirect('/')

  if (status === 'complete') {
    await serverMutation(
      `/api/proposals/${metadata.proposalId}/status`,
      { status: 'Accepted' },
      'PATCH'
    )

    await serverMutation(
      `/api/tasks/${metadata.taskId}/status`,
      { status: 'In Progress' },
      'PATCH'
    )

    await serverMutation('/api/payments', {
      clientEmail: customerEmail,
      freelancerEmail: metadata.freelancerEmail,
      taskId: metadata.taskId,
      proposalId: metadata.proposalId,
      amount: amount_total / 100,
      paymentStatus: 'paid',
      paidAt: new Date().toISOString(),
    }, 'POST')

    return (
     <section className="min-h-screen flex items-center justify-center px-4" style={{ background: '#f8faf8' }}>
  <div className="max-w-md w-full text-center bg-white p-8 rounded-2xl border border-green-100 shadow-sm">

    {/* Icon */}
    <div
      className="mx-auto flex items-center justify-center h-12 w-12 rounded-full mb-6"
      style={{ background: '#dcfce7' }}
    >
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#15803d" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </div>

    <h2 className="text-2xl font-bold" style={{ color: '#0f172a' }}>
      Payment Successful!
    </h2>
    <p className="mt-2 text-sm" style={{ color: '#64748b' }}>
      The freelancer has been notified and work will begin shortly.
    </p>

    {/* Task & Amount */}
    <div
      className="rounded-xl p-4 my-6 text-left"
      style={{ background: '#f1f5f9' }}
    >
      <p className="text-xs text-gray-400 uppercase tracking-wider">Task</p>     
      <p className="text-xs text-gray-400 mt-3 uppercase tracking-wider">Amount Paid</p>
      <p className="text-xl font-bold mt-1" style={{ color: '#15803d' }}>
        ${amount_total / 100}
      </p>
    </div>

    <hr className="border-gray-100 mb-6" />

    <div className="flex flex-col gap-2">
      <Link
        href="/dashboard/client/proposals"
        className="w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium rounded-xl text-white transition-colors"
        style={{ background: '#15803d' }}
      >
        Go to Dashboard
      </Link>
      <Link
        href="/"
        className="w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium rounded-xl transition-colors"
        style={{ background: '#f1f5f9', color: '#64748b' }}
      >
        Back to Home
      </Link>
    </div>

  </div>
</section>
    )
  }
}