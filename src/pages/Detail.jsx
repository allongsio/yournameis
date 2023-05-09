import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useQuery,
  useMutation,
  QueryClient,
  useQueryClient,
} from "react-query";
import styled from "styled-components";
import { detailRequest, replySubmit, replyDelete, replyLike } from "../api/api";
import { LikeIcon } from "../ele/LikeIcon";

function Detail() {
  // 현재 페이지 URL에서 사용자 아이디 추출
  const params = useParams();
  const user_id = params.id;

  // 현재 로컬 스토리지의 액세스 토큰 추출
  const authorization = localStorage.getItem("access_token");

  // const { isLoading, isError, data } = useQuery("detail", detailRequest(user_id, authorization));
  // if (isLoading) {
  //   return <p>로딩중입니다!</p>;
  // }
  // if (isError) {
  //   return <p>오류가 발생하였습니다!</p>;
  // }
  const data = {
    username: "항해99",
    specialty: "Spring",
    mbti: "ENFP",
    githubUrl: "github.com/saejhg",
    blogUrl: "notion.so",
    email: "1234@gmail.com",
    comment: [
      { title: "1", author: "김형준", content: "댓글1", likeCount: 0 },
      { title: "2", author: "김형준", content: "댓글2", likeCount: 0 },
    ],
  };

  // 배열화하여 map함수 돌릴 수 있도록 처리
  const dataForm = [
    ["이름", data.username],
    ["주특기", data.specialty],
    ["MBTI", data.mbti],
    ["Github URL", data.githubUrl],
    ["Blog URL", data.blogUrl],
    ["E-mail", data.email],
  ];

  // 댓글에 대한 데이터만 따로 추출
  const dataComment = data.comment;

  // input값 상태관리
  const [input, setInput] = useState("");

  // useQuery hook 호출
  const queryClient = useQuery();

  // 댓글 작성, 삭제, 좋아요마다 invalidation 작업
  const replySubmitApi = useMutation(replySubmit, {
    onSuccess: () => {
      queryClient.invalidateQueries("detail", detailRequest);
    },
  });
  const replyDeleteApi = useMutation(replyDelete, {
    onSuccess: () => {
      queryClient.invalidateQueries("detail", detailRequest);
    },
  });
  const replyLikeApi = useMutation(replyLike, {
    onSuccess: () => {
      queryClient.invalidateQueries("detail", detailRequest);
    },
  });

  // 댓글 작성 버튼
  const onSubmitButtonHandler = () => {
    replySubmitApi.mutate(user_id, { content: input });
    setInput("");
  };

  // 댓글 삭제 버튼
  const deleteButtonHandler = (e) => {
    const replyId = e.target.dataset.id;
    replyDeleteApi.mutate(user_id, replyId);
  };

  // 댓글 좋아요 버튼
  const likeButtonHandler = (e) => {
    const replyId = e.target.dataset.id;
    replyLikeApi.mutate(user_id, replyId);
  };

  return (
    <div>
      <DetailPageWrapper>
        <DetailComponent>
          {dataForm.map((item, index) => (
            <p key={index}>
              {item[0]} : {item[1]}
            </p>
          ))}
          <div id='reply-area'>
            <div>
              <input onChange={(e) => setInput(e.target.value)} value={input} />
              <button id='submit-button' onClick={onSubmitButtonHandler}>
                작성
              </button>
            </div>
            {data.comment.map((item, index) => (
              <IndividualReply key={item.id}>
                <div>
                  <span className='commentName'>{item.author}</span>
                  &nbsp;&nbsp;&nbsp;
                  <span className='commentContent'>{item.content}</span>
                </div>
                <div id='button-area'>
                  <button
                    data-id={item.id}
                    onClick={(e) => deleteButtonHandler(e)}
                  >
                    삭제
                  </button>
                  <LikeIcon
                    data-id={item.id}
                    onClick={(e) => likeButtonHandler(e)}
                  />
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

  #reply-area {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 50px;

    .commentName {
      color: #006cb7;
    }

    .commentContent {
      font-size: 15px;
      font-weight: 400;
    }

    div {
      margin-top: 15px;
    }

    input {
      height: 25px;
      width: 400px;
      border-radius: 5px;
    }

    #submit-button {
      height: 40px;
      width: 75px;
      border-radius: 5px;
      border: none;
      margin-left: 15px;
      font-size: 20px;
      font-weight: bolder;
      color: white;
      background-color: #ff7f50;
    }
  }
`;

const IndividualReply = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  #button-area {
    display: flex;
    align-items: center;

    svg {
      margin-left: 5px;
    }
  }
  button {
    margin-left: 15px;
    background-color: #dc143c;
    border: none;
    border-radius: 5px;
    color: white;
    font-weight: 900;
  }
`;

const DetailImageWrapper = styled.div`
  border-radius: 20px;
  display: inline-block;
  overflow: hidden;
`;

export default Detail;
