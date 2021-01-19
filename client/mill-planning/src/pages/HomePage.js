import React from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';
import Button from '../components/common/Button';
import { Link } from 'react-router-dom';



const HomePage = () => {
  return (
    <AuthTemplate>
      홈페이지
      <div>

      </div>
      <div>
          
      </div>
      <div>
      <Button right>
          <Link to="/OwnerPage">관리자페이지</Link> 
          {/* 관리자 아이디 로그인시만 보여야함 */}
      </Button>
      </div>
    </AuthTemplate>
  );
};

export default HomePage;
