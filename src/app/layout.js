import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Toaster } from "sonner";
import { ToastContainer } from "react-toastify";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "SkillSwap | Freelance Micro-Task Platform",
    template: "%s | SkillSwap",
  },

  description:
    "Connect with skilled freelancers, post tasks, receive proposals, hire top talent, and manage projects securely in one place.",

  keywords: [
    "SkillSwap",
    "Freelance Platform",
    "Micro Tasks",
    "Freelancers",
    "Remote Work",
    "Task Marketplace",
    "Hire Freelancers",
    "Client Dashboard",
    "Freelancing",
  ],

  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}  bg-accent h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white">
       <ToastContainer/>
        <Navbar />
        <Toaster richColors/>
        <main>
 {children}
        </main>
        <Footer/>
     </body>
    </html>
  );
}
