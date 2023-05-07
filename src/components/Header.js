import React from "react";
import styled from "styled-components";
import HomeIcon from "../ele/homeIcon";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const logOutButtonHandler = () => {
    localStorage.removeItem("access_token");
    navigate("/Login");
  };
  return (
    <div>
      <HeaderWrapper>
        <div onClick={() => navigate("/")} id='header-title'>
          <HomeIcon />
          &nbsp; 너의 이름은
        </div>
        <div id='nav-bar'>
          <div onClick={() => navigate("/")} className='odd'>
            HOME
          </div>
          <div onClick={() => navigate("/Board")} className='even'>
            BOARD
          </div>
          <div onClick={() => navigate("/MyPage")} className='odd'>
            MY PAGE
          </div>
          <div onClick={logOutButtonHandler} className='even'>
            LOGOUT
          </div>
        </div>
      </HeaderWrapper>
    </div>
  );
}

export default Header;

const HeaderWrapper = styled.div`
  width: 100%;
  height: 75px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  #header-title {
    display: flex;
    align-items: center;
    background-color: #ff4500;
    height: 50px;
    color: white;
    font-size: 30px;
    font-weight: bolder;
  }
  #nav-bar {
    display: flex;
    height: 25px;

    .odd {
      background-color: #ffdb58;
    }

    .even {
      background-color: #808000;
    }

    div {
      width: 25%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      font-weight: bolder;
    }
  }
`;