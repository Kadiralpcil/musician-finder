// hooks/useAuth.ts
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { 
  useLoginMutation, 
  useRegisterMutation, 
  useLogoutMutation 
} from '@/store/api/authApi';
import { 
  setCredentials, 
  clearCredentials, 
  selectCurrentUser, 
  selectIsAuthenticated 
} from '@/store/slices/authSlice';
import type { RootState } from '@/store/store';
import { LoginRequest, RegisterRequest } from '@/types/api.types';

export const useAuth = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  
  const user = useSelector((state: RootState) => selectCurrentUser(state));
  const isAuthenticated = useSelector((state: RootState) => selectIsAuthenticated(state));

  // Debug log
  console.log('🔍 Auth Debug:', { user, isAuthenticated, fullState: (state: RootState) => state.auth });

  return {
    user,
    isAuthenticated,
  };
};

export const useLogin = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loginMutation, { isLoading, error }] = useLoginMutation();

  const login = async (credentials: LoginRequest) => {
    try {
      const result = await loginMutation(credentials).unwrap();
      
      if (result.success && result.data) {
        // Set Redux state
        dispatch(setCredentials({
          user: result.data.user,
          token: result.data.token,
        }));
        
        // Redirect to dashboard
        router.push('/dashboard');
        
        return result;
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  return {
    login,
    isLoading,
    error,
  };
};

export const useRegister = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [registerMutation, { isLoading, error }] = useRegisterMutation();

  const register = async (userData: RegisterRequest) => {
    try {
      const result = await registerMutation(userData).unwrap();
      
      if (result.success && result.data) {
        // Set Redux state
        dispatch(setCredentials({
          user: result.data.user,
          token: result.data.token,
        }));
        
        // Redirect to dashboard
        router.push('/dashboard');
        
        return result;
      }
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  return {
    register,
    isLoading,
    error,
  };
};

export const useLogout = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [logoutMutation] = useLogoutMutation();

  const logout = async () => {
    try {
      // Call logout API (optional - for server-side token invalidation)
      await logoutMutation().unwrap();
    } catch (error) {
      // Even if API fails, still clear local state
      console.warn('Logout API failed, but clearing local state:', error);
    } finally {
      // Clear Redux state
      dispatch(clearCredentials());
      
      // Redirect to home
      router.push('/');
    }
  };

  return {
    logout,
  };
};