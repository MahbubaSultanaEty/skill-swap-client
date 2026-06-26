import { getUserSession } from "@/lib/core/session";
import { Avatar, Card } from "@heroui/react";

// মেটাডাটা - এক ফাইলেই থাকছে
export const metadata = {
  title: "My Profile | Skill Swap",
  description: "View your account profiles, active role, and credentials.",
};

export default async function ProfilePage() {
  const userData = await getUserSession();

const cleanDate = new Date(userData.createdAt).toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 bg-neutral-50/50 min-h-screen flex flex-col justify-center">
      
      <Card className="p-8 border border-neutral-100 shadow-md bg-white rounded-3xl max-w-2xl mx-auto w-full">
        <div className="flex flex-col items-center text-center gap-6">         
    
          <div className="relative group">
  <div className="absolute inset-0 bg-black/5 rounded-full blur-md group-hover:blur-lg transition opacity-50"></div>
  
  <Avatar className="w-32 h-32 text-2xl border-4 border-white shadow-xl bg-neutral-200 font-bold text-neutral-700">
    {userData.image ? (
      <Avatar.Image alt={userData.name} src={userData.image} />
    ) : null}
    <Avatar.Fallback>
      {userData.name ? userData.name.charAt(0).toUpperCase() : "U"}
    </Avatar.Fallback>
  </Avatar>
</div>

  
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-black text-neutral-900 tracking-tight">{userData.name}</h1>
            <p className="text-xs text-neutral-400 font-medium">Joined on {cleanDate}</p>
          </div>

          {/* ২. রোল হাইলাইটার (userData.role) */}
          <div className="inline-flex items-center gap-1.5 bg-black text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase shadow-sm">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
            {userData.role} Account
          </div>

          {/* ডিভাইডার */}
          <div className="w-full h-[1px] bg-neutral-100 my-2"></div>

          {/* ৩. ইমেইল, আইডি ও ভেরিফিকেশন স্ট্যাটাস */}
          <div className="w-full space-y-3 text-left">
            
            {/* ইমেইল (userData.email) */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center p-3.5 bg-neutral-50 rounded-xl border border-neutral-100 gap-1 sm:gap-0">
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Email Address</span>
              <span className="text-sm font-bold text-neutral-800">{userData.email}</span>
            </div>

            {/* ইউজার আইডি (userData.id) */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center p-3.5 bg-neutral-50 rounded-xl border border-neutral-100 gap-1 sm:gap-0">
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">User ID</span>
              <span className="text-xs font-mono font-bold text-neutral-600 bg-neutral-200/60 px-2 py-1 rounded">
                {userData.id}
              </span>
            </div>
           
            
          </div>

          {/* অ্যাকশন বাটন
          <div className="w-full mt-4">
            <button className="w-full text-xs font-bold bg-neutral-100 hover:bg-neutral-200 text-neutral-700 py-3 rounded-xl transition shadow-sm">
              Edit Account Settings
            </button>
          </div> */}

        </div>
      </Card>
    </div>
  );
}