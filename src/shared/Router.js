import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Join from "../pages/Join";
import Login from "../pages/Login";
import Main from "../pages/Main";
import Board from "../pages/Board";
import Detail from "../pages/Detail";
import MyPage from "../pages/Mypage";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Join' element={<Join />} />
        <Route path='/MyPage' element={<MyPage />} />
        <Route path='/Detail' element={<Detail />} />
        <Route path='/Board' element={<Board />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
