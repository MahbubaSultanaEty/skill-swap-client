
import { getUserByEmail } from '@/lib/actions/freelancer';
import { getUserSession, requiredRole } from '@/lib/core/session';
import { Avatar } from '@heroui/react'; 

export default async function AdminProfile() {
 
  const user = await getUserSession();
  await requiredRole("admin")
  const adminData = await getUserByEmail(user?.email)

  const adminPowers = [
    { title: "User Management", desc: "Ability to ban, suspend, or upgrade client and freelancer accounts." },
    { title: "Dispute Resolution", desc: "Final authority to review escrow issues, cancel tasks, or release partial payments." },
    { title: "Platform Governance", desc: "Can flag inappropriate gig content, review reports, and manage category listings." },
    { title: "System Configuration", desc: "Access to platform-wide commission rates, transaction thresholds, and API keys." }
  ];


  const firstLetter = adminData.name ? adminData.name.charAt(0).toUpperCase() : "A";

  return (
    <main className="min-h-screen bg-[#f8faf8] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Main Profile Card */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            
            {/* HeroUI Avatar Component with exact properties */}
            <div className="shrink-0">
              <Avatar className="w-24 h-24 text-xl font-bold rounded-full border-2 border-slate-200">
                <Avatar.Image 
                  alt={adminData.name}
                  src={adminData.image} 
                />
                <Avatar.Fallback>
                  {firstLetter}
                </Avatar.Fallback>
              </Avatar>
            </div>
            
            {/* Meta Information */}
            <div className="flex-1 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2.5">
                <h1 className="text-2xl font-bold text-[#0f172a]">{adminData.name}</h1>
                <span className="inline-block px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-red-700 bg-red-50 rounded mx-auto sm:mx-0 w-max border border-red-100">
                  {adminData.role}
                </span>
              </div>
              
              <p className="text-sm text-[#64748b] flex items-center justify-center sm:justify-start gap-2">
                {adminData.email}
                {!adminData.emailVerified && (
                  <span className="text-[10px] font-medium bg-amber-50 text-amber-700 border border-amber-100 px-1.5 py-0.2 rounded">
                    Unverified
                  </span>
                )}
              </p>

              <div className="text-xs text-slate-400 space-y-0.5 pt-1">
                <p>Profile Created: {new Date(adminData.createdAt).toLocaleDateString()}</p>
                <p>Last System Update: {new Date(adminData.updatedAt).toLocaleTimeString()}</p>
              </div>
            </div>

            {/* Edit / Configuration Action */}
            <button className="text-xs font-medium text-[#0f172a] hover:text-slate-700 border border-slate-200 px-3 py-1.5 rounded-md hover:bg-slate-50 transition-colors w-full sm:w-auto">
              System Settings
            </button>
          </div>
        </section>

        {/* Core Administrative Powers & Privileges */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="border-b border-slate-100 pb-3 mb-4">
            <h3 className="text-sm font-bold text-[#0f172a] uppercase tracking-wide">
              Administrative Powers & System Privileges
            </h3>
            <p className="text-xs text-[#64748b] mt-0.5">Authorized operations granted to this root administrator account.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {adminPowers.map((power, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="h-2 w-2 rounded-full bg-slate-400" />
                  <h4 className="text-sm font-semibold text-[#0f172a]">{power.title}</h4>
                </div>
                <p className="text-xs text-[#64748b] leading-relaxed pl-4">
                  {power.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Security Logs Notification Section */}
        <section className="bg-amber-50/50 border border-amber-100 rounded-xl p-4 flex items-start gap-3">
          <svg className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div className="space-y-0.5">
            <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wide">Root Security Notice</h4>
            <p className="text-xs text-amber-700 leading-relaxed">
              Every system mutation, payout release, and user status change initiated by <span className="font-semibold">{adminData.name}</span> is permanently cryptographic-logged in the central system audit dashboard.
            </p>
          </div>
        </section>

      </div>
    </main>
  );
}