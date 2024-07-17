import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import PrivateRouter from "./PrivateRouter";
import AppBarComp from "../components/AppBarComp";
import PublicRouter from "./PublicRouter";
import BlogDetail from "../pages/BlogDetail";
import UserBlogs from "../pages/UserBlogs";

const AppRotuer = () => {
  return (
    <BrowserRouter>
      <AppBarComp />
      <Routes>
          <Route path="/" element={<Home />} />
        <Route path="/" element={<PrivateRouter />}>
          <Route path=":id" element={<BlogDetail />} />
          <Route path="user" element={<UserBlogs />} />
        </Route>
        <Route path="/login" element={<PublicRouter />}>
          <Route index element={<Login />} />
        </Route>
        <Route path="/register" element={<PublicRouter />}>
          <Route index element={<Register />} />
        </Route>
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/register" element={<Register />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRotuer;
