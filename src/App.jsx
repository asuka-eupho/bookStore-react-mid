import React, { useState } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './screen/login/LoginPage';
import BookPage from './screen/products/BookPage';
import { Outlet } from "react-router-dom";
import HeaderPage from './components/Header/HeaderPage';
import FooterPage from './components/Footer/FooterPage';
import RegisterPage from './screen/register/registerPage';

const Layout = () => {
  return (
    <>
      <HeaderPage />
      <Outlet />
      <FooterPage />
    </>
  )
}

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <div>Oops...Something went wrongs</div>,
      children: [
        {
          path: "product",
          element: <BookPage />,
        },
      ],
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },

  ]);

  return (
    <RouterProvider router={router} />
  );
}
