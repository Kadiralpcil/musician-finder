"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import CustomLink from "@/components/ui/customLink";
import ErrorMessage from "@/components/ui/ErrorMessege";
import { LoginRequest, RegisterRequest } from "@/types/api.types";

interface AuthFormProps<T = LoginRequest | RegisterRequest> {
  type: "login" | "register";
  onSubmit: (data: T) => void;
  isLoading: boolean;
  title: string;
  description: string;
  submitButtonText: string;
  bottomLinks: {
    text: string;
    linkText: string;
    linkHref: string;
    additionalLinks?: {
      text: string;
      href: string;
    }[];
  };
}

const AuthForm = <T extends LoginRequest | RegisterRequest>({
  type,
  onSubmit,
  isLoading,
  title,
  description,
  submitButtonText,
  bottomLinks,
}: AuthFormProps<T>) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequest>({
    defaultValues: {
      name: "", // Her zaman var olsun, login'de kullanılmaz
      email: "",
      password: "",
    },
  });

  const handleFormSubmit: SubmitHandler<RegisterRequest> = (data) => {
    if (type === "login") {
      const loginData = {
        email: data.email,
        password: data.password,
      };
      onSubmit(loginData as T);
    } else {
      onSubmit(data as T);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {title}
          </CardTitle>
          <CardDescription className="text-center">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            {type === "register" && (
              <div className="space-y-2">
                <Controller
                  name="name"
                  control={control}
                  rules={{
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  }}
                  render={({ field }) => (
                    <>
                      <Label htmlFor="name" className="text-sm font-medium">
                        Full Name
                      </Label>
                      <Input
                        {...field}
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        disabled={isLoading}
                        className={errors.name ? "border-red-500" : ""}
                      />
                      {errors.name && (
                        <ErrorMessage message={errors.name.message ?? ""} />
                      )}
                    </>
                  )}
                />
              </div>
            )}

            <div className="space-y-2">
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                }}
                render={({ field }) => (
                  <>
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </Label>
                    <Input
                      {...field}
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      disabled={isLoading}
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && (
                      <ErrorMessage message={errors.email.message ?? ""} />
                    )}
                  </>
                )}
              />
            </div>

            <div className="space-y-2">
              <Controller
                name="password"
                control={control}
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                }}
                render={({ field }) => (
                  <>
                    <Label htmlFor="password" className="text-sm font-medium">
                      Password
                    </Label>
                    <Input
                      {...field}
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      disabled={isLoading}
                      className={errors.password ? "border-red-500" : ""}
                    />
                    {errors.password && (
                      <ErrorMessage message={errors.password.message ?? ""} />
                    )}
                  </>
                )}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                submitButtonText
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">{bottomLinks.text} </span>
            <CustomLink
              href={bottomLinks.linkHref}
              text={bottomLinks.linkText}
              type="primary"
            />
          </div>

          {bottomLinks.additionalLinks && (
            <div className="mt-4 text-center">
              {bottomLinks.additionalLinks.map((link, index) => (
                <CustomLink
                  key={index}
                  href={link.href}
                  text={link.text}
                  type="muted"
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthForm;
