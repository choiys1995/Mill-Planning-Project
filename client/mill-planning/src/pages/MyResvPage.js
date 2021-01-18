import React from "react";
import AuthTemplate from "../components/auth/AuthTemplate";
import AuthForm from "../components/auth/AuthForm";
import styled from "styled-components";
import palette from "../lib/styles/palette";
import Button from "../components/common/Button";
import { Link } from 'react-router-dom';


const TagsBlock = styled.div`
  padding: 0.5rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  line-height: 1.5;
  border: 1px solid lightgray;
`;

const MyResvPage = () => {
  return (
    <AuthTemplate>
      나의 예약 현황
      <TagsBlock>
        봉피양
        <Button right>
          <Link to="/CancelPage">예약 취소</Link>
        </Button>
      </TagsBlock>
    </AuthTemplate>
  );
};

export default MyResvPage;
