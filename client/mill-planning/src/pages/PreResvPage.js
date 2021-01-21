import React from "react";
import AuthTemplate from "../components/auth/AuthTemplate";
import AuthForm from "../components/auth/AuthForm";
import styled from "styled-components";
import palette from "../lib/styles/palette";
import Button from "../components/common/Button";
import { Link } from "react-router-dom";

const TagsBlock = styled.div`
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

const PreResvPage = () => {
  return (
    <AuthTemplate>
      이전 예약 목록
      <br />
      <br />
      <TagsBlock>
        봉피양
        <Button right>
          <Link to="/ReviewPage">리뷰 작성</Link>
        </Button>
      </TagsBlock>
    </AuthTemplate>
  );
};

export default PreResvPage;
