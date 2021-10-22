import { useEffect, useState, useContext } from "react";
import { api } from "../services/api";
import { createContext, ReactNode } from "react";
import * as AuthSessions from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextData {
  user: User | null;
  isSigningIn: boolean;
  signIn: () => void;
  signOut: () => void;
}

interface AuthResponse {
  token: string;
  user: User;
}

interface AuthorizationResponse {
  params: {
    code?: string;
    error?: string;
  };
  type?: string;
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  async function signIn() {
    try {
      setIsSigningIn(true);
      const authUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=5532246f7a05346a7e2a`;

      const authSessionResponse = (await AuthSessions.startAsync({
        authUrl,
      })) as AuthorizationResponse;

      if (
        authSessionResponse.type === "success" &&
        authSessionResponse.params.error !== "access"
      ) {
        const authResponse = await api.post<AuthResponse>("/authenticate", {
          code: authSessionResponse.params.code,
        });
        const { token, user } = authResponse.data as AuthResponse;

        api.defaults.headers.common.authorization = `Bearer ${token}`;

        await AsyncStorage.setItem("@dowhile:token", token);
        await AsyncStorage.setItem("@dowhile:user", JSON.stringify(user));
        setUser(user);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSigningIn(false);
    }
  }

  async function signOut() {
    setUser(null);
    await AsyncStorage.removeItem("@dowhile:token");
    await AsyncStorage.removeItem("@dowhile:user");
  }

  useEffect(() => {
    async function loadUserStorageData() {
      const userStorage = await AsyncStorage.getItem("@dowhile:user");
      const tokenStorage = await AsyncStorage.getItem("@dowhile:token");
      if (userStorage && tokenStorage) {
        api.defaults.headers.common.authorization = `Bearer ${tokenStorage}`;
        setUser(JSON.parse(userStorage));
      } else {
        setUser(null);
      }
      setIsSigningIn(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        user,
        isSigningIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
