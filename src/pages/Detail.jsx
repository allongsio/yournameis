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
        <DetailComponent>
          <img src={data.user.imageUrl} />
          {/* <img src={data.user.imgUrl} /> */}
          {dataForm.map((item, index) => (
            <p key={index}>
              {item[0]} : {item[1]}
            </p>
          ))}
          <div id="reply-area">
            <ReplyInput>
              댓글
              <input
                onChange={(e) => setInput(e.target.value)}
                value={input}
                placeholder="코멘트를 남겨보세요😎"
              />
              <button id="submit-button" onClick={onSubmitButtonHandler}>
                작성
              </button>
            </ReplyInput>
            {data.comments.map((item) => (
              <IndividualReply key={item.id}>
                <ReplyWrapper>
                  {/*    <img src={data.user.imageUrl} className="reply-thumbnail" /> */}
                  <img src={item.imageUrl} className="reply-thumbnail" />
                  <span className="commentName">{item.username}</span>
                  <span className="divider">|</span>
                  <span className="commentContent">{item.content}</span>

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
                </ReplyWrapper>
              </IndividualReply>
            ))}
          </div>
        </DetailComponent>
      </DetailPageWrapper>
    </div>
  );
}
const DetailPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const DetailComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid black;
  padding: 20px;
  border-radius: 5px;
  width: 50%;

  img {
    width: 100px;

    border-radius: 50%;
  }

  p {
    font-size: 16px;
    margin-bottom: 10px;
  }

  #reply-area {
    width: 100%;
    margin-top: 20px;

    div {
      display: flex;
      align-items: center;
      margin-bottom: 10px;

      input {
        width: 70%;
        margin-right: 5px;
        padding: 5px;
        border-radius: 5px;
        border: 1px solid lightgray;
        font-size: 17px;
      }

      button {
        background-color: lightblue;
        color: white;
        padding: 5px 10px;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;

        &:hover {
          background-color: #74a2b8;
        }
      }
    }

    .commentName {
      font-weight: bold;
    }

    .commentContent {
      margin-left: 10px;
    }

    #button-area {
      display: flex;
      align-items: center;
      margin-left: auto;

      button {
        margin-right: 10px;
        background-color: lightblue;
        color: white;
        padding: 5px 10px;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;

        &:hover {
          background-color: #74a2b8;
        }
      }

      span {
        margin-right: 10px;
      }

      svg {
        width: 20px;
        height: 20px;
        cursor: pointer;

        &:hover {
          color: #7fabd6;
        }
      }
    }
  }
`;
const ReplyInput = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: large;
`;

const IndividualReply = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border: 1px solid lightgray;
  border-radius: 5px;
  width: 90%;
`;

const ReplyWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  width: 100%;

  .reply-thumbnail {
    margin-right: 0.5rem;
    width: 33px;
    height: 50px;
  }

  .commentName {
    margin-right: 0.3rem;
    font-weight: bold;
  }

  .divider {
    margin-right: 0.3rem;
    margin-left: 0.3rem;
  }

  .commentContent {
    flex: 1;
  }

  #button-area {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default Detail;
