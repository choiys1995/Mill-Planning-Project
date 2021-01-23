import React from "react";
import AuthTemplate from "../components/auth/AuthTemplate";
import Button from "../components/common/Button";
import { Link } from "react-router-dom";
import MenuBlock from '../components/common/MenuBlock'



const MyResvPage = () => {
  return (
    <AuthTemplate>
      나의 예약 현황
      <br />
      <br />
      <MenuBlock>
      <Button right>
          <Link to="/CancelPage">예약 취소</Link>
        </Button>
        <p>봉피양</p>
      </MenuBlock>
    </AuthTemplate>
  );
};

export default MyResvPage;
