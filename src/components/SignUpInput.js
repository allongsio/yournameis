import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../modules/modules";
import Select from "./Select";

function SignUpInput({ item }) {
  const dispatch = useDispatch();

  // 각 입력칸에 대해서 리덕스로 전역 상태 관리
  const onChangeHandler = (e) => {
    dispatch(
      setUserInfo({ title: e.target.dataset.title, content: e.target.value })
    );
  };

  // select dropdown option
  const options1 = ["React", "Spring", "NodeJS"];
  const options2 = [
    "ISTP",
    "ISTJ",
    "ISFP",
    "ISFJ",
    "INTP",
    "INTJ",
    "INFP",
    "INFJ",
    "ESTP",
    "ESTJ",
    "ESFP",
    "ESFJ",
    "ENTP",
    "ENTJ",
    "ENFP",
    "ENFJ",
  ];

  // option 클릭 시 상태 변경
  const optionClickHandler = (option, setSelect, setOpen) => {
    setSelect(option);
    setOpen(false);
  };

  return (
    <SignUpInputWrapper key={item.title} mandatory={item.mandatory}>
      <span>
        {item.title}
        {item.mandatory && "*"}
      </span>
      {/* {item.title === "PW" || item.title === "PW확인" ? (
        <input
          data-title={item.type}
          onChange={(e) => onChangeHandler(e)}
          type='password'
          className='signup-mypage-input'
          placeholder='내용을 입력해주세요'
        />
      ) : item.title === "주특기" ? (
        <Select
          key={item.title}
          options={options1}
          optionClickHandler={optionClickHandler}
        ></Select>
      ) : item.title === "MBTI" ? (
        <Select
          key={item.title}
          options={options2}
          optionClickHandler={optionClickHandler}
        ></Select>
      ) : (
        <input
          data-title={item.type}
          onChange={(e) => onChangeHandler(e)}
          type='text'
          className='signup-mypage-input'
          placeholder='내용을 입력해주세요'
        />
      )} */}
      {item.title === "PW" || item.title === "PW확인" ? (
        <input
          id={item.title}
          data-title={item.type}
          onChange={(e) => onChangeHandler(e)}
          type='password'
          className='signup-mypage-input'
          placeholder='내용을 입력해주세요'
        />
      ) : (
        <input
          id={item.title}
          data-title={item.type}
          onChange={(e) => onChangeHandler(e)}
          type='text'
          className='signup-mypage-input'
          placeholder='내용을 입력해주세요'
        />
      )}
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
