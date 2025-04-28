import React from 'react'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

const SignIn = () => {
  return (
    <div className="sign-in-container" style={{ textAlign: "center", marginTop: "100px" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "20px" }}>Track your Monthly Finance</h1>

      <SignedOut>
        <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
          <SignUpButton mode="modal">
            <button style={{ backgroundColor: "navy", color: "white", padding: "10px 20px", borderRadius: "5px", border: "none" }}>
              Sign Up
            </button>
          </SignUpButton>

          <SignInButton mode="modal">
            <button style={{ backgroundColor: "navy", color: "white", padding: "10px 20px", borderRadius: "5px", border: "none" }}>
              Sign In
            </button>
          </SignInButton>
        </div>
      </SignedOut>

      <SignedIn>
        <Navigate to="/dash" />
      </SignedIn>
    </div>
  )
}

export default SignIn
