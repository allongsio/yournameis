import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { getUsers } from "../api/user";
import styled from "styled-components";
import User from "../components/User";
import { useNavigate } from "react-router-dom";

function Main() {
  const [name, setName] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const { isLoading, isError, data } = useQuery("users", getUsers);
  const navigate = useNavigate();

  // 현재 로컬 스토리지의 액세스 토큰 추출
  const access_token = localStorage.getItem("access_token");
  const refresh_token = localStorage.getItem("refresh_token");
  const authorization = { access_token, refresh_token };
  access_token || navigate("/");

  /* const searchList = () =>{
const filtered = sampleData.filter((itemList) => {
  return itemList.name.toUpperCase().includes(userInput.toUpperCase());
return (
  <div className="cardList">
    {filtered.map((itemList) => {
      return <Card key={itemList.id} {...itemList} />;
    })}
  </div>
} */

  /* useEffect(() => {
    (async () => {
      try {
        const result = await confirm(localStorage.getItem("access_token"));
        result.status === 200 && navigate("/Main");
      } catch (error) {
        console.log(localStorage.getItem("access_token"));
      }
    })();
  }, []);
 */
  const SearchButtonClick = async (e) => {
    e.preventDefault();
    const filtered = data.filter((user) => {
      return user.username.includes(name);
    });

    setSearchList(filtered);
    setIsSearching(true);
    setName("");
  };
  if (isLoading) {
    return <h1> Loading...! </h1>;
  }
  if (isError) {
    return <h1> Error...! </h1>;
  }
  /*  const foundItem = data.find((user) => user.username === name); */

  return (
    <div>
      <MainWrapper>
        <All
          onClick={() => {
            setIsSearching(false);
          }}
        >
          전체 user 목록
        </All>
        <FormContainer>
          <label htmlFor='name'>이름 : </label>
          <input
            type='text'
            value={name}
            id='name'
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder='유저를 검색해보세요!'
          />
          <button onClick={SearchButtonClick} disabled={name.length === 0}>
            검색
          </button>
        </FormContainer>

        {!isSearching ? (
          <UserList>
            {data?.map((item) => {
              return <User key={item.id} user={item} />;
            })}
          </UserList>
        ) : (
          <UserList>
            {searchList?.map((item) => {
              return <User key={item.id} user={item} />;
            })}
          </UserList>
        )}
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
  display: flex;
  flex-wrap: wrap;
  margin: 10px;
  gap: 30px;
  margin-left: 30px;
`;

const All = styled.div`
  &:hover {
    color: #4885ad;
  }
  font-size: 27px;
  font-weight: bold;
  margin-bottom: 15px;
  cursor: pointer;
`;

const FormContainer = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 16px;

  label {
    font-size: 18px;
    font-weight: bold;
  }

  input {
    padding: 8px 12px;
    border-radius: 8px;
    border: none;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    font-size: 16px;
    flex: 1;

    &:focus {
      outline: none;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    }

    &::placeholder {
      color: rgba(0, 0, 0, 0.3);
    }
  }

  button {
    padding: 8px 16px;
    border: none;
    border-radius: 8px;
    background-color: #4c98af;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &:hover:not(:disabled) {
      background-color: #4b9dbd;
    }

    &:focus {
      outline: none;
    }
  }
`;
