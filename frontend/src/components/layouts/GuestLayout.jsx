import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useStateContext } from "../../contexts/NavigationContext";
import logo from "../../assets/images/logo.png";
import signup from "../../assets/images/sign-up-image.jpeg";

export const GuestLayout = () => {
  const { token } = useStateContext();
  const location = useLocation();
  if (token) {
    return <Navigate to="/" />;
  }

  return (
    
    <div className="flex flex-col md:flex-row  h-screen ">
      <div className="flex-1 p-4 border-b-2 md:border-b-0 md:border-r-2 ">
      <img className="md:w-[130px] w-[20%] mb-5 md:mb-0" src={logo} /><br />
        <img src={signup } alt="" />
      </div>
      <div className="flex-1 p-4 bg-[#263679]">
        <br />
        <Outlet />
      </div>
    </div>

  );
};


