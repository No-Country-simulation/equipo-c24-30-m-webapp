import { useDispatch } from "react-redux";
//import { useNavigate } from "react-router-dom";
import axios from "axios";
import { resetUserInfo } from "../redux/slices/userSlice"; 
import { logout } from "../redux/slices/authSlice"; 

const useLogout = () => {
  const dispatch = useDispatch();
  //const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");

    delete axios.defaults.headers.common['Authorization'];

    dispatch(resetUserInfo()); 
    dispatch(logout()); 

    //navigate("/login"); 
  };

  return handleLogout; 
};

export default useLogout;