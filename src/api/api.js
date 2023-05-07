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

export { signup };
