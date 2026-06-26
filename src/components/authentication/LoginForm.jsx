"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, BriefcaseBusiness, ShieldCheck } from "lucide-react";
import { Eye, EyeSlash, ArrowRightFromSquare } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";


import { authClient } from "@/lib/auth-client";
import GoogleSignInButton from "./GoogleSignInBtn";
import { toast } from "react-toastify";
import { toast as sonnerToast } from "sonner";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectTo = searchParams.get("redirect") || "/";

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
      callbackURL: redirectTo,
    });

    if (error) {
      toast.error(error.message || "Invalid email or password");
      return;
    }

      if (!error) {
  sonnerToast.success(
    "Logged In successfully 🎉"
  );

  setTimeout(() => {
    router.push("/");
  }, 1500);

  return;
}
  };

  return (
    <section className="min-h-screen bg-[#fafdf9]">
      <div className="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-2">
        {/* LEFT */}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden items-center px-8 py-16 lg:flex"
        >
          <div>
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[#166534] text-white">
                <BriefcaseBusiness size={30} />
              </div>

              <div>
                <h2 className="text-3xl font-bold text-[#166534]">
                  SkillSwap
                </h2>

                <p className="text-sm text-gray-500">
                  Freelance Micro-Task Platform
                </p>
              </div>
            </div>

            <h1 className="max-w-xl text-5xl font-bold leading-tight text-[#0f1a0f]">
              Welcome Back.
              <span className="mt-2 block text-[#166534]">
                Continue Your Journey.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-8 text-gray-600">
              Access your dashboard, manage projects, hire talent,
              or complete tasks securely.
            </p>

            <div className="mt-10 space-y-5">
              {[
                "Secure authentication",
                "Manage your projects",
                "Track payments",
                "Access your dashboard instantly",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <ShieldCheck
                    size={20}
                    className="text-[#22c55e]"
                  />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 inline-flex items-center gap-2 font-medium text-[#166534]">
              Let's get back to work
              <ArrowRight size={18} />
            </div>
          </div>
        </motion.div>

        {/* RIGHT */}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center justify-center px-4 py-10"
        >
          <div className="w-full max-w-lg rounded-[32px] border border-green-100 bg-white p-8 shadow-sm">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-[#0f1a0f]">
                Login
              </h2>

              <p className="mt-2 text-gray-500">
                Welcome back to SkillSwap.
              </p>
            </div>

            <Form
              className="flex flex-col gap-5"
              render={(props) => <form {...props} />}
              onSubmit={handleSubmit}
            >
              <TextField
                name="email"
                type="email"
                validate={(value) =>
                  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                    value
                  )
                    ? null
                    : "Please enter a valid email."
                }
              >
                <Label>Email Address</Label>

                <Input
                  name="email"
                  placeholder="Enter your email"
                />

                <FieldError />
              </TextField>

              <TextField
                className="relative"
                name="password"
              >
                <Label>Password</Label>

                <Input
                  name="password"
                  type={
                    showPassword ? "text" : "password"
                  }
                  placeholder="Enter password"
                />

                <Description>
                  Enter your account password.
                </Description>

                <FieldError />

                <span
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-5 top-9 cursor-pointer"
                >
                  {showPassword ? (
                    <Eye />
                  ) : (
                    <EyeSlash />
                  )}
                </span>
              </TextField>

              {/* <div className="flex items-center justify-end">
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-[#166534] hover:underline"
                >
                  Forgot Password?
                </Link>
              </div> */}

              <Button
                type="submit"
                className="h-12 bg-[#166534] w-full text-white hover:bg-[#15803d]"
              >
                <ArrowRightFromSquare />
                Login
              </Button>
            </Form>

            <div className="relative my-7">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>

              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-xs uppercase text-gray-400">
                  Or Continue With
                </span>
              </div>
            </div>

            <GoogleSignInButton />

            <p className="mt-6 text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                href="/auth/signup"
                className="font-medium text-[#166534]"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}