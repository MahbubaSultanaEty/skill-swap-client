"use client";

import { Button } from "@heroui/react";

import { FaGoogle } from "react-icons/fa";

export default function GoogleSignInButton() {
  const handleGoogleSignIn = async () => {
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      console.log(error);
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