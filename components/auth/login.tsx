"use client";

import Image from "next/image";
import GoogleBtn from "./google-btn";
import { useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Login() {
  const [showEmailLogin, setShowEmailLogin] = useState(false);
  const { replace } = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (data.success) {
      // cookie is set by server automatically
      replace("/Home"); // redirect after login
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="loginContainer">
      <div className="context">
        <div className="logo">
          <Image
            src="/logo/nexera-logo2.png"
            alt="Nexera Logo"
            width={120}
            height={40}
            className="logoImage"
          />
        </div>
        <div className="top">
          <h1>Welcome back</h1>
          <p>Enter your details to access your workspace.</p>
        </div>
        <div className="google">
          <GoogleBtn />
        </div>
        <div className="divider">
          <p>Or sign in with email</p>
        </div>
        <button
          className="email-toggle"
          onClick={() => setShowEmailLogin(!showEmailLogin)}
        >
          <span>Continue with Email</span>
          <HiChevronDown
            className={`toggle-icon ${showEmailLogin ? "open" : ""}`}
            size={20}
          />
        </button>
        <AnimatePresence>
          {showEmailLogin && (
            <motion.form
              onSubmit={handleLogin}
              className="inputs"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="input">
                <p>Email</p>
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input">
                <p>
                  <span>Password</span>
                  <a href="#">Forgot Password?</a>
                </p>
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button className="SignIn" type="submit">
                Sign In
              </button>
            </motion.form>
          )}
        </AnimatePresence>
        <div className="footer">
          <p className="text">
            Don't have an account?
            <a href="/?r=register">Sign up</a>
          </p>
          <p>© 2026 Nexera (.EXE)</p>
        </div>
      </div>
    </div>
  );
}
