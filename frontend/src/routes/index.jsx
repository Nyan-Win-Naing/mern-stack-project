import React, { useContext } from "react";
import App from "../App.jsx";
import Home from "../pages/Home.jsx";
import About from "../pages/About.jsx";
import Contact from "../pages/Contact.jsx";
import RecipeForm from "../pages/RecipeForm.jsx";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";

import SignUpForm from "../pages/SignUpForm.jsx";
import SignInForm from "../pages/SignInForm.jsx";
import { AuthContext } from "../contexts/AuthContext.jsx";

export default function Index() {
  let { user } = useContext(AuthContext);

  let router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: user ? <Home /> : <Navigate to={"/sign-in"} />,
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
          element: user ? <RecipeForm /> : <Navigate to={"/sign-in"} />,
        },
        {
          path: "/recipes/edit/:id",
          element: <RecipeForm />,
        },
        {
          path: "/sign-in",
          element: !user ? <SignInForm /> : <Navigate to={"/"}/>,
        },
        {
          path: "/sign-up",
          element: !user ? <SignUpForm /> : <Navigate to={"/"}/>,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
