import React from "react";
import AuthTemplate from "../components/auth/AuthTemplate";
import styled, { css } from "styled-components";
import palette from "../lib/styles/palette";
import Button from "../components/common/Button";
import { Link } from "react-router-dom";

const MenuBlock = styled.div`
  padding: 0.5rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  line-height: 1.5;
  border: 1px solid ${palette.gray[5]};
  width: 100%;
  margin-right: 1rem;
  ${(props) =>
    props.bold &&
    css`
      font-weight: bold;
    `}
  ${(props) =>
    props.right &&
    css`
      text-align: right;
    `}
`;

const ReservePage = () => {
  return (
    <AuthTemplate>
      <h3>예약확인</h3>
      <MenuBlock right>
        1월 22일 18:00 ~ 20:00 <br /><br />
        홍길동 외 3명 <br /><br />
        선수금액 20,000원 <br /><br />
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
