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
import poster from "../img/poster.jpg";
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
    // { title: "코멘트할 사람", mandatory: false, type: "commentuser" },
    // { title: "코멘트 내용", mandatory: false, type: "commentcontent" },
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
      userInfoIncludeConfirm.mbti
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
      <Wrap>
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
            {userInfoForm.slice(6, 9).map((item) => {
              return <SignUpInput key={item.title} item={item}></SignUpInput>;
            })}

            <p>*은 필수입력값입니다🙏🙏</p>
            <p>
              ID는 4자 이상, 10자 이하로 알파벳 소문자, 숫자를 포함해서
              입력해주세요.
            </p>
            <p>
              PW는 8자 이상, 15자 이하로 알파벳 대소문자, 숫자를 포함해서
              입력해주세요.
            </p>
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
                <h2>당신의 MBTI를 알려주세요!</h2>
                <p>아래에서 당신에게 가장 적합한 유형을 선택해주세요😊</p>
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
      </Wrap>
    </SignUpWrapper>
  );
}

const Wrap = styled.div`
  /*   background-color: #f1fcf8; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 9px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 1);
`;

const SignUpWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url(${poster});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.7;

  h1 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: #0e192c;
  }

  #left-n-right {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1.5rem;

    & > div {
      display: flex;
      flex-direction: column;
      margin-right: 2rem;

      &:last-child {
        margin-right: 0;
      }

      p {
        font-size: 0.8rem;
        margin-top: 0.1rem;
        color: #090d1a;
        font-weight: 800;
      }
    }
  }

  button {
    background-color: #abcde4;
    color: white;
    border: none;
    padding: 0.5rem 2rem;
    border-radius: 0.3rem;
    font-size: 1.2rem;
    font-weight: bold;
    cursor: pointer;
    margin-top: 1rem;
    &:hover {
      background-color: #5aa4c7;
    }
  }

  #translucent {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }

  #translucent #modal1,
  #translucent #modal2 {
    display: flex;
    flex-wrap: wrap;
    font-size: 18px;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 50%;
    background-color: #ebf9fc;
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  }

  #translucent .specialty-selector,
  #translucent .mbti-selector {
    background-color: #ceeeee;
    color: #333;
    padding: 0.5rem 1rem;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
    border-radius: 0.3rem;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #c8d8d8;
    }
  }
`;

export default SignUp;
