import { useContext } from "react";
import { AuthContext } from "../firebase/AuthProviders";

const useAuthInfo = () => {
  return useContext(AuthContext);
};

export default useAuthInfo;
