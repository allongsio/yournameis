import axios from "axios";

// 로그인
const login = async (user) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}api/auth/login`,
      user
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error.response);
    return Promise.reject(error.response.data.message);
  }
};

//사용자 전체 조회
const getUsers = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER_URL}api/members`
  );

  return response.data;
};

//마이페이지 조회
const getMyInfo = async ({ authorization }) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}api/mypage`,
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

// 마이페이지 수정
const updateMyInfo = async ({ newInfo, authorization }) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_SERVER_URL}api/mypage`,
      newInfo,
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

export { login, getUsers, getMyInfo, updateMyInfo };
