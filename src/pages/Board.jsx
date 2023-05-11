import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { postingRequest, postingPost, postingDelete } from "../api/api";
import { useQueryClient, useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

function Board() {
  // 입력값 상태관리
  const [input, setInput] = useState({ title: "", content: "" });

  // useQueryClient hoook 호출
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  // 현재 로컬 스토리지의 액세스 토큰 추출
  const access_token = localStorage.getItem("access_token");
  const refresh_token = localStorage.getItem("refresh_token");
  const authorization = { access_token, refresh_token };

  if (!access_token) {
    navigate("/");
  }

  // 입력값 상태관리 전달
  const onChangeHandler = (e) => {
    e.target.id === "title"
      ? setInput({ title: e.target.value, content: input.content })
      : setInput({ title: input.title, content: e.target.value });
  };

  // 게시물 제출
  const postingSubmitApi = useMutation(postingPost, {
    onSuccess: () => {
      queryClient.invalidateQueries("postingrequest", postingRequest);
      queryClient.refetchQueries();
    },
  });

  // 게시물 삭제
  const postingDeleteApi = useMutation(postingDelete, {
    onSuccess: () => {
      queryClient.invalidateQueries("postingrequest", postingRequest);
      queryClient.refetchQueries();
    },
    onError: () => {
      alert("작성자 본인이 삭제할 수 있습니다!");
    },
  });

  // 게시물 제출 핸들러 함수
  const onSubmitButtonClickHandler = () => {
    postingSubmitApi.mutate({ posting: input, authorization });
  };

  // 게시물 삭제 핸들러 함수
  const deleteButtonHandler = (e) => {
    postingDeleteApi.mutate({ post_id: e.target.id, authorization });
  };

  const { isLoading, isError, data } = useQuery("posting", postingRequest);
  if (isLoading) {
    return <p>로딩중입니다!</p>;
  }
  if (isError) {
    return <p>오류가 발생하였습니다!</p>;
  }

  return (
    <BoardWrapper>
      <div>
        <h3>제목 : </h3>
        <input id="title" onChange={(e) => onChangeHandler(e)} />
        <h3>내용 : </h3>
        <input id="content" onChange={(e) => onChangeHandler(e)} />
        <button type="submit" onClick={onSubmitButtonClickHandler}>
          입력
        </button>
      </div>
      <div id="board-card-area" style={{ display: "flex", flexWrap: "wrap" }}>
        {data.map((item, index) => {
          return (
            <BoardCard key={index}>
              <span
                id={item.id}
                onClick={(e) => deleteButtonHandler(e)}
                className="delete-button"
              >
                x
              </span>
              <Title>{item.title}</Title>
              <p>{item.content}</p>
              <div className="author-wrapper">
                <p className="posting-author">{item.author}</p>
              </div>
            </BoardCard>
          );
        })}
      </div>
    </BoardWrapper>
  );
}

const BoardWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  #board-card-area {
    display: grid;
    width: 80%;
    grid-template-columns: repeat(12, 1fr);
    gap: 20px;
  }

  > div {
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin-left: 25px;
    gap: 10px;

    > input {
      border: 2px solid #999;
      padding: 10px;
      font-size: 16px;
      width: 300px;
      border-radius: 8px;
      margin-right: 10px;
    }

    > button {
      padding: 8px 16px;
      border: none;
      border-radius: 8px;
      background-color: #8fbcce;
      color: #fff;
      font-size: 17px;
      font-weight: bold;
      cursor: pointer;
    }
  }
`;
const Title = styled.h3`
  font-size: 20px;
`;
const BoardCard = styled.div`
  width: 300px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 10px;
  position: relative;

  .delete-button {
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 12px;
    cursor: pointer;
  }

  p {
    margin: 5px 0;
  }

  .author-wrapper {
    margin-top: 10px;
  }

  .posting-author {
    font-size: 14px;

    color: #666;
  }
`;

/* const BoardWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 50px;
  font-weight: 800;

  input {
    height: 25px;
    width: 200px;
    border-radius: 5px;
    margin: 0 15px 0 15px;
  }

  button {
    height: 40px;
    width: 75px;
    border-radius: 5px;
    border: none;

    font-size: 20px;
    font-weight: bolder;
    color: white;
    background-color: #ff7f50;
  }

  #board-card-area {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin: 100px 50px 0 100px;
  }
`;

const BoardCard = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
  background-color: #fff;
  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 230px;
  border-radius: 5px;
  cursor: pointer;

  .delete-button {
    color: #dc143c;
    position: absolute;
    right: 5px;
    top: 0;
  }

  .author-wrapper {
    width: 100%;
    display: flex;
    justify-content: right;
  }

  .posting-author {
    font-size: 13px;
    color: #006cb7;
    margin-right: 10px;
  }
`; */

export default Board;
