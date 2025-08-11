"use client";

import AuthForm from "@/components/authForm";
import { useLogin } from "@/hooks/useAuth";
import { LoginRequest } from "@/types/api.types";

export default function LoginPage() {
  const loginMutation = useLogin();

  const handleSubmit = (data: LoginRequest) => {
    loginMutation.login(data);
  };

  return (
    <AuthForm
      type="login"
      onSubmit={handleSubmit}
      isLoading={loginMutation.isLoading}
      title="Welcome Back"
      description="Sign in to your Musician Finder account"
      submitButtonText="Sign In"
      bottomLinks={{
        text: "Don't have an account?",
        linkText: "Sign up here",
        linkHref: "/register",
        additionalLinks: [
          {
            text: "Forgot your password?",
            href: "/forgot-password",
          },
        ],
      }}
    />
  );
}
