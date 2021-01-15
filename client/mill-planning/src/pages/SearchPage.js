import React, { useState } from "react";
import axios from 'axios';
import Button from "../components/common/Button";
import AuthTemplate from "../components/auth/AuthTemplate";


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
      <input placeholder="검색" 
      //type="store"
      //value={Store}
      //onChange={onStoreChange}
      />
      <Button cyan style={{ marginTop: "1rem" }}  /*onClick={storeCheck}*/>
        검색
      </Button>
      <br />
    </AuthTemplate>
  );
};

export default SearchPage;
