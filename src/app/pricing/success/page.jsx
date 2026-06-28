import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const {
    status,
    customer_details: { email: customerEmail }
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {
    return (
      <section className="min-h-screen bg-[#f8faf8] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center bg-white p-8 rounded-xl shadow-sm border border-[#dcfce7]">
          
          {/* Success Icon */}
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-[#dcfce7] mb-6">
            <svg 
              className="h-6 w-6 text-[#15803d]" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* Headings */}
          <h2 className="text-2xl font-bold text-[#0f172a] tracking-tight">
            Payment Successful!
          </h2>
          <p className="mt-3 text-sm text-[#64748b]">
            We appreciate your business. A confirmation email with order details will be sent to{' '}
            <span className="font-semibold text-[#0f172a]">{customerEmail}</span> shortly.
          </p>

          <hr className="my-6 border-gray-100" />

          {/* Support Info */}
          <p className="text-xs text-[#64748b] mb-6">
            If you have any questions, please contact our support at{' '}
            <a href="mailto:support@skillswap.com" className="text-[#15803d] hover:underline font-medium">
              support@skillswap.com
            </a>
          </p>

          {/* Navigation Action */}
          <div className="flex flex-col gap-2">
            <Link
              href="/dashboard/freelancer"
              className="w-full inline-flex items-center justify-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-md text-white bg-[#15803d] hover:bg-[#14532d] transition-colors duration-200"
            >
              Go to Dashboard
            </Link>
            <Link
              href="/"
              className="w-full inline-flex items-center justify-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-md text-[#64748b] bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
            >
              Back to Home
            </Link>
          </div>

        </div>
      </section>
    )
  }
}