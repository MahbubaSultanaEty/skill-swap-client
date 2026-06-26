"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";


export default function GoogleSignInButton() {
  const handleGoogleSignIn = async() => {
        const data = await authClient.signIn.social({
          provider: "google",
          callbackURL: "/"
        })
        if (data) {
          toast.success("  Signing in...")
        }
  };

  return (
    <Button
      fullWidth
      variant="bordered"
      onPress={handleGoogleSignIn}
      className="h-12 border-green-200 hover:bg-green-50"
    >
      <div className="flex items-center gap-3">
        <FaGoogle size={20} />
        <span>Continue with Google</span>
      </div>
    </Button>
  );
}