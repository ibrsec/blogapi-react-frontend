import axios from "axios";
import { useDispatch } from "react-redux"; 
import { toastError } from "../helpers/toastify";
import { fetchcCategoriesSuccess, fetchcCategoryFail, fetchcCategoryStart } from "../app/features/categorySlice";

const useCategoryServices = () => {
  const dispatch = useDispatch(); 
  const base_url = process.env.REACT_APP_BASE_URL;
//   const token = useSelector((state) => state.login.token);

  const getCategories = async () => {
    const url = base_url + "/categories";
    dispatch(fetchcCategoryStart());
    try {
      const response = await axios(url);
      console.log(response); 
      dispatch(fetchcCategoriesSuccess(response?.data?.result))
    } catch (error) {
        console.log(error);
        toastError('Listing categories is failed - '+error.message)
        dispatch(fetchcCategoryFail());
    }
  };

  return { getCategories };
};

export default useCategoryServices;
