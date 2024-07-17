import axios from "axios"; 
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchBlogsFail, fetchBlogsStart, fetchBlogsSuccess, fetchBlogsSuccessWithOutpayload, fetchOneBlogSuccess } from "../app/features/blogSlice";
import { toastError, toastSuccess, toastWarn } from "../helpers/toastify";
import useAuthServices from "./useAuthServices";

const useBlogServices = () => {
  const dispatch = useDispatch();
  const {logout} = useAuthServices();
  const navigate = useNavigate();
  const base_url = process.env.REACT_APP_BASE_URL;
  const token = useSelector((state) => state.login.token);



  //!######## - LIST BLOGS
  const getBlogs = async () => {
    const url = base_url + "/blogs";
    dispatch(fetchBlogsStart());
    try {
      const response = await axios(url);
      console.log(response); 
      dispatch(fetchBlogsSuccess(response?.data?.result))
    } catch (error) {
        console.log(error);
        toastError('Listing blogs is failed - '+error.message)
        dispatch(fetchBlogsFail());
    }
  };



  //!######## - GET ONE BLOG
  const getOneBlog = async (id) => {
    const url = base_url + "/blogs/"+id;
    dispatch(fetchBlogsStart());
    try {
      const response = await axios(url);

      expiredSession(response?.status, logout,toastWarn)
      console.log(response); 
      dispatch(fetchOneBlogSuccess(response?.data?.result))
    } catch (error) {
        console.log(error);
        toastError('Listing One blog is failed - '+error.message)
        dispatch(fetchBlogsFail());
    }
  };


  //!######## - POST NEW BLOG
  const createBlog = async (body) => {
    const url = base_url + "/blogs";
    dispatch(fetchBlogsStart());
    try {
      const response = await axios({
        method: 'post',
        url,
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+token,
        },
        data: body
      });
      console.log(response?.status); 
      console.log(response); 
      dispatch(fetchBlogsSuccessWithOutpayload())
      toastSuccess(response?.data?.message)
      getBlogs();
    } catch (error) {
      console.log(error);
      toastError('Posting new blog is failed - '+error.message)
      dispatch(fetchBlogsFail());
      expiredSession(error, logout,toastWarn)
    }
  };


  //!######## - UPDATE A BLOG
  const updateBlog = async (id,body) => {
    const url = base_url + "/blogs/"+id;
    dispatch(fetchBlogsStart());
    try {
      const response = await axios({
        method: 'put',
        url,
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+token,
        },
        data: body
      });
      expiredSession(response?.status, logout,toastWarn)
      console.log(response); 
      dispatch(fetchBlogsSuccessWithOutpayload())
      toastSuccess(response?.data?.message)
      getOneBlog(id);
    } catch (error) {
        console.log(error);
        toastError('Updating blog is failed - '+error.message)
        dispatch(fetchBlogsFail());
    }
  };

  //!######## - DELETE A BLOG
  const deleteBlog = async (id) => {
    const url = base_url + "/blogs/"+id;
    dispatch(fetchBlogsStart());
    try {
      const response = await axios({
        method: 'delete',
        url,
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+token,
        }
      });
      expiredSession(response?.status, logout,toastWarn)
      console.log(response); 
      dispatch(fetchBlogsSuccessWithOutpayload())
      toastSuccess("Blog is deleted!")
      navigate('/');
    } catch (error) {
        console.log(error);
        toastError('Deleting blog is failed - '+error.message)
        dispatch(fetchBlogsFail());
    }
  };

  return { getBlogs,getOneBlog,createBlog, updateBlog, deleteBlog };
};

export default useBlogServices;


const expiredSession = (error,logout,toastWarn) => {
  if(error?.response?.status === 401  && error?.response?.data?.message.includes("Invalid Token")) {
    toastWarn("Session expired!")
    logout();
    return;
  }

}