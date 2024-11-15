import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export const GuestLayout = () => {
  // Accessing token from the Redux store
  const { token } = useSelector((state) => state.auth);

  //check whether token is available
  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col md:flex-row h-screen items-center justify-center">
      <Outlet />
    </div>
  );
};
