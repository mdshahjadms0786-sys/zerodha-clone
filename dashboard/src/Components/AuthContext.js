import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async (token) => {
    try {
      const res = await axios.get("http://localhost:3002/api/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.user);
    } catch {
      localStorage.removeItem("dash_token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");
    const storedToken = localStorage.getItem("dash_token");
    const token = urlToken || storedToken;

    if (urlToken) {
      localStorage.setItem("dash_token", urlToken);
      window.history.replaceState({}, document.title, "/");
    }

    if (token) {
      fetchProfile(token);
    } else {
      setLoading(false);
    }
  }, [fetchProfile]);

  const login = async (email, password) => {
    const res = await axios.post("http://localhost:3002/api/auth/login", {
      email,
      password,
    });
    localStorage.setItem("dash_token", res.data.token);
    setUser(res.data.user);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem("dash_token");
    setUser(null);
  };

  const getToken = () => localStorage.getItem("dash_token");

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export default AuthContext;
