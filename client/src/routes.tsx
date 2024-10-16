import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import App from "./App";
import RequireAuth from "./features/auth/RequireAuth";
import LoadingPage from "./pages/loadingPage/LoadingPage";

// Lazy-loaded components for code-splitting
const Login = lazy(() => import("./features/auth/Login"));
const Register = lazy(() => import("./features/auth/Register"));
const CreateRecipe = lazy(() => import("./pages/createRecipe/CreateRecipe"));
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const UserRecipes = lazy(() => import("./pages/userRecipes/UserRecipes"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "login",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "register",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <Register />
          </Suspense>
        ),
      },
      {
        path: "recipes/create",
        element: <RequireAuth />,
        children: [
          {
            path: "",
            element: (
              <Suspense fallback={<LoadingPage />}>
                <CreateRecipe />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "current",
        element: <RequireAuth />,
        children: [
          {
            path: "",
            element: (
              <Suspense fallback={<LoadingPage />}>
                <Dashboard />
              </Suspense>
            ),
            children: [
              {
                path: "recipes",
                element: <UserRecipes />,
              },
              {
                path: "liked/recipes",
                element: <h1>hello</h1>, // You can lazy load here if this becomes dynamic content
              },
              {
                path: "favorite/recipes",
                element: <h1>hello</h1>, // Same as above
              },
              {
                path: "followers",
                element: <h1>hello</h1>,
              },
              {
                path: "following",
                element: <h1>hello</h1>,
              },
            ],
          },
        ],
      },
    ],
  },
]);
