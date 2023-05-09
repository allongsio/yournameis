import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function User({ user }) {
  const navigate = useNavigate();
  const user_id = user.userId;

  const handleDetailPageLinkClick = () => {
    navigate(`/Detail/${user_id}`);
  };

  return (
    <UserCard onClick={handleDetailPageLinkClick}>
      <UserInfo>
        {/*         <img src={user.avatar} width='100px' /> */}
        <UserName>{user.username}</UserName>
        <UserSpecialty>주특기 : {user.specialty}</UserSpecialty>
        <UserMbti>MBTI : {user.mbti}</UserMbti>
      </UserInfo>
    </UserCard>
  );
}
export default User;

const UserCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.2);
  padding: 20px;
  text-align: center;
  width: 200px;
  border-radius: 5px;
  cursor: pointer;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  /*   margin-top: 20px; */
`;

const UserName = styled.h4`
  font-size: 30px;
  margin-bottom: 5px;
`;

const UserSpecialty = styled.h4`
  font-size: 15px;
  margin-bottom: 5px;
`;

const UserMbti = styled.h4`
  font-size: 15px;
  margin-bottom: 5px;
`;
