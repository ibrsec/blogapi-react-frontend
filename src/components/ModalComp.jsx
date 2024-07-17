import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Modal from "@mui/material/Modal";
import useBlogServices from "../services/useBlogServices";
import { useSelector } from "react-redux";
import { toastWarn } from "../helpers/toastify";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 360,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ModalComp({ open, setOpen }) {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {createBlog} = useBlogServices();
  const { loading } = useSelector((state) => state.blog.loading);

  const categories = useSelector((state) => state.category.categories);
  const users = useSelector((state) => state.login.users);
  const username = useSelector((state) => state.login.username);

  const myUserID = users?.find((user) => user?.username === username)?._id;
  console.log("myUserID", myUserID);

  const [inputInfos, setInputInfos] = useState({
    title: "",
    content: "",
    categoryId: "",
    userId: myUserID,
  });

  const handleChange = (e) => {
    setInputInfos({
      ...inputInfos,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!inputInfos.title.trim() || !inputInfos.content.trim() || !inputInfos.categoryId) {
      toastWarn("All fields are mandatory cant be empty!");
      return;
    }

    createBlog(inputInfos)

    setInputInfos({
      title: "",
    content: "",
    categoryId: categories[0]?._id,
    userId: myUserID,
    });
    handleClose()
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              type="text"
              autoFocus
              value={inputInfos.title}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="content"
              label="Content"
              type="text"
              id="content"
              value={inputInfos.content}
              onChange={handleChange}
            />

<FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Category"
                      name="categoryId"
                      value={inputInfos.categoryId}
                      onChange={handleChange}
                      required

                    >
                      <MenuItem  value={""}></MenuItem>
                        {categories?.map((item,index)=>(
                            <MenuItem key={index} value={item._id}>{item.name}</MenuItem>

                        ))} 
                    </Select>
                  </FormControl>
            <TextField
              margin="normal"
              required
              fullWidth
              name="userId"
              label="User"
              type="text"
              id="userId"
              disabled
              value={username}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              Create New Blog
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
