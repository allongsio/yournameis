import React, { useState, useEffect } from "react";
import { useMutation } from "react-query";
import { login } from "../api/user";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Login() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  /*  // 로그인 했을 때, 로그인페이지 접근 못하게
  useEffect(() => {
    (async () => {
      try {
        const result = await confirm(localStorage.getItem("access_token"));
        if (result.status === 200) {
          alert("이미 로그인된 회원입니다!");
          navigate("/");
        }
      } catch (error) {
        console.log(localStorage.getItem("access_token"));
      }
    })();
  }, []);
 */
  const mutationLogin = useMutation(login, {
    onSuccess: (response) => {
      console.log(response);
      localStorage.setItem(
        "access_token",
        response.headers.get("access_token")
      );
      localStorage.setItem(
        "refresh_token",
        response.headers.get("refresh_token")
      );

      alert("로그인에 성공하셨습니다!");
      navigate("/Main");
    },
    onError: (error) => {
      alert(error);
      setUserId("");
      setPassword("");
    },
  });

  const user = { userId, password };
  const LoginButtonHandler = (event) => {
    event.preventDefault();
    if (!userId || !password) {
      alert("아이디와 패스워드값을 모두 입력해주세요!");
      return;
    } else {
      mutationLogin.mutate(user);
    }
  };

  const JoinButtonhandler = () => {
    navigate("/SignUp");
  };

  return (
    <Container>
      <FormContainer>
        <Form>
          <Label htmlFor="userId">ID</Label>
          <Input
            type="text"
            value={userId}
            id="userId"
            onChange={(e) => {
              setUserId(e.target.value);
            }}
            placeholder="아이디"
          />
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            value={password}
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="비밀번호"
          />
          <ButtonContainer>
            <Button onClick={JoinButtonhandler}>회원가입</Button>
            <Button type="submit" onClick={LoginButtonHandler}>
              로그인
            </Button>
          </ButtonContainer>
        </Form>
      </FormContainer>
    </Container>
  );
}

export default Login;
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #f8f8f8;
  width: 400px;
  max-width: 90%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Label = styled.label`
  font-weight: bold;
  font-size: 20px;
`;

const Input = styled.input`
  padding: 16px;
  border: 2px solid #ddd;
  border-radius: 8px;
  outline: none;
  font-size: 20px;
  &:focus {
    border-color: #3a85bb;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 10px;
  gap: 20px;
`;

const Button = styled.button`
  padding: 15px 20px;
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  background-color: #67abe2;
  width: 150px;
  cursor: pointer;
  font-size: 20px;
  &:hover {
    background-color: #5c88af;
  }
`;
