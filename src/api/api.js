import axios from "axios";

// 회원가입API, method : post, url : /api/auto/signup
const signup = async (userInfo) => {
  debugger;
  try {
    console.log(process.env);
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}api/auth/signup`,
      userInfo
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return Promise.reject(error.response.data.message);
  }
};

// 사용자 상세 조회api, method : get, url : /api/user/{user_id}
const detailRequest = async (user_id) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/members/${user_id}`
      // { headers: { Access_Token: `Bearer ${authorization}` } }
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error.response);
  }
};

// 댓글 작성api, method : post, url : /api/user/{user_id}/comment
const replySubmit = async (user_id, replyData) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}api/user/${user_id}/comment`,
      replyData
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error.response);
  }
};

// 댓글 삭제api, method : delete, url : /api/user/{user_id}/comment/{id}
const replyDelete = async (user_id, replyId) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_SERVER_URL}api/user/${user_id}`,
      {
        data: {
          commentId: replyId,
        },
      }
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error.response);
  }
};

// 댓글 좋아요api, method : post, url : /api/user/{user_id}/comment/{id}/like
const replyLike = async (user_id, replyId) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api/user/${user_id}/comment/${replyId}/like`
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error.response);
  }
};

// 게시글 조회api, method : get, url : /api/board
const postingRequest = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/board`
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error.response);
  }
};

// 게시글 추가api, method : post, url : /api/board
const postingPost = async ({ posting, authorization }) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api/board`,
      posting,
      {
        headers: {
          Access_Token: `${authorization.access_token}`,
          Refresh_Token: `${authorization.refresh_token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error.response);
  }
};

// 게시글 삭제api, method : delete, url : /api/auth/userdelete
const postingDelete = async ({ post_id, authorization }) => {
  console.log(post_id);
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_SERVER_URL}/api/board/${post_id}`,
      {
        headers: {
          Access_Token: `${authorization.access_token}`,
          Refresh_Token: `${authorization.refresh_token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error.response);
  }
};

export {
  signup,
  detailRequest,
  replySubmit,
  replyDelete,
  replyLike,
  postingRequest,
  postingPost,
  postingDelete,
};
