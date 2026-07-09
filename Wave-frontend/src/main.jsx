import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgotAndResetPasswordPage from "./pages/ForgotAndResetPasswordPage";
import { Toaster } from "sonner";
import EmailVerification from "./pages/EmailVerification";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import { GoogleOAuthProvider } from "@react-oauth/google";

const router = createBrowserRouter([
    {
        path: "/",
        element: < LandingPage />,
    },
    {
        path: "/login",
        element: < LoginPage />,
    },
    {
        path: "/signup",
        element: < SignupPage />,
    },
    {
        path: "/forgot-password",
        element: < ForgotAndResetPasswordPage />,
    },
    {
        path: "/verify-email",
        element: < EmailVerification />,
    },
    {
        path: "/reset-password",
        element: < ResetPasswordPage />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <GoogleOAuthProvider
            clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
        >
            <RouterProvider router={router} />
            <Toaster
                richColors
                position="top-center"
            />
        </GoogleOAuthProvider>
    </React.StrictMode>
);