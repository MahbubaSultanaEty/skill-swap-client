import Link from 'next/link';

const ForbiddenPage = () => {
  return (
    <div className="min-h-screen bg-[#fcfcfc] flex flex-col items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 rounded-xl border border-neutral-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)]">
        
        {/* Minimalist Error Indicator (Soft Crimson Subtle Alert) */}
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-rose-50/60 rounded-full flex items-center justify-center text-rose-600 border border-rose-100/40">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.8} 
              stroke="currentColor" 
              className="w-7 h-7"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" 
              />
            </svg>
          </div>
        </div>

        {/* Error Typography */}
        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-rose-500">Error 403</span>
          <h1 className="text-2xl font-semibold text-neutral-900 tracking-tight">Access Denied</h1>
          <p className="text-red-500 text-sm leading-relaxed max-w-xs mx-auto">
            You don't have permission to view this resource. It might be restricted or private.
          </p>
        </div>

        {/* Minimal Divider */}
        <div className="h-px bg-neutral-100 w-full my-4"></div>

        {/* Proper Next.js Navigation Links */}
        <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
          <Link 
            href="/"
            className="px-5 py-2.5 text-xs font-medium text-white bg-neutral-900 hover:bg-neutral-800 active:scale-[0.99] transition-all rounded-lg shadow-sm"
          >
            Go to Homepage
          </Link>
        </div>

      </div>

      {/* Footer Branding */}
      <div className="mt-8 text-neutral-400 text-[11px] tracking-wider uppercase font-medium">
        SkillSwap Security Systems
      </div>
    </div>
  );
};

export default ForbiddenPage;