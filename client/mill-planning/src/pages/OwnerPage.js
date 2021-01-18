import React from 'react';
import { Link } from 'react-router-dom';
import AuthTemplate from '../components/auth/AuthTemplate';
import Button from '../components/common/Button';

const OwnerPage = () => {
  return (
    <AuthTemplate>
      관리자 페이지<br/><br/>
      <Button>
        <Link to="/OwnerStorePage">가게 추가</Link>
      </Button>
      
    </AuthTemplate>
  );
};

export default OwnerPage;