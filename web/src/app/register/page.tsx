"use client";

import AuthForm from "@/components/authForm";
import { useRegister } from "@/hooks/useAuth";
import { RegisterRequest } from "@/types/api.types";

export default function RegisterPage() {
  const registerMutation = useRegister();

  const handleSubmit = (data: RegisterRequest) => {
    registerMutation.mutate(data);
  };

  return (
    <AuthForm
      type="register"
      onSubmit={handleSubmit}
      isLoading={registerMutation.isPending}
      title="Create Account"
      description="Join Musician Finder and start connecting"
      submitButtonText="Create Account"
      bottomLinks={{
        text: "Already have an account?",
        linkText: "Sign in here",
        linkHref: "/login",
      }}
    />
  );
}
