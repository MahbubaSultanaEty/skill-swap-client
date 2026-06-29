"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Users,
  ShieldCheck,
  BriefcaseBusiness,
  ArrowRight,
} from "lucide-react";
import { Eye, EyeSlash, Check } from "@gravity-ui/icons";
import {
  Button,
  CheckboxGroup,
  Checkbox,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  RadioGroup,
  Radio,
} from "@heroui/react";

import { authClient } from "@/lib/auth-client";
import GoogleSignInButton from "@/components/authentication/GoogleSignInBtn";
import { toast } from "sonner";

export default function SignupPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [role, setRole] = useState("freelancer");

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirect") || "/";
  console.log(searchParams, "redirect to", redirectTo);

    // console.log("role",role)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const user = Object.fromEntries(formData.entries());

    const plan = role === "freelancer"? "freelancer_basic" : ""

    const { data, error } = await authClient.signUp.email({
      name: user.name,
      email: user.email,
      image: user.image,
      password: user.password,
      role,
    });

   if (data) {
  toast.success(
    "Account created successfully 🎉"
     );
     

  setTimeout(() => {
    router.push(redirectTo)
  }, 1500);

  return;
}

   if (error) {
  toast.error(
    error.message ||
      "Failed to create account"
  );
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
              Turn Your Skills Into
              <span className="block text-[#166534]">
                Real Opportunities.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-8 text-gray-600">
              Join thousands of freelancers and
              clients. Post tasks, submit
              proposals, collaborate, and get
              paid securely.
            </p>

            <div className="mt-10 space-y-5">
              {[
                "Secure Stripe Payments",
                "Verified Freelancers",
                "Fast Hiring Process",
                "Client & Freelancer Dashboards",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3"
                >
                  <ShieldCheck
                    size={20}
                    className="text-[#22c55e]"
                  />

                  <span className="text-gray-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-10 flex gap-8">
              <div>
                <h3 className="text-3xl font-bold text-[#166534]">
                  1200+
                </h3>

                <p className="text-gray-500">
                  Tasks Posted
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-[#166534]">
                  450+
                </h3>

                <p className="text-gray-500">
                  Freelancers
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-[#166534]">
                  98%
                </h3>

                <p className="text-gray-500">
                  Success Rate
                </p>
              </div>
            </div>

            <div className="mt-10 inline-flex items-center gap-2 font-medium text-[#166534]">
              Start your journey today
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
          <div className="w-full max-w-xl rounded-[32px] border border-green-100 bg-white p-8 shadow-sm">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-[#0f1a0f]">
                Create Account
              </h2>

              <p className="mt-2 text-gray-500">
                Join SkillSwap and start
                collaborating.
              </p>
            </div>

            <Form
              className="flex flex-col gap-5"
              render={(props) => (
                <form {...props} />
              )}
              onSubmit={handleSubmit}
            >
              <TextField name="name">
                <Label>Full Name</Label>
                <Input
                  required
                  name="name"
                  placeholder="Enter your name"
                />
                <FieldError />
              </TextField>

              <TextField name="image">
                <Label>Photo URL</Label>
                <Input
                  name="image"
                  placeholder="https://..."
                />
                <FieldError />
              </TextField>

              <TextField
                name="email"
                type="email"
                validate={(value) =>
                  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                    value
                  )
                    ? null
                    : "Please enter a valid email"
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
                validate={(value) => {
                  if (value.length < 6) {
                    return "Password must be at least 6 characters";
                  }                 

                  if (!/[a-z]/.test(value)) {
                    return "One lowercase letter required";
                  }

                  return null;
                }}
              >
                <Label>Password</Label>

                <Input
                  name="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter password"
                />

                <Description>
                  Must contain uppercase &
                  lowercase letters
                </Description>

                <FieldError />

                <span
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute right-5 top-9 z-50 cursor-pointer"
                >
                  {showPassword ? (
                    <Eye />
                  ) : (
                    <EyeSlash />
                  )}
                </span>
              </TextField>

  <div className="flex flex-col gap-4">
  <Label>Account Type</Label>

 <RadioGroup
  defaultValue="freelancer"
  name="role"
  orientation="horizontal"
  onChange={(value) => setRole(value)}
>
  <Radio value="client" className="">
    <Radio.Control>
      <Radio.Indicator />
    </Radio.Control>
    <Radio.Content>
      <Label>Client</Label>
    </Radio.Content>
  </Radio>

  <Radio value="freelancer">
    <Radio.Control>
      <Radio.Indicator />
    </Radio.Control>
    <Radio.Content>
      <Label>Freelancer</Label>
    </Radio.Content>
  </Radio>
</RadioGroup>
</div>

              <Button
                type="submit"
                className="h-12 w-full bg-[#166534] text-white hover:bg-[#15803d]"
              >
                <Check />
                Create Account
              </Button>
            </Form>

            {status.message && (
              <div
                className={`mt-4 rounded-xl border px-4 py-3 text-sm ${
                  status.type ===
                  "success"
                    ? "border-green-200 bg-green-50 text-green-700"
                    : "border-red-200 bg-red-50 text-red-600"
                }`}
              >
                {status.message}
              </div>
            )}

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
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="font-medium text-[#166534]"
              >
                Login
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}