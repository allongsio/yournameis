import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Main from "../pages/Main";
import Board from "../pages/Board";
import Detail from "../pages/Detail";
import MyPage from "../pages/MyPage";
import Header from "../components/Header";

function Routers() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/MyPage" element={<MyPage />} />
        <Route path="/Detail" element={<Detail />} />
        <Route path="/Board" element={<Board />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routers;
