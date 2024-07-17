import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import useAuthServices from "../services/useAuthServices";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function AppBarComp() {
  const { logout } = useAuthServices();
  const { username, token } = useSelector((state) => state.login);
  return (
    <Box sx={{ flexGrow: 1, mb: 2,   }} >
      <Box maxWidth={1200} mx={"auto"}>
        <AppBar position="static">
          <Toolbar sx={{display:"flex",alignItems:'center',justifyContent:"space-between"}}>
            <Link to="/"> <Typography variant="h6" component="div" sx={{ flexGrow: 1,color:'lightgreen' }}>
              Blogs
            </Typography></Link>
            {token ? (
              <Box>
                <Link to="/user"><Button variant="outlined" sx={{ color: "lightgreen" }}>
                  {username}
                </Button></Link>
                <Button color="inherit" onClick={logout}>
                  Logout
                </Button>
              </Box>
            ) : (
              <Box sx={{border:"1px solid red"}}>
                <Link to="/login">
                <Button variant="outlined" sx={{ color: "lightgreen" }}>
                  Login
                </Button></Link>
                <Link to="/register"><Button color="inherit" onClick={logout}>
                  Register
                </Button></Link>
              </Box>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </Box>
  );
}
