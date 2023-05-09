import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useMutation } from "react-query";
import SignUpInput from "../components/SignUpInput";
import { signup } from "../api/api";

function SignUp() {
  const userInfoForm = [
    { title: "ID", mandatory: true, type: "userId" },
    { title: "PW", mandatory: true, type: "password" },
    { title: "PW확인", mandatory: true, type: "passwordConfirm" },
    { title: "이름", mandatory: true, type: "username" },
    { title: "주특기", mandatory: true, type: "specialty" },
    { title: "MBTI", mandatory: true, type: "mbti" },
    { title: "E-mail", mandatory: false, type: "email" },
    { title: "블로그", mandatory: false, type: "blogurl" },
    { title: "github URL", mandatory: false, type: "githuburl" },
    { title: "코멘트할 사람", mandatory: true, type: "commentuser" },
    { title: "코멘트 내용", mandatory: true, type: "commentcontent" },
  ];

  const navigate = useNavigate();

  // PW확인 입력값만 제외
  const userInfoIncludeConfirm = useSelector(
    (state) => state.signupinput.signupInfo
  );
  const { passwordConfirm, ...otherInput } = userInfoIncludeConfirm;

  // 제출 성공시, 제출 실패시
  const mutation = useMutation(signup, {
    onSuccess: () => {
      alert("회원가입이 완료되었습니다.");
      navigate("/Login");
    },
    onError: (error) => {
      alert(error);
    },
  });

  const signUpButtonHandler = () => {
    if (
      userInfoIncludeConfirm.userId &&
      userInfoIncludeConfirm.password &&
      userInfoIncludeConfirm.username &&
      userInfoIncludeConfirm.specialty &&
      userInfoIncludeConfirm.mbti &&
      userInfoIncludeConfirm.commentuser &&
      userInfoIncludeConfirm.commentcontent
    ) {
      if (
        userInfoIncludeConfirm.password !==
        userInfoIncludeConfirm.passwordConfirm
      ) {
        alert("패스워드가 일치 하지 않습니다! 패스워드를 확인해주세요!");
      } else {
        const userInfo = { ...otherInput };
        mutation.mutate(userInfo);
      }
    } else {
      alert("필수입력값을 입력해주세요!");
    }
  };

  return (
    <SignUpWrapper>
      <h1>회원가입</h1>
      <div id='left-n-right'>
        <div>
          {userInfoForm.slice(0, 6).map((item) => {
            return <SignUpInput key={item.title} item={item}></SignUpInput>;
          })}
        </div>
        <div>
          {userInfoForm.slice(6, 11).map((item) => {
            return <SignUpInput key={item.title} item={item}></SignUpInput>;
          })}
          <p>*은 필수입력값입니다.</p>
        </div>
      </div>
      <button onClick={signUpButtonHandler}>가입</button>
    </SignUpWrapper>
  );
}

const SignUpWrapper = styled.div`
  width: 100vh;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    color: #ff7f50;
  }

  #left-n-right {
    display: flex;
    margin: 40px 0 40px 0;
  }

  p {
    color: #ff4500;
    display: flex;
    justify-content: right;
    padding-right: 20px;
  }

  button {
    height: 40px;
    width: 150px;
    border-radius: 5px;
    border: none;
    margin-top: 30px;
    font-size: 20px;
    font-weight: bolder;
    color: white;
    background-color: #ff7f50;
  }
`;

export default SignUp;
