import Link from 'next/link'

export default function Unauthorized() {
  return (
    <section className="min-h-screen bg-[#f8faf8] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center bg-white p-8 rounded-xl shadow-sm border border-red-100">
        
        {/* Warning Icon */}
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-50 mb-5">
          <svg 
            className="h-6 w-6 text-red-600" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
            />
          </svg>
        </div>

        {/* Dynamic Heading based on your request */}
        <h2 className="text-xl font-bold text-[#0f172a] tracking-tight leading-snug">
          You don't have permission to access this route
        </h2>
        
        <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-red-600 bg-red-50 inline-block px-2 py-0.5 rounded">
          Error 401: Unauthorized
        </p>

        {/* Possible Reasons Box */}
        <div className="mt-6 text-left bg-slate-50 p-4 rounded-lg border border-slate-100">
          <h4 className="text-xs font-bold text-[#0f172a] uppercase tracking-wide mb-2.5">
            Why are you seeing this?
          </h4>
          <ul className="text-sm text-[#64748b] space-y-2 list-disc list-inside">
            <li>You are logged in as a <span className="font-medium text-[#0f172a]">Client</span> but trying to access a <span className="font-medium text-[#0f172a]">Freelancer</span> dashboard.</li>
            <li>You are a <span className="font-medium text-[#0f172a]">Freelancer</span> trying to view Client-exclusive management links.</li>
            <li>Your account role doesn't match the required permissions for this specific URL.</li>
          </ul>
        </div>

        <hr className="my-6 border-gray-100" />

        {/* Single Navigation Action */}
        <Link
          href="/"
          className="w-full inline-flex items-center justify-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-md text-white bg-[#0f172a] hover:bg-slate-800 transition-colors duration-200"
        >
          Back to Homepage
        </Link>

      </div>
    </section>
  )
}