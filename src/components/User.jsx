import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function User({ user }) {
  const navigate = useNavigate();

  /*   const handleDetailPageLinkClick = () => {
    navigate(`/user/${user_id}`);
  }; */

  return (
    <ItemContainer>
      <h4>{user.username}</h4>
      <h4> {user.specialty}</h4>
      <h4>{user.mbti}</h4>
    </ItemContainer>
  );
}

export default User;

const ItemContainer = styled.div`
  border: solid 1px gray;
  margin: 20px;
`;
