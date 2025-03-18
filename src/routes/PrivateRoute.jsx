import { Navigate, useLocation } from "react-router-dom";
import useAuthInfo from "../hooks/useAuthInfo";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuthInfo();
  const location = useLocation();
  console.log(loading);

  if (loading == true && user != null)
    return (
      <span className="loading loading-dots loading-3xl text-center"></span>
    );
  if (user?.email) return children;

  return <Navigate to="/signin" state={location.pathname} replace></Navigate>;
};

export default PrivateRoute;
