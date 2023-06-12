import React, { useEffect } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/login";
import ContactPage from "./pages/CRUD";
import BookPage from "./pages/book";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import RegisterPage from "./pages/register";
import { getUser } from "./services/api";
import { useDispatch, useSelector } from "react-redux";
import { doGetAccountAction } from "./redux/account/accountSilce";
import Loading from "./components/Loading";
import NotFound from "./components/NotFound";
import AdminPage from "./pages/admin";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/Admin/AdminLayout";
import CrudPage from "./pages/CRUD";
import "./styles/reset.scss";
import "./styles/global.scss";
import TableBook from "./components/Admin/Book/TableBook";
import OrderPage from "./pages/order";
import HistoryPage from "./pages/history/history";
const Layout = () => {
  return (
    <div className="layout-page">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default function App() {
  const dispatch = useDispatch();
  const isAuthen = useSelector((state) => state.account.isAuthorized);
  const getAccount = async () => {
    if (
      window.location.pathname === "/login" ||
      window.location.pathname === "/register"
    )
      return;
    const res = await getUser();
    if (res && res.data) {
      dispatch(doGetAccountAction(res.data));
    }
  };
  useEffect(() => {
    getAccount();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/admin",
      element: (
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,

      children: [
        {
          index: true,
          element: <AdminPage />,
        },

        {
          path: "user",
          element: <CrudPage />,
        },
        {
          path: "book",
          element: <TableBook />,
        },
      ],
    },

    {
      path: "/",
      element: <Layout />,
      errorElement: <NotFound />,

      children: [
        { index: true, element: <Home /> }, // luôn gọi tới thằng này khi không có thằng con
        {
          path: "contact",
          element: <ContactPage />,
        },
        {
          path: "book/:slug",
          element: <BookPage />,
        },
        {
          path: "order",
          element: <OrderPage />,
        },
        {
          path: "history",
          element: <HistoryPage />,
        }
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
      {/* {isAuthen === true ||
      window.location.pathname === "/login" ||
      window.location.pathname === "/register" ||
      window.location.pathname === "/" ? (
        <RouterProvider router={router} />
      ) : (
        <Loading/>
      )} */}
      <RouterProvider router={router} />
    </>
  );
}
