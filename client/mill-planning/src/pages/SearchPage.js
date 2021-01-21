import React, { useState } from "react";
import axios from 'axios';
import Button from "../components/common/Button";
import AuthTemplate from "../components/auth/AuthTemplate";
import styled from "styled-components";
import palette from "../lib/styles/palette";
import { Link } from "react-router-dom";

const SearchBox = styled.input`
  padding: 0.5rem 0.75rem;
  border-radius: 0.25rem;
  font-weight: bold;
  font-size: 1rem;
  line-height: 1.5;
  border: 1px solid ${palette.gray[5]};
  height: 2.25rem;
  width: 12rem;
  margin-right: 1rem;
`;


// const [Search, setSearch] = useState("");

// function onSubmitHandler(e) {
//     e.preventDefault();
//     const body = {
//       search: Search
//     };

//function onSearchChange(e) {
//    setSearch(e.currentTarget.value);
//  }

const SearchPage = () => {
    // async function storeCheck() {
    //     const user = await axios.get('/api/store')
    // }

  return (
    <AuthTemplate>
      <SearchBox placeholder="검색" 
      //type="store"
      //value={Store}
      //onChange={onStoreChange}
      />
      <Button cyan style={{ marginTop: "1rem" }}  /*onClick={storeCheck}*/>
        검색
      </Button>
      <br />

      <Button fullWidth style={{ marginTop: '1rem' }}>
        <Link to="/StorePage">가게조회 버튼(임시)</Link> 
      </Button>
    </AuthTemplate>
  );
};

export default SearchPage;
