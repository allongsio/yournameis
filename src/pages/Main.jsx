import React, { useState } from "react";
import { useQuery } from "react-query";
import { getUsers } from "../api/user";
import styled from "styled-components";
import User from "../components/User";
import Header from "../components/Header";

function Main() {
  /*   const [name, setName] = useState("");
  const [searchList, setSearchList] = useState([]);
  const SearchButtonClick = (e) => {
    e.preventDefault();
  }; */
  const { isLoading, isError, data } = useQuery("users", getUsers);
  if (isLoading) {
    return <h1> Loading...! </h1>;
  }
  if (isError) {
    return <h1> Error...! </h1>;
  }

  return (
    <div>
      <Header />
      <MainWrapper>
        <h1>전체 user 목록</h1>
        {/* <form>
          <label htmlFor="name">이름 : </label>
          <input
            type="text"
            value={name}
            id="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="이름"
          />
          <button onClick={SearchButtonHandler}> 검색 </button>
        </form> */}
        <UserList>
          {data?.map((item) => {
            return <User key={item.id} user={item} user_id={item.id} />;
          })}
        </UserList>
      </MainWrapper>
    </div>
  );
}

export default Main;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const UserList = styled.div`
  /*   display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 30px; */
  display: flex;
  flex-wrap: wrap;
  margin: 10px;
  gap: 20px;
`;
