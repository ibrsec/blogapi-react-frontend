import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import Avatar from "@mui/material/Avatar";

import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useBlogServices from "../services/useBlogServices";
import { useSelector } from "react-redux";
import HomeIcon from "@mui/icons-material/Home";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import EditModal from "../components/EditModal";

const BlogDetail = ({ open, setOpen }) => {
  const { id } = useParams();
  console.log(id);
  const { getOneBlog, deleteBlog } = useBlogServices();
  const oneBlog = useSelector((state) => state.blog.oneBlog);
  const categories = useSelector((state) => state.category.categories);
  const { users, username: ownUser } = useSelector((state) => state.login);

  const myUserID = users?.find((user) => user?.username === ownUser)?._id;
  console.log("myUserID", myUserID);

  const [openEdit, setOpenEdit] = useState(false);
  const handleOpen = () => {
    console.log("oneBlog => open basi =", oneBlog);
    setInputInfos({
      title: oneBlog?.title,
      content: oneBlog?.content,
      categoryId: oneBlog?.categoryId,
      userId: myUserID,
    });
    setOpenEdit(true);
  };
  const handleClose = () => setOpenEdit(false);
  const [inputInfos, setInputInfos] = useState({
    title: oneBlog?.title,
    content: oneBlog?.content,
    categoryId: oneBlog?.categoryId,
    userId: myUserID,
  });

  useEffect(() => {
    getOneBlog(id);
  }, []);
  const username = users?.find(
    (user) => user?._id === oneBlog?.userId
  )?.username;
  const category = categories?.find(
    (cat) => cat?._id === oneBlog?.categoryId
  )?.name;

  return (
    <Box maxWidth={1200} mx={"auto"} my={15}>
      <Card
        sx={{
          maxWidth: 1200,
          minHeight: 280,
          padding: ".5rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <Box>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {username ? username[0]?.toUpperCase() : "A"}
              </Avatar>
            }
            title={username}
            subheader={new Date(oneBlog?.createdAt).toLocaleString("tr-TR")}
            // subheader="September 14, 2016"
          />
          <CardContent>
            <Typography fontWeight={500}>{oneBlog?.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {oneBlog?.content}
            </Typography>
          </CardContent>
        </Box>
        <CardActions
          disableSpacing
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            flexWrap:"wrap"
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Category:{category}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
            {username === ownUser && (
              <Box sx={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ display: "flex", alignItems: "center", gap: ".4rem" }}
                  onClick={() => handleOpen()}
                >
                  Edit
                  <BorderColorIcon />
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ display: "flex", alignItems: "center", gap: ".4rem" }}
                  onClick={() => deleteBlog(id)}
                >
                  Delete
                  <DeleteIcon />
                </Button>
              </Box>
            )}
            <Link to={"/"}>
              <Button
                variant="contained"
                sx={{ display: "flex", alignItems: "center", gap: ".4rem" }}
              >
                Home
                <HomeIcon />
              </Button>
            </Link>
          </Box>
        </CardActions>
      </Card>
      <EditModal
        open={openEdit}
        handleOpen={handleOpen}
        handleClose={handleClose}
        {...oneBlog}
        inputInfos={inputInfos}
        setInputInfos={setInputInfos}
      />
    </Box>
  );
};

export default BlogDetail;
