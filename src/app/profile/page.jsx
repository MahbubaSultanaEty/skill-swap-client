import { getUserSession } from "@/lib/core/session";
import { Avatar, Card } from "@heroui/react";
import { headers } from "next/headers";
import { Chip } from "@heroui/react";

export const metadata = {
  title: "My Profile | Skill Swap",
  description: "View your account profiles, active role, and credentials.",
};


export async function getCurrentUser() {
  const session = await getUserSession();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/email/${session.email}`,
    {
      headers: await headers(),
      cache: "no-store",
    }
  );

  return res.json();
}


export default async function ProfilePage() {
 const userData = await getCurrentUser();

const cleanDate = new Date(userData.createdAt).toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});
  
  // ২. প্রোফাইল আপডেটের জন্য সার্ভার অ্যাকশন
  const handleProfileUpdate = async (formData) => {
    "use server";
    const title = formData.get("title");
    const bio = formData.get("bio");
    const skillsInput = formData.get("skills");
    
    // কমা দিয়ে আলাদা করা স্কিলগুলোকে অ্যারেতে কনভার্ট করা
    const skillsArray = skillsInput ? skillsInput.split(",").map(s => s.trim()) : [];

    try {
      
     const response = await fetch(
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userData.id}`,
  {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      bio,
      skills: skillsArray,
    }),
  }
);


console.log(await response.text());

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      console.log("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

 
  const isFreelancer = userData.role === "freelancer";
  const hasProfileData = userData.bio; 
 
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
                {userData._id}
              </span>
            </div>
           
            
          </div>

          {/* অ্যাকশন বাটন
          <div className="w-full mt-4">
            <button className="w-full text-xs font-bold bg-neutral-100 hover:bg-neutral-200 text-neutral-700 py-3 rounded-xl transition shadow-sm">
              Edit Account Settings
            </button>
          </div> */}
          {/* 🌟 কন্ডিশনাল রেন্ডারিং সেকশন 🌟 */}
          
          {/* সিনারিও ১: ফ্রিল্যান্সার কিন্তু কোনো ডাটা এখনো সেট করেনি -> ফর্ম দেখাবে */}
          {isFreelancer && !hasProfileData && (
            <form action={handleProfileUpdate} className="w-full text-left space-y-4 bg-neutral-50 p-5 rounded-2xl border border-neutral-100">
              <h3 className="text-sm font-bold text-neutral-800 uppercase tracking-wider">Complete Your Freelancer Profile</h3>
              
              <div>
                <label className="block text-xs font-bold text-neutral-500 mb-1">Professional Title</label>
                <input type="text" name="title" placeholder="e.g. Full Stack Developer" required className="w-full text-sm px-3 py-2 border border-neutral-200 rounded-xl focus:outline-none focus:border-black transition" />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-500 mb-1">Skills (Comma Separated)</label>
                <input type="text" name="skills" placeholder="React, Node.js, Next.js, CSS" required className="w-full text-sm px-3 py-2 border border-neutral-200 rounded-xl focus:outline-none focus:border-black transition" />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-500 mb-1">Short Bio</label>
                <textarea name="bio" rows="3" placeholder="Tell clients about your expertise..." required className="w-full text-sm px-3 py-2 border border-neutral-200 rounded-xl focus:outline-none focus:border-black transition resize-none"></textarea>
              </div>

              <button type="submit" className="w-full text-xs font-bold bg-black text-white py-2.5 rounded-xl hover:bg-neutral-800 transition shadow-sm">
                Save Profile Details
              </button>
            </form>
          )}

          {/* সিনারিও ২: ডাটা অলরেডি সেভ করা আছে -> সুন্দর করে ডাটাগুলো ডিসপ্লে করবে */}
          {hasProfileData && (
            <div className="w-full text-left space-y-4">
              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block mb-1">About Me / Bio</span>
                <p className="text-sm text-neutral-700 font-medium leading-relaxed">{userData.bio}</p>
              </div>

              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block mb-2">Skills & Expertise</span>
                <div className="flex flex-wrap gap-1.5">
                  {userData.skills?.map((skill, index) => (
                    <Chip key={index} size="sm" variant="flat" className="bg-neutral-200 text-neutral-800 font-bold px-1">{skill}</Chip>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </Card>
    </div>
  );
}