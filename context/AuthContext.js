import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { API_FE } from "@/config/index";
import axios from "axios";

const AuthContext = createContext();

//functions provided by Authcontext
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => checkUserLoggedIn(), []);

  // Register User
  const register = async (user) => {
    console.log(user);
  };

  // Login User
  const login = async ({ username, password }) => {
    const res = await fetch(`${API_FE.LoginUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await res.json();

    console.log(data);
    console.log("res", data);

    if (res.ok) {
      setUser(data.user);
      router.replace("/");
    } else {
      setError(data.message);
      setError(null);
    }
  };

  // Logout User
  const logout = async () => {
    console.log("Logout");
    const res = await fetch(`${API_FE.LogoutUrl}`, {
      method: "POST",
    });

    if (res.ok) {
      setUser(null);
      router.push("account/login");
    }
  };

  // Check if user is logged in
  // this function mut be called by useEffect
  const checkUserLoggedIn = async (user) => {
    console.log("Check");
    const res = await fetch(`${API_FE.UserUrl}`);
    const data = await res.json();
    if (res.ok) {
      setUser(data.user);
    } else {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
