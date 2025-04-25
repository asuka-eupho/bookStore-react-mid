import React, { useEffect, useState } from 'react';
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
import { fetchUserAPI } from './services/Api-handle';
import { useDispatch, useSelector } from 'react-redux';
import { runGetAccountActon, runLoginAction } from './redux/account/accountSlice';
import Loading from './components/Reloading';
import Error404 from './components/Error/404';
import ProtectedRoute from './components/ProtectedRoute';
import AdminPage from './screen/admin';
import LayoutAdmin from './components/Admin/layoutAdmin';

const Layout = () => {
  return (
    <>
      <HeaderPage />
      <Outlet />
      <FooterPage />
    </>
  )
}
const AdminLayout = () => {
  const isAdminRoute = window.location.pathname.startsWith("/admin")
  const admin = useSelector(state => state.account.user);
  const adminRole = admin.role;
  return (
    <>
      {isAdminRoute && adminRole === 'ADMIN' && <HeaderPage />}
      <Outlet />
      {isAdminRoute && adminRole === 'ADMIN' && <FooterPage />}
    </>
  )
}

export default function App() {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(state => state.account.isAuthenticated)
  const fetchAccount = async () => {
    if (window.location.pathname == "/login"
      || window.location.pathname == "/register"
    ) return;
    const res = await fetchUserAPI();
    if (res.data) {
      dispatch(runGetAccountActon(res.data));
    }
  }
  useEffect(() => {
    fetchAccount()
  }, [])

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <Error404 />,
      children: [
        {
          path: "product",
          element: <BookPage />,
        },
      ],
    },
    {
      path: "/admin",
      element: <LayoutAdmin />,
      errorElement: <Error404 />,
      children: [
        {
          index: true,
          element: <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
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
    <>
      {
        isAuthenticated === true || window.location.pathname === '/login' || window.location.pathname === '/register'
          || window.location.pathname === '/'
          ? <RouterProvider router={router} /> : <Loading />
      }
    </>
  );
}
