import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../components/layouts/MainLayout";
import { GuestLayout } from "../components/layouts/GuestLayout";
import { Supplier } from "../pages/Suppliers/Supplier";
import { AddSupplier } from "../pages/Suppliers/AddSupplier";
import { EditSupplier } from "../pages/Suppliers/EditSupplier";
import { Login } from "../pages/Login";
import { SignUp } from "../pages/SignUp";
import { Dashboard } from "../pages/dashbaord/Dashboard";
import { Product } from "../pages/products/Product";
import { AddProduct } from "../pages/products/AddProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Product /> },
      { path: "/add-product", element: <AddProduct /> },
      
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
]);

export default router;
