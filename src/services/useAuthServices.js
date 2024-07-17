import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { fetchLoginFail, fetchLoginStart, fetchLoginSuccess, fetchLogoutSuccess, fetchRegisterSuccess, fetchUsersSuccess } from "../app/features/loginSlice";
import axios from "axios";
import { toastError, toastSuccess } from "../helpers/toastify";
import { fetchBlogsLogout } from "../app/features/blogSlice";

 
const useAuthServices = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const base_url = process.env.REACT_APP_BASE_URL;


    const getUsers = async() => {
        const url = base_url+"/auth/users";
        console.log(url);
        try {
            dispatch(fetchLoginStart());
            const response = await axios({
                method: 'get',
                url,
                headers:{
                    "Content-Type":"application/json",
                }
              }) 
            // toastSuccess(response?.data.message)
            dispatch(fetchUsersSuccess(response?.data?.result))
        } catch (error) {
            toastError('Listing Users is failed! - ',error.message)
            dispatch(fetchLoginFail());
        }
    }
    const loginApi = async(body) => {
        const url = base_url+"/auth/login";
        console.log(url);
        try {
            dispatch(fetchLoginStart());
            const response = await axios({
                method: 'post',
                url,
                headers:{
                    "Content-Type":"application/json",
                },
                data: body
              }) 
            toastSuccess(response?.data.message)
            dispatch(fetchLoginSuccess(response?.data))
            navigate("/")
        } catch (error) {
            toastError('Login is failed! - ',error.message)
            dispatch(fetchLoginFail());
        }
    }
    const registerApi = async(body) => {
        const url = base_url+"/auth/register";
        console.log(url);
        try {
            dispatch(fetchLoginStart());
            const response = await axios({
                method: 'post',
                url,
                headers:{
                    "Content-Type":"application/json",
                },
                data: body
              }) 
            toastSuccess(response?.data.message)
            dispatch(fetchRegisterSuccess())
            navigate("/login")
        } catch (error) {
            toastError('Register is failed! - ',error.message)
            dispatch(fetchLoginFail());
        }
    }

    const logout = () => {
        toastSuccess("Logged out successfully!")
            dispatch(fetchLogoutSuccess());
            dispatch(fetchBlogsLogout());
            navigate("/login")
    }



  return {loginApi,registerApi,logout, getUsers}
}

export default useAuthServices