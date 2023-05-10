import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import SignUpInput from "../components/SignUpInput";
import { setUserInfo } from "../modules/modules";
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

  const specialty = ["React", "Spring", "NodeJS"];
  const mbti = [
    "ENFJ",
    "ENFP",
    "ENTJ",
    "ENTP",
    "ESFJ",
    "ESFP",
    "ESTJ",
    "ESTP",
    "INFJ",
    "INFP",
    "INTJ",
    "INTP",
    "ISFJ",
    "ISFP",
    "ISTJ",
    "ISTP",
  ];

  const [modalOpen, setModalOpen] = useState(false);
  const [whichModal, setWhichModal] = useState(1);
  const dispatch = useDispatch();

  const specialtyClickHandler = (e) => {
    dispatch(
      setUserInfo({ title: "specialty", content: e.target.dataset.specialty })
    );
  };

  const mbtiClickHandler = (e) => {
    dispatch(setUserInfo({ title: "mbti", content: e.target.dataset.mbti }));
  };

  const modalCloseHandler = () => {
    setModalOpen(!modalOpen);
  };

  const navigate = useNavigate();

  // PW확인 입력값만 제외
  const userInfoIncludeConfirm = useSelector(
    (state) => state.signupinput.signupInfo
  );
  const { passwordConfirm, ...otherInput } = userInfoIncludeConfirm;
  console.log(userInfoIncludeConfirm);

  // 제출 성공시, 제출 실패시
  const mutation = useMutation(signup, {
    onSuccess: () => {
      alert("회원가입이 완료되었습니다.");
      navigate("/");
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
        console.log(userInfo);
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
            return (
              <SignUpInput
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                whichModal={whichModal}
                setWhichModal={setWhichModal}
                key={item.title}
                item={item}
              ></SignUpInput>
            );
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
      {modalOpen && (
        <div onClick={modalCloseHandler} id='translucent'>
          {whichModal === 1 ? (
            <div id='modal1'>
              {specialty.map((item, index) => (
                <div
                  data-specialty={item}
                  className='specialty-selector'
                  key={index}
                  onClick={(e) => specialtyClickHandler(e)}
                >
                  {item}
                </div>
              ))}
            </div>
          ) : (
            <div id='modal2'>
              {mbti.map((item, index) => (
                <div
                  data-mbti={item}
                  className='mbti-selector'
                  key={index}
                  onClick={(e) => mbtiClickHandler(e)}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
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

  #translucent {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.2);
    position: fixed;
    z-index: 1;

    #modal1 {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      height: 200px;
      width: 150px;
      background-color: white;
      border-radius: 10px;

      .specialty-selector {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 28%;
        width: 95%;
        border-radius: 5px;
        border: 1px solid black;
      }

      .specialty-selector:hover {
        color: #006cb7;
      }
    }

    #modal2 {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      height: 240px;
      width: 400px;
      background-color: white;
      border-radius: 10px;
      padding-top: 10px;

      .mbti-selector {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 19%;
        width: 23%;
        border-radius: 5px;
        border: 1px solid black;
      }

      .mbti-selector:hover {
        color: #006cb7;
      }
    }
  }

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
