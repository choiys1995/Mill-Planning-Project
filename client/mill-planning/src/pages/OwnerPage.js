import React from "react";
import { Link } from "react-router-dom";
import AuthTemplate from "../components/auth/AuthTemplate";
import Button from "../components/common/Button";
import styled from "styled-components";

const TagsBlock = styled.div`
  padding: 0.5rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  line-height: 1.5;
  border: 1px solid lightgray;
`;

const OwnerPage = () => {
  return (
    <AuthTemplate>
      관리자 페이지
      <br />
      <br />
      <div>
        <TagsBlock>
          봉피양
          <Button right>
            <Link to="/ModStorePage">가게 관리</Link>
          </Button>
        </TagsBlock>
      </div>
      <br/>
      <br/>
      <div>
      <Button>
        <Link to="/AddStorePage">가게 추가</Link>
      </Button>
      폼 만들 예정
      </div>
    </AuthTemplate>
  );
};

export default OwnerPage;
