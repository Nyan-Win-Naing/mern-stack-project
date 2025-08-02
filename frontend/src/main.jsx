import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import RecipeForm from "./pages/RecipeForm.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import React from "react";
import SignUpForm from "./pages/SignUpForm.jsx";
import SignInForm from "./pages/SignInForm.jsx";

let router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/recipes/create",
        element: <RecipeForm />,
      },
      {
        path: "/recipes/edit/:id",
        element: <RecipeForm />,
      },
      {
        path: "/sign-in",
        element: <SignInForm />,
      },
      {
        path: "/sign-up",
        element: <SignUpForm />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
