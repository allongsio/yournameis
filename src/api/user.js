import axios from "axios";

// 로그인
const login = async (user) => {
  try {
    const response = await axios.post(`http://3.38.191.164/login`, user);
    return response.data;
  } catch (error) {
    console.log(error.response);
    return Promise.reject(error.response.data.message);
  }
};

// 유저 인증 확인
const confirm = async (authorization) => {
  try {
    const response = await axios.get(`http://3.38.191.164/user`, {
      headers: {
        authorization: `Bearer ${authorization}`,
      },
    });
    return response;
  } catch (error) {
    return Promise.reject(error.response);
  }
};

//전체 조회
const getUsers = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users`);
  console.log(response.data);
  return response.data;
};
export { login, confirm, getUsers };
