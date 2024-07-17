import { useEffect, useState } from "react";
import useBlogServices from "../services/useBlogServices";
import { useSelector } from "react-redux";
import CardComp from "../components/CardComp";
import { Box, Button, Grid } from "@mui/material";
import useAuthServices from "../services/useAuthServices";
import useCategoryServices from "../services/useCategoryServices";
import ModalComp from "../components/ModalComp";

const Home = () => {
  const { getBlogs } = useBlogServices();
  const { getUsers } = useAuthServices();
  const { getCategories } = useCategoryServices();
  const blogs = useSelector((state) => state.blog.blogs);
  const categories = useSelector((state) => state.category.categories);
  const users = useSelector((state) => state.login.users);
  const token = useSelector((state) => state.login.token);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getBlogs();
    getUsers();
    getCategories();
    // eslint-disable-next-line
  }, []);
  console.log("blogs=", blogs);
  console.log("categories=", categories);
  console.log("users=", users);

  return (
    <>
      <Box align="center" mt={5}>
        {token && (
          <Button variant="contained" onClick={() => setOpen(!open)}>
            New Blog
          </Button>
        )}
      </Box>
      <ModalComp open={open} setOpen={setOpen} />

      <Grid
        container
        spacing={2}
        justifyContent={"center"}
        maxWidth={1200}
        mx={"auto"}
        my={15}
      >
        {blogs?.map((item) => (
          <CardComp
            key={item?._id}
            {...item}
            username={
              users?.find((user) => user?._id === item?.userId)?.username
            }
            category={
              categories?.find((cat) => cat?._id === item?.categoryId)?.name
            }
          />
        ))}
      </Grid>
    </>
  );
};

export default Home;
