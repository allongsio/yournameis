import axios from "axios";

// 로그인
const login = async (user) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api/auth/login`,
      user
    );
    return response.data;
  } catch (error) {
    console.log(error.response);
    return Promise.reject(error.response.data.message);
  }
};
//사용자 전체 조회
const getUsers = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER_URL}/api/users`
  );
  console.log(response.data);
  return response.data;
};
//마이페이지 조회
const getMyInfo = async (authorization) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/mypage`,
      {
        headers: {
          authorization: `Bearer ${authorization}`,
        },
      }
    );
    return response;
  } catch (error) {
    return Promise.reject(error.response);
  }
};

// 마이페이지 수정
const updateMyInfo = async (authorization, newinfo) => {
  try {
    const response = await axios.patch(
      `${process.env.REACT_APP_SERVER_URL}/api/mypage`,
      newinfo,
      {
        headers: {
          authorization: `Bearer ${authorization}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error.response.data.message);
  }
};

export { login, getUsers, getMyInfo, updateMyInfo };
