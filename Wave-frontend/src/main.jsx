    import React from "react";
    import ReactDOM from "react-dom/client";
    import "./index.css";
    import {createBrowserRouter,RouterProvider,} from "react-router-dom";
    import LandingPage from "./pages/LandingPage";
    import LoginPage from "./pages/LoginPage";
    import SignupPage from "./pages/SignupPage";

    const router = createBrowserRouter([
        {
            path: "/",
            element: < LandingPage/>,
        },
        {
            path: "/login",
            element: < LoginPage/>,
        },
        {
            path: "/signup",
            element: < SignupPage/>,
        },
    ]);

    ReactDOM.createRoot(document.getElementById("root")).render(
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    );