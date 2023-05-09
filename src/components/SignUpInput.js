import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../modules/modules";

function SignUpInput({ item }) {
  const dispatch = useDispatch();

  const onChangeHandler = (e) => {
    dispatch(
      setUserInfo({ title: e.target.dataset.title, content: e.target.value })
    );
  };

  return (
    <SignUpInputWrapper mandatory={item.mandatory}>
      <span>{item.title}</span>
      <input
        data-title={item.type}
        onChange={(e) => onChangeHandler(e)}
        type="text"
        id="signup-mypage-input"
        placeholder="내용을 입력해주세요"
      />
    </SignUpInputWrapper>
  );
}

const SignUpInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 300px;
  margin: 20px;
  span {
    font-size: 20px;
    font-weight: 400;
    margin-right: 20px;
  }

  #signup-mypage-input {
    height: 25px;
    border-radius: 5px;
  }

  input::placeholder {
    text-align: center;
  }
`;

export default SignUpInput;
