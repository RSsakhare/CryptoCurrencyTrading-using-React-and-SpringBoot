import React from "react";
import "./Auth.css";
import SignupForm from "./SignupForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
import SigninForm from "./SigninForm";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const renderForm = () => {
    switch (location.pathname) {
      case "/signup":
        return (
          <>
            <SignupForm />
            <div className="flex items-center justify-center pt-4 gap-2">
              <span className="text-white text-sm">Already have an account?</span>
              <Button
                className="text-white text-sm"
                variant="ghost"
                onClick={() => navigate("/signin")}
              >
                Sign in
              </Button>
            </div>
          </>
        );
      case "/forgot-password":
        return (
          <>
            <ForgotPasswordForm />
            <div className="flex items-center justify-center pt-4 gap-2 mt-2">
              <span className="text-white text-sm">Back to login?</span>
              <Button
                className="text-white text-sm"
                variant="ghost"
                onClick={() => navigate("/signin")}
              >
                Sign in
              </Button>
            </div>
          </>
        );
      default:
        return (
          <>
            <SigninForm />
            <div className="flex items-center justify-center pt-4 gap-2">
              <span className="text-white text-sm">Don't have an account?</span>
              <Button
                className="text-white text-sm"
                variant="ghost"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </Button>
            </div>
            <div className="pt-2 text-center">
              <Button
                className="text-white text-sm w-full py-5 mt-10"
                variant="outline"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Password
              </Button>
            </div>
          </>
        );
    }
  };

  return (
    <div className="authContainer h-screen relative">
      {/* Overlay */}
      <div className="absolute inset-0 bg-opacity-50">
        <div className="flex items-center justify-center h-full">
          {/* Auth Modal */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
            flex flex-col justify-center items-center h-[35rem] w-[30rem] rounded-md z-50 
            backdrop-blur bg-opacity-50 shadow-2xl shadow-white px-6">

            <h1 className="text-6xl font-bold pb-9 text-white">Coin Market</h1>
            <section className="w-full">{renderForm()}</section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
