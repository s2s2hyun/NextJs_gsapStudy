import { createContext, useState } from "react";

interface AuthContextType {
  user: any;
  setUser: (user: any) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  username: string;
  setUsername: (username: string) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  isLoading: true,
  setIsLoading: () => {},
  username: "",
  setUsername: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState("");

  return (
    <AuthContext.Provider
      value={{ user, setUser, isLoading, setIsLoading, username, setUsername }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
