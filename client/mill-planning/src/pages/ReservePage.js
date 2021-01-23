import React from "react";
import AuthTemplate from "../components/auth/AuthTemplate";
import Button from "../components/common/Button";
import { Link } from "react-router-dom";
import Moment from 'react-moment'
import MenuBlock from '../components/common/MenuBlock'


const ReservePage = () => {
  return (
    <AuthTemplate>
      <h3>예약확인</h3>
      <MenuBlock right>
        <p><Moment add={{ days: 1}} format="YYYY/MM/DD"></Moment></p>
        <p>18:00 ~ 20:00</p>
        <p>홍길동 외 3명</p>
        <p>선수금액 20,000원</p>
        <input type="checkbox" id="check" />
        <label for="check">
          <span></span>No Show No Payback
        </label>
      </MenuBlock>
      <Button cyan fullWidth>
        <Link to="/CompletePage">결제하기</Link>
      </Button>
    </AuthTemplate>
  );
};

export default ReservePage;
