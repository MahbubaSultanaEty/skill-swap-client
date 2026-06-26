import LoginForm from "@/components/authentication/LoginForm";

export const metadata = {
  title: "Login | SkillSwap",
  description:
    "Sign in to your SkillSwap account to manage tasks, proposals, projects, and payments securely.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return <LoginForm />;
}