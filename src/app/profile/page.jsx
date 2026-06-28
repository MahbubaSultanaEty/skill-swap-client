import EditProfileModal from "@/components/profile/EditProfileModal";
import { getUserByEmail } from "@/lib/actions/freelancer";
import { getUserSession } from "@/lib/core/session";
import { Avatar, Card, Chip } from "@heroui/react";


export const metadata = {
  title: "My Profile | Skill Swap",
  description: "View your account profiles, active role, and credentials.",
};

export default async function ProfilePage() {
  const session = await getUserSession();

  
  const userData = await getUserByEmail(session.email);
  // console.log(userData);

  const cleanDate = new Date(userData.createdAt).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });

  const isFreelancer = userData.role === "freelancer";

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 min-h-screen flex flex-col justify-center" style={{ background: "#f9fafb" }}>
      <Card className="p-8 border border-neutral-100 shadow-md bg-white rounded-3xl max-w-2xl mx-auto w-full">
        <div className="flex flex-col items-center text-center gap-6">

          <div className="relative group">
            <div className="absolute inset-0 bg-black/5 rounded-full blur-md group-hover:blur-lg transition opacity-50" />
            <Avatar className="w-32 h-32 text-2xl border-4 border-white shadow-xl bg-neutral-200 font-bold text-neutral-700">
              {userData.image ? <Avatar.Image alt={userData.name} src={userData.image} /> : null}
              <Avatar.Fallback>
                {userData.name?.charAt(0).toUpperCase() || "U"}
              </Avatar.Fallback>
            </Avatar>
          </div>

          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-black tracking-tight" style={{ color: "#0f172a" }}>
              {userData.name}
            </h1>
            {isFreelancer && userData.title && (
              <p className="text-sm font-medium" style={{ color: "#15803d" }}>
                {userData.title}
              </p>
            )}
            <p className="text-xs text-neutral-400 font-medium">Joined on {cleanDate}</p>
          </div>

          <div className="inline-flex items-center gap-1.5 bg-black text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase shadow-sm">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            {userData.role} Account
          </div>

          {isFreelancer && userData.plan && (
            <Chip size="sm" style={{ background: "#fef3c7", color: "#92400e" }}>
              {userData.plan.replaceAll("_", " ").toUpperCase()}
            </Chip>
          )}

          <div className="w-full h-[1px] bg-neutral-100" />

          <div className="w-full space-y-3 text-left">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center p-3.5 bg-neutral-50 rounded-xl border border-neutral-100 gap-1">
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Email</span>
              <span className="text-sm font-bold text-neutral-800">{userData.email}</span>
            </div>

            <div className="flex flex-col sm:flex-row justify-between sm:items-center p-3.5 bg-neutral-50 rounded-xl border border-neutral-100 gap-1">
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">User ID</span>
              <span className="text-xs font-mono font-bold text-neutral-600 bg-neutral-200/60 px-2 py-1 rounded">
                {userData._id}
              </span>
            </div>

            {isFreelancer && (
              <>
                <div className="flex flex-col sm:flex-row justify-between sm:items-center p-3.5 bg-neutral-50 rounded-xl border border-neutral-100 gap-1">
                  <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Rating</span>
                  <span className="text-sm font-bold text-neutral-800">⭐ 4.8</span>
                </div>

                {userData.hourlyRate && (
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center p-3.5 bg-neutral-50 rounded-xl border border-neutral-100 gap-1">
                    <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Hourly Rate</span>
                    <span className="text-sm font-bold" style={{ color: "#15803d" }}>
                      ${userData.hourlyRate}/hr
                    </span>
                  </div>
                )}

                {userData.bio && (
                  <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-100 text-left">
                    <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block mb-1">Bio</span>
                    <p className="text-sm text-neutral-700 leading-relaxed">{userData.bio}</p>
                  </div>
                )}

                {userData.skills?.length > 0 && (
                  <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-100 text-left">
                    <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block mb-2">Skills</span>
                    <div className="flex flex-wrap gap-1.5">
                      {userData.skills.map((skill, i) => (
                        <Chip key={i} size="sm" style={{ background: "#dcfce7", color: "#15803d" }}>
                          {skill}
                        </Chip>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="w-full mt-2">
            <EditProfileModal userData={userData} />
          </div>

        </div>
      </Card>
    </div>
  );
}