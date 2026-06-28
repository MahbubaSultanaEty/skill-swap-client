import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="min-h-screen bg-[#f8faf8] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center bg-white p-8 rounded-xl shadow-sm border border-amber-100">
        
        {/* Map/Compass Icon (Amber tone for Lost/Not Found vibe) */}
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-amber-50 mb-5">
          <svg 
            className="h-6 w-6 text-amber-400" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" 
            />
          </svg>
        </div>

        {/* Error Code & Heading */}
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-500 bg-amber-50 px-2.5 py-1 rounded">
          Error 404
        </span>
        
        <h2 className="text-2xl font-bold text-[#0f172a] tracking-tight mt-4">
          Page Not Found
        </h2>
        
        <p className="mt-3 text-sm text-red-400 leading-relaxed">
          The page you are looking for doesn't exist, has been moved, or the URL might be mistyped. Let's get you back on track.
        </p>

        <hr className="my-6 border-gray-100" />

        {/* Action Buttons */}
        <div className="flex flex-col gap-2">
          <Link
            href="/"
            className="w-full inline-flex items-center justify-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-md text-white bg-[#0f172a] hover:bg-slate-800 transition-colors duration-200"
          >
            Back to Homepage
          </Link>
          
        </div>

      </div>
    </section>
  )
}