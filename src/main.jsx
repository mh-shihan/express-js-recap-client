import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import InputForm from "./components/input-form/InputForm.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import Home from "./pages/home/Home.jsx";
import InsertedPeoples from "./pages/inserted-peoples/InsertedPeoples.jsx";
import Update from "./pages/update/Update.jsx";
import Signup from "./pages/signup/Signup.jsx";
import AuthProviders from "./firebase/AuthProviders.jsx";
import Signin from "./pages/signin/Signin.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";

// TanStack Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      { path: "/", element: <Home></Home> },
      {
        path: "input-form",
        element: (
          <PrivateRoute>
            <InputForm></InputForm>
          </PrivateRoute>
        ),
      },
      {
        path: "inserted-peoples",
        element: (
          <PrivateRoute>
            <InsertedPeoples></InsertedPeoples>
          </PrivateRoute>
        ),
      },
      {
        path: "update/:id",
        element: <Update></Update>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/inserted-peoples/${params.id}`),
      },
      {
        path: "signup",
        element: <Signup></Signup>,
      },
      {
        path: "signin",
        element: <Signin></Signin>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProviders>
        <RouterProvider router={router} />
      </AuthProviders>
    </QueryClientProvider>
  </StrictMode>
);
