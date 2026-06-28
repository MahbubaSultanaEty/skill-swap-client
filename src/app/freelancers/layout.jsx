import Footer from '@/components/shared/Footer'
export const metadata = {
  title: "Freelancer Dashboard | SkillSwap - Track Proposals & Find Work",
  description:
    "Manage your active proposals, explore new project opportunities, track your earnings, and update your professional skills profile from your SkillSwap Freelancer Dashboard.",
  robots: {
    index: false, 
    follow: false,
  },
};

export default function FreelacersPageLayout({children}) {
    return (
        <div>
            {children}
            <Footer/>
      </div>
  )
}
