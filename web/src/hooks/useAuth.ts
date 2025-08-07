import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiError, authService } from "@/services/api.service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (response) => {
      if (response.success && response.data) {
        localStorage.setItem("auth_token", response.data.token);
        localStorage.setItem("user_data", JSON.stringify(response.data.user));
        queryClient.setQueryData(["currentUser"], response.data.user);
        router.push("/");
      }
    },
    onError: (error: ApiError) => {
      toast.error(error.message, {
        position: "top-right",
        richColors: true,
      });
    },
  });
};

export const useRegister = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.register,
    onSuccess: (response) => {
      if (response.success && response.data) {
        localStorage.setItem("auth_token", response.data.token);
        localStorage.setItem("user_data", JSON.stringify(response.data.user));
        queryClient.setQueryData(["currentUser"], response.data.user);
        router.push("/");
      }
    },
    onError: (error: ApiError) => {
      toast.error(error.message, {
        position: "top-right",
        richColors: true,
      });
    },
  });
};

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      // Clear query cache
      queryClient.clear();

      // Redirect to login
      router.push("/login");
    },
  });
};
