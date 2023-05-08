import React from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import gatherCharacter from "../img/gatherCharacter.png";
import { detailRequest } from "../api/api";

function Detail() {
  // const { isLoading, isError, data } = useQuery("detail", detailRequest);
  // if (isLoading) {
  //   return <p>로딩중입니다!</p>;
  // }
  // if (isError) {
  //   return <p>오류가 발생하였습니다!</p>;
  // }
  const userInfo = ["이름", "주특기", "MBTI", "GITHUB", "BLOG", "E-mail"];
  const replyArr = [
    { name: "김형준", content: "열심히 하세요!" },
    { name: "장윤서", content: "힘내세요!" },
  ];
  return (
    <div>
      <DetailPageWrapper>
        <DetailComponent>
          <DetailImageWrapper>
            <img src={gatherCharacter}></img>
          </DetailImageWrapper>
          {userInfo.map((item) => {
            return <p>{item}</p>;
          })}
          {replyArr.map((item) => (
            <div>
              <span>{item.name}</span>
              &nbsp;&nbsp;&nbsp;
              <span>{item.content}</span>
            </div>
          ))}
        </DetailComponent>
      </DetailPageWrapper>
    </div>
  );
}

const DetailPageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DetailComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 70px;
  font-size: 20px;
  font-weight: bold;

  p {
    margin: 5px;
  }
`;

const DetailImageWrapper = styled.div`
  border-radius: 20px;
  display: inline-block;
  overflow: hidden;
`;

export default Detail;
