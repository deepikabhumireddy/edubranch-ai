import React, { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "student" | "instructor";

interface User {
  username: string;
  role: UserRole;
  name: string;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const DEMO_CREDENTIALS = [
  { username: "Student", password: "12345", role: "student" as UserRole, name: "Alex Johnson", avatar: "AJ" },
  { username: "Instructor", password: "abcd", role: "instructor" as UserRole, name: "Dr. Sarah Chen", avatar: "SC" },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string, password: string): boolean => {
    const cred = DEMO_CREDENTIALS.find(c => c.username === username && c.password === password);
    if (cred) {
      setUser({ username: cred.username, role: cred.role, name: cred.name, avatar: cred.avatar });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
