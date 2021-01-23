import React from "react";
import AuthTemplate from "../components/auth/AuthTemplate";
import Button from "../components/common/Button";
import { Link } from "react-router-dom";
import MenuBlock from '../components/common/MenuBlock'

const PreResvPage = () => {
  return (
    <AuthTemplate>
      이전 예약 목록
      <br />
      <br />
      <MenuBlock>
      <Button right>
          <Link to="/ReviewPage">리뷰 작성</Link>
        
        </Button>
        <p>봉피양</p>
      </MenuBlock>
    </AuthTemplate>
  );
};

export default PreResvPage;
