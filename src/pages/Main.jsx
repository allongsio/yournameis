import React from "react";
import { useQuery } from "react-query";
import { getUsers } from "../api/user";
import styled from "styled-components";
import User from "../components/User";
import Header from "../components/Header";

function Main() {
  const { isLoading, isError, data } = useQuery("users", getUsers);
  console.log(data);
  if (isLoading) {
    return <h1> Loading...! </h1>;
  }
  if (isError) {
    return <h1> Error...! </h1>;
  }
  return (
    <div>
      <Header />
      <h1>전체 user 목록</h1>
      <div>
        {data?.map((item) => {
          return <User key={item.id} user={item} />;
        })}
      </div>
    </div>
  );
}

export default Main;
