import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../modules/modules";
import TriangleIcon from "../ele/TriangleIcon";

function SignUpInput({
  item,
  modalOpen,
  setModalOpen,
  whichModal,
  setWhichModal,
}) {
  const dispatch = useDispatch();

  const userInfoIncludeConfirm = useSelector(
    (state) => state.signupinput.signupInfo
  );

  // 각 입력칸에 대해서 리덕스로 전역 상태 관리
  const onChangeHandler = (e) => {
    dispatch(
      setUserInfo({ title: e.target.dataset.title, content: e.target.value })
    );
  };

  const modal1Handler = () => {
    setModalOpen(!modalOpen);
    setWhichModal(1);
  };

  const modal2Handler = () => {
    setModalOpen(!modalOpen);
    setWhichModal(2);
  };

  return (
    <SignUpInputWrapper key={item.title} mandatory={item.mandatory}>
      <span>
        {item.title}
        {item.mandatory && "*"}
      </span>
      {item.title === "PW" || item.title === "PW확인" ? (
        <input
          id={item.title}
          data-title={item.type}
          onChange={(e) => onChangeHandler(e)}
          type="password"
          className="signup-mypage-input"
          placeholder="내용을 입력해주세요"
        />
      ) : item.title === "주특기" ? (
        <div onClick={modal1Handler} className="modal-opener">
          {userInfoIncludeConfirm.specialty ? (
            userInfoIncludeConfirm.specialty
          ) : (
            <>
              주특기 선택 <TriangleIcon />
            </>
          )}
        </div>
      ) : item.title === "MBTI" ? (
        <div onClick={modal2Handler} className="modal-opener">
          {userInfoIncludeConfirm.mbti ? (
            userInfoIncludeConfirm.mbti
          ) : (
            <>
              MBTI 선택
              <TriangleIcon />
            </>
          )}
        </div>
      ) : (
        <input
          id={item.title}
          data-title={item.type}
          onChange={(e) => onChangeHandler(e)}
          type="text"
          className="signup-mypage-input"
          placeholder="내용을 입력해주세요"
        />
      )}
    </SignUpInputWrapper>
  );
}
const SignUpInputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  margin-left: 20px;
  span {
    flex-basis: 120px;
    font-size: 16px;
    font-weight: 700;
  }
  input,
  .modal-opener {
    height: 56px;
    width: 250px;
    padding: 0 16px;
    border: 1px solid #d2d2d2;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 500;
    color: #4a4a4a;
    display: flex;
    align-items: center;
    background-color: white;
  }
  .modal-opener {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  input::placeholder {
    text-align: center;
  }
`;

export default SignUpInput;
