import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useStateContext } from "../../contexts/NavigationContext";

export const GuestLayout = () => {
  const { token } = useStateContext();
  const location = useLocation();
  if (token) {
    return <Navigate to="/" />;
  }

  return (
    
    <div className="flex flex-col md:flex-row  h-screen ">
      <div className="flex-1 p-4 border-b-2 md:border-b-0 md:border-r-2 ">
      </div>
      <div className="flex-1 p-4 bg-[#263679]">
        <br />
        <Outlet />
      </div>
    </div>

  );
};


