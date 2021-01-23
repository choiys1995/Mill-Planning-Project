import React from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';
import Button from "../components/common/Button";
import MenuBlock from "../components/common/MenuBlock"
import Input from '../components/common/Input'
import { Link } from "react-router-dom";

const ProfilePage = () => {
  return (
    <AuthTemplate>
      <h3>프로필수정</h3>
      <MenuBlock>MyId</MenuBlock>
      <Input fullWidth placeholder="현재비밀번호"></Input>
      <Input fullWidth placeholder="새비밀번호"></Input>
      <Input fullWidth placeholder="비밀번호재입력"></Input>
      <Input fullWidth placeholder="전화번호 ['-'는 제외하고 입력]"></Input>
      <Button fullWidth cyan>
        <Link to="/MyPage">프로필 수정</Link>
      </Button>
    </AuthTemplate>
  );
};

export default ProfilePage;