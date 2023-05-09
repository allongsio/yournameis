import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useMutation, useQuery } from "react-query";
import { getMyInfo, updateMyInfo } from "../api/user";

function MyPage() {
  const authorization = localStorage.getItem("access_token");
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();
  /*   const data = [
    {
      username: "항해99",
      specialty: "Spring",
      mbti: "ENFP",
      githubUrl: "github.com/saejhg",
      blogUrl: "notion.so",
      email: "1234@gmail.com",
    },
  ]; */
  const [specialty, setSpecialty] = useState("");
  const [mbti, setMbti] = useState("");
  const [email, setEmail] = useState("");
  const [blogUrl, setBlogUrl] = useState("");
  const [gitHubUrl, setGitHubUrl] = useState("");

  useEffect(() => {
    if (authorization === null) {
      alert("토큰이 만료되었습니다!");
      navigate("/");
    }
  }, []);

  const { data } = useQuery("user", () => getMyInfo({ authorization }));
  const newInfo = {
    specialty,
    mbti: mbti.toUpperCase(),
    email,
    blogUrl,
    gitHubUrl,
  };

  const mutationEdit = useMutation(updateMyInfo, {
    onSuccess: (response) => {
      alert("회원정보가 수정되었습니다!");
      setIsEdit(false);
      navigate("/MyPage");
    },
    onError: (error) => {
      alert(error);
      setMbti("");
      setSpecialty("");
      setEmail("");
      setBlogUrl("");
      setGitHubUrl("");
    },
  });
  const handleFormSubmit = (event) => {
    event.preventDefault();
    mutationEdit.mutate(newInfo, authorization);
  };

  return !isEdit ? (
    <MyPageContainer>
      <MyPageTitle>My Page</MyPageTitle>
      <MyPageContent>
        {data?.map((item) => {
          return (
            <MyPageItem key={item.id}>
              <MyPageItemTitle>이름</MyPageItemTitle>
              <MyPageItemContent>{item.username}</MyPageItemContent>

              <MyPageItemTitle>주특기</MyPageItemTitle>
              <MyPageItemContent>{item.specialty}</MyPageItemContent>

              <MyPageItemTitle>MBTI</MyPageItemTitle>
              <MyPageItemContent>{item.mbti}</MyPageItemContent>

              <MyPageItemTitle>깃허브 주소</MyPageItemTitle>
              <MyPageItemContent>{item.githubUrl}</MyPageItemContent>

              <MyPageItemTitle>블로그 주소</MyPageItemTitle>
              <MyPageItemContent>{item.blogUrl}</MyPageItemContent>

              <MyPageItemTitle>이메일</MyPageItemTitle>
              <MyPageItemContent>{item.email}</MyPageItemContent>
            </MyPageItem>
          );
        })}
        <MyPageButton onClick={() => setIsEdit(true)}>수정하기</MyPageButton>
      </MyPageContent>
    </MyPageContainer>
  ) : (
    <MyPageContainer>
      <MyPageTitle>My Page</MyPageTitle>
      <MyPageContent>
        <form>
          <Label htmlFor="mbti">MBTI</Label>
          <Input
            type="text"
            value={mbti}
            id="mbti"
            onChange={(e) => {
              setMbti(e.target.value);
            }}
            placeholder="MBTI를 입력해주세요!"
          />
          <Label htmlFor="specialty">주특기</Label>
          <Input
            type="text"
            value={specialty}
            id="specialty"
            onChange={(e) => {
              setSpecialty(e.target.value);
            }}
            placeholder="주특기를 입력해주세요!"
          />
          <Label htmlFor="email">이메일</Label>
          <Input
            type="text"
            value={email}
            id="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="E-mail을 입력해주세요!"
          />
          <Label htmlFor="gitHubUrl">gitHub 주소</Label>
          <Input
            type="text"
            value={gitHubUrl}
            id="gitHubUrl"
            onChange={(e) => {
              setGitHubUrl(e.target.value);
            }}
            placeholder="gitHub주소를 입력해주세요!"
          />
          <Label htmlFor="blogUrl">블로그 주소</Label>
          <Input
            type="text"
            value={blogUrl}
            id="blogUrl"
            onChange={(e) => {
              setBlogUrl(e.target.value);
            }}
            placeholder="블로그주소를 입력해주세요!"
          />
          <ButtonContainer>
            <MyPageButton onClick={() => setIsEdit(false)}>취소</MyPageButton>
            <MyPageButton type="submit" onClick={handleFormSubmit}>
              완료
            </MyPageButton>
          </ButtonContainer>
        </form>
      </MyPageContent>
    </MyPageContainer>
  );
}

const MyPageContainer = styled.div`
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 820px;
`;

const MyPageTitle = styled.h1`
  font-size: 30px;
  color: #333;
  font-weight: bold;
`;

const MyPageContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 800px;
  width: 80%;
  margin: 20px;
  padding: 20px;
  border: 1px solid #ddd;
`;
const MyPageItem = styled.div`
  margin-bottom: 10px;
`;

const MyPageItemTitle = styled.h2`
  font-size: 20px;
  color: #333;
`;

const MyPageItemContent = styled.p`
  font-size: 16px;
  color: #666;
`;
const ButtonContainer = styled.div`
  display: flex;
  margin-top: 10px;
  gap: 20px;
`;
const MyPageButton = styled.button`
  background-color: #4c98af;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  /*   transition: all 0.2s ease-in-out; */

  &:hover {
    background-color: #5c88af;
  }
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
`;

export default MyPage;
