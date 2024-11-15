import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../components/layouts/MainLayout";
import { GuestLayout } from "../components/layouts/GuestLayout";
import { Product } from "../pages/products/Product";
import { AddProduct } from "../pages/products/AddProduct";
import { ProductEdit } from "../pages/products/ProductEdit";
import { FavoriteProducts } from "../pages/products/FavoriteProducts";
import { SearchProducts } from "../pages/products/SearchProducts";
import { SignIn } from "../pages/users/SignIn";
import { ProductDetails } from "../pages/products/ProductDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Product /> },
      { path: "/add-product", element: <AddProduct /> },
      { path: "/edit-product/:id", element: <ProductEdit /> },
      { path: "/product-details/:id", element: <ProductDetails /> },
      { path: "/favorite-product", element: <FavoriteProducts /> },
      { path: "/search-results", element: <SearchProducts /> },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <SignIn />,
      },
    ],
  },
]);

export default router;
