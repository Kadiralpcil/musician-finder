// frontend/src/hooks/useAuth.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/services/api.service';
import { useRouter } from 'next/navigation';

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (response) => {
      if (response.success && response.data) {
        // Store token and user data
        localStorage.setItem('auth_token', response.data.token);
        localStorage.setItem('user_data', JSON.stringify(response.data.user));
        
        // Update query cache
        queryClient.setQueryData(['currentUser'], response.data.user);
        
        // Redirect to dashboard or home
        router.push('/dashboard');
      }
    },
    onError: (error) => {
      console.error('Login failed:', error);
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
        // Store token and user data
        localStorage.setItem('auth_token', response.data.token);
        localStorage.setItem('user_data', JSON.stringify(response.data.user));
        
        // Update query cache
        queryClient.setQueryData(['currentUser'], response.data.user);
        
        // Redirect to dashboard or profile setup
        router.push('/profile/setup');
      }
    },
    onError: (error) => {
      console.error('Registration failed:', error);
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
      router.push('/login');
    },
  });
};