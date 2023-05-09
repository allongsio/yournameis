import styled from "styled-components";

// 부모 컴포넌트의 overflow:hidden이 적용되는 첫 번째 Select
export const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`;

// 부모 컴포넌트의 overflow:hidden이 적용되지 않는 두 번째 Select
export const ShowSelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  position: absolute;
  margin-left: 23.5rem;
`;

// select 클릭하지 않았을 경우 보이는 default select
export const DropdownMain = styled.div`
  display: flex;
  align-items: center;
  height: 1px;
  width: 120px;
  padding: 0.8rem 1rem;
  border: 2px solid black;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
`;

// select 클릭 시 나오는 dropdown list container
export const DropdownListContainer = styled.div`
  border: 1px solid rgb(221, 221, 221);
  border-radius: 0.5rem;
  padding: 0;
  background-color: white;

  cursor: pointer;
`;

// select 클릭 시 나오는 dropdown list ul
export const DropdownList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

// select 클릭 시 나오는 각 li 아이템
export const ListItem = styled.li`
  padding: 1rem 0.9rem;

  :first-child {
    border-top-right-radius: 0.5rem;
    border-top-left-radius: 0.5rem;
  }

  :last-child {
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
  }

  :hover {
    background-color: rgb(221, 221, 221);
  }
`;
