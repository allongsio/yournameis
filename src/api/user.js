import axios from "axios";

// 로그인
const login = async (user) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api/auth/login`,
      user
    );
    return response;
  } catch (error) {
    console.log(error.response);
    return Promise.reject(error.response.data.message);
  }
};

//사용자 전체 조회
const getUsers = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER_URL}/api/members`
  );
  console.log(response);
  return response.data;
};

const headers = {
  Access_Token: `${access_token}`,
  Refresh_Token: `${refresh_token}`,
};

//마이페이지 조회
const getMyInfo = async (access_token, refresh_token) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}api/mypage`,
      {
        headers,
        /*  headers: {
          Access_Token: `${access_token}`,
          Refresh_Token: `${refresh_token}`,
        }, */
      }
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error.response);
  }
};

// 마이페이지 수정
const updateMyInfo = async (access_token, refresh_token, newInfo) => {
  try {
    const response = await axios.patch(
      `${process.env.REACT_APP_SERVER_URL}api/mypage`,
      newInfo,
      {
        headers: {
          Access_Token: `${access_token}`,
          Refresh_Token: `${refresh_token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error.response.data.message);
  }
};

export { login, getUsers, getMyInfo, updateMyInfo };
