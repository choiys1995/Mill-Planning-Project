import React, { useState } from "react";
import axios from 'axios';
import Button from "../components/common/Button";
import AuthTemplate from "../components/auth/AuthTemplate";
import { Link } from "react-router-dom";
import { CustomRadioButton } from "../components/common/CustomRadioButton"
import Input from '../components/common/Input'




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
      <Input placeholder="검색" 
      //type="store"
      //value={Store}
      //onChange={onStoreChange}
      />
      <Button cyan style={{ marginTop: "1rem" }}  /*onClick={storeCheck}*/>
        검색
      </Button>
      <br />

      <div>
        <CustomRadioButton></CustomRadioButton>
      </div>

      <Button fullWidth style={{ marginTop: '1rem' }}>
        <Link to="/StorePage">가게조회 버튼(임시)</Link> 
      </Button>
    </AuthTemplate>
  );
};

export default SearchPage;
