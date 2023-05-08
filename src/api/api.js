import axios from "axios";

// 회원가입API, method : post, url : /api/auto/signup
const signup = async (userInfo) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api/auto/signup`,
      userInfo
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error.response.data.message);
  }
};

// 사용자 상세 조회api, method : get, url : /api/user/{user_id}
const detailRequest = async (userId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/user/{${userId}}`
    );
    return response.data;
  } catch (error) {
    return Promise.rejuct(error.response);
  }
};

export { signup, detailRequest };
