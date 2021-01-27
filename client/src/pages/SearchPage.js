import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import Button from "../components/common/Button";
import AuthTemplate from "../components/auth/AuthTemplate";
import { Link } from "react-router-dom";
import { CustomRadioButton } from "../components/common/CustomRadioButton"
import Input from '../components/common/Input'
import MenuBlock from '../components/common/MenuBlock'
import * as storeAction from '../_actions/store_actions'
import * as domain from '../lib/server'
import styled from "styled-components";

const StyledImg = styled.img`
  width: 100%;
  object-fit: cover;
  boder: 1px solid #000;
`

const SearchPage = () => {
  const [search, setSearch] = useState("");
  const [selectCategories, setSelectCategories] = useState("한식")
  const [selectIndex, setSelectIndex] = useState(0);
  const dispatch = useDispatch()

  const { arrayStoreList } = useSelector(state => state.store)

  function onSearchChange(e) {
    setSearch(e.currentTarget.value);
  }

  function onSelectChange(e) {
    const selection = parseInt(e.currentTarget.value)
    const categoriesList = ["한식", "중식", "일식", "양식"]
    setSelectIndex(selection)
    setSelectCategories(categoriesList[selection])
  }

  function getStoreList() {
    const keyword = {
      main: search, 
      detail: selectCategories
    }
    dispatch(storeAction.storeSearch(keyword));
  }

  return (
    <AuthTemplate relative={true}>
      <Input placeholder="검색" 
      type="text"
      value={search}
      onChange={onSearchChange}
      />
      <Button cyan style={{ marginTop: "1rem" }}  onClick={getStoreList}>
        검색
      </Button>
      <br />

      <div>
        <input type="radio" 
              name="categories" 
              value={0} 
              checked={selectIndex === 0}
              onChange={onSelectChange}/> 한식
        <input type="radio" 
              name="categories" 
              value={1}
              checked={selectIndex === 1}
              onChange={onSelectChange}/> 중식
        <input type="radio" 
              name="categories" 
              value={2} 
              checked={selectIndex === 2}
              onChange={onSelectChange}/> 일식
        <input type="radio" 
              name="categories" 
              value={3} 
              checked={selectIndex === 3}
              onChange={onSelectChange}/> 양식
      </div>

      {arrayStoreList &&
          arrayStoreList.length > 0 &&
        <MenuBlock bold>
          <table>
          {
            arrayStoreList.map(data => (
              <tr>
                <td>
                <Link to={`/StorePage/${data.storeid}`}>
                <StyledImg src={`${domain.default}${data.store_img}`} alt={`${data.name}`} key={data.storeid}/><br/>
              </Link>
                </td>
                <td width="50%">{data.name}</td>
              </tr>
            ))
          }
          </table>
        </MenuBlock>
      }
      
    </AuthTemplate>
  );
};

export default SearchPage;
