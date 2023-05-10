import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import styled from "styled-components";
import { detailRequest, replySubmit, replyDelete, replyLike } from "../api/api";
import { LikeIcon } from "../ele/LikeIcon";
import { LikeIconFilled } from "../ele/LikeIconFilled";

function Detail() {
  // 현재 로컬 스토리지의 액세스 토큰 추출
  const access_token = localStorage.getItem("access_token");
  const refresh_token = localStorage.getItem("refresh_token");
  const authorization = { access_token, refresh_token };
  access_token || navigate("/");

  const navigate = useNavigate();

  // input값 상태관리
  const [input, setInput] = useState("");

  // useQuery hook 호출
  const queryClient = useQueryClient();

  const replySubmitApi = useMutation(replySubmit, {
    onSuccess: () => {
      queryClient.invalidateQueries("detail", detailRequest);
    },
  });
  const replyDeleteApi = useMutation(replyDelete, {
    onSuccess: () => {
      queryClient.invalidateQueries("detail", detailRequest);
    },
    onError: () => {
      alert("작성자만 삭제할 수 있습니다!");
    },
  });
  const replyLikeApi = useMutation(replyLike, {
    onSuccess: () => {
      queryClient.invalidateQueries("detail", detailRequest);
      queryClient.refetchQueries();
    },
  });

  // 댓글 작성 버튼
  const onSubmitButtonHandler = () => {
    replySubmitApi.mutate({ user_id, content: input, authorization });
    setInput("");
  };

  // 댓글 삭제 버튼
  const deleteButtonHandler = (e) => {
    const replyId = e.target.dataset.id;
    replyDeleteApi.mutate({ user_id, replyId, authorization });
  };

  // 댓글 좋아요 버튼
  const likeButtonHandler = (e) => {
    const replyId = e.currentTarget.id;
    replyLikeApi.mutate({ user_id, replyId, authorization });
  };

  // 현재 페이지 URL에서 사용자 아이디 추출
  const params = useParams();
  const user_id = params.id;

  const { isLoading, isError, data } = useQuery("detail", () =>
    detailRequest({ user_id, authorization })
  );
  if (isLoading) {
    return <p>로딩중입니다!</p>;
  }
  if (isError) {
    return <p>오류가 발생하였습니다!</p>;
  }

  // 배열화하여 map함수 돌릴 수 있도록 처리
  const dataForm = [
    ["이름", data.user.username],
    ["주특기", data.user.specialty],
    ["MBTI", data.user.mbti],
    ["Github URL", data.user.githubUrl],
    ["Blog URL", data.user.blogUrl],
    ["E-mail", data.user.email],
  ];
  console.log(data.comments);

  return (
    <div>
      <DetailPageWrapper>
        <img src={data.user.imageUrl} />
        <DetailComponent>
          <img src={data.user.imgUrl} />
          {dataForm.map((item, index) => (
            <p key={index}>
              {item[0]} : {item[1]}
            </p>
          ))}
          <div id="reply-area">
            <div>
              <input onChange={(e) => setInput(e.target.value)} value={input} />
              <button id="submit-button" onClick={onSubmitButtonHandler}>
                작성
              </button>
            </div>
            {data.comments.map((item) => (
              <IndividualReply key={item.id}>
                <div>
                  <img src={data.user.imageUrl} className="reply-thumbnail" />
                  <span className="commentName">{item.username}</span>
                  &nbsp;&nbsp;&nbsp;
                  <span className="commentContent">{item.content}</span>
                </div>
                <div id="button-area">
                  <button
                    data-id={item.id}
                    onClick={(e) => deleteButtonHandler(e)}
                  >
                    삭제
                  </button>
                  {item.enabled ? (
                    <LikeIconFilled
                      id={item.id}
                      onClick={(e) => likeButtonHandler(e)}
                    />
                  ) : (
                    <LikeIcon
                      id={item.id}
                      onClick={(e) => likeButtonHandler(e)}
                    />
                  )}
                  <span>{item.likeCount}</span>
                </div>
              </IndividualReply>
            ))}
          </div>
        </DetailComponent>
      </DetailPageWrapper>
    </div>
  );
}

const DetailPageWrapper = styled.div`
<<<<<<< HEAD
  display: flex;
  justify-content: center;
  align-items: center;
  height: 850px;
`;

const DetailComponent = styled.div`
  /*   display: flex;
  flex-direction: column; */
  width: 700px;
  align-items: center;
  justify-content: center;
  border: 1px solid gray;
  border-radius: 10px;
  padding: 20px;
`;

const IndividualReply = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  /*   border: 1px solid gray; */
  padding: 10px;

  & .commentName {
    font-weight: bold;
    font-size: 16px;
  }

  & .commentContent {
    font-size: 14px;
  }

  & #button-area {
    display: flex;
    align-items: center;
  }

  & button {
    border: none;
    background-color: transparent;
    font-size: 12px;
    margin-right: 10px;
    cursor: pointer;
  }

  & button:hover {
    color: #f44336;
  }

  & .delete-button {
    position: relative;
  }

  & .delete-button::before,
  .delete-button::after {
    content: "";
    position: absolute;
    width: 2px;
    height: 14px;
    background-color: #ccc;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
  }

  & .delete-button::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;

const ReplyArea = styled.div`
  border: 1px solid #ddd;
  padding: 10px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  input {
    border: none;
    border: 1px solid #d1cccc;
    border-radius: 8px;
    margin-right: 10px;
    font-size: 1.1rem;
    padding: 5px;
    width: 300px;
    margin-bottom: 10px;
  }

  #submit-button {
    background-color: #97bfda;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 5px 20px;
    cursor: pointer;
    margin-bottom: 10px;
    font-weight: bold;
  }

  #submit-button:hover {
    background-color: #62a1ca;
  }
`;

export default Detail;
