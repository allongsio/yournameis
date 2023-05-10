import React from "react";
import styled from "styled-components";
import HomeIcon from "../ele/homeIcon";
import { useLocation, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  // 로그아웃 버튼
  const logOutButtonHandler = (e) => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/");
  };
  return (
    // 로그인 페이지, 회원가입 페이지에서는 랜더링 되지 않도록
    location.pathname !== "/" &&
    location.pathname !== "/SignUp" && (
      <HeaderWrapper>
        <div onClick={() => navigate("/Main")} id="header-title">
          <HomeIcon />
          &nbsp; 너의 이름은
        </div>

        <div id="nav-bar">
          <div onClick={() => navigate("/Main")} className="odd">
            HOME
          </div>
          <div onClick={() => navigate("/Board")} className="even">
            BOARD
          </div>
          <div onClick={() => navigate("/MyPage")} className="odd">
            MY PAGE
          </div>
          <div onClick={logOutButtonHandler} className="even">
            LOGOUT
          </div>
        </div>
      </HeaderWrapper>
    )
  );
}

export default Header;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #f5f5f5;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  #header-title {
    display: flex;
    align-items: center;
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;

    svg {
      fill: #62a1ca;
      margin-right: 5px;
    }
  }

  #nav-bar {
    display: flex;

    div {
      margin-right: 20px;
      font-size: 16px;
      font-weight: bold;
      color: #333;
      cursor: pointer;

      &:hover {
        color: #ee6c4d;
      }

      &.odd {
        color: #62a1ca;
      }

      &.even {
        color: #666;
      }
    }
  }
`;

/* 
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
    cursor: pointer;
  }
  #nav-bar {
    display: flex;
    height: 25px;
    cursor: pointer;

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
 */
