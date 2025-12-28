"use client";

import Image from "next/image";
import GoogleBtn from "./google-btn";
import { useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

export default function Register() {
  const [showEmailRegister, setShowEmailRegister] = useState(false);

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
          <h1>Create an account</h1>
          <p>Get started with your free account today.</p>
        </div>
        <div className="google">
          <GoogleBtn />
        </div>
        <div className="divider">
          <p>Or sign up with email</p>
        </div>
        <button
          className="email-toggle"
          onClick={() => setShowEmailRegister(!showEmailRegister)}
        >
          <span>Continue with Email</span>
          <HiChevronDown
            className={`toggle-icon ${showEmailRegister ? "open" : ""}`}
            size={20}
          />
        </button>
        <AnimatePresence>
          {showEmailRegister && (
            <motion.div
              className="inputs"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="input">
                <p>Full Name</p>
                <input type="text" />
              </div>
              <div className="input">
                <p>Email</p>
                <input type="email" />
              </div>
              <div className="input">
                <p>Password</p>
                <input type="password" />
              </div>
              <div className="input">
                <p>Confirm Password</p>
                <input type="password" />
              </div>
              <button className="SignIn">Create Account</button>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="footer">
          <p className="text">
            Already have an account?
            <a href="/?r=login">Sign in</a>
          </p>
          <p>© 2026 Nexera (.EXE)</p>
        </div>
      </div>
    </div>
  );
}