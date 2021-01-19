import React from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';
import AuthForm from '../components/auth/AuthForm';
import styled from "styled-components";
import palette from "../lib/styles/palette";
import Button from "../components/common/Button";
import { Link } from 'react-router-dom';

const TagsBlock = styled.div`
  padding: 0.5rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  line-height: 1.5;
  border: 1px solid ${palette.gray[8]};
`;


const PreResvPage = () => {
  return (
    <AuthTemplate>
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