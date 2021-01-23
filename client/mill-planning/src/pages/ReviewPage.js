import React from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';
import Button from "../components/common/Button";
import MenuBlock from "../components/common/MenuBlock"
import ImgDiv from "../components/common/ImgDiv"
import Input from '../components/common/Input'
import { Link } from "react-router-dom";

const ReviewPage = () => {
  return (
    <AuthTemplate relative>
      <MenuBlock>
      <h3>리뷰 작성</h3>
      <Input fullWidth placeholder="리뷰 제목"></Input>
      <ImgDiv></ImgDiv>
      <Input fullWidth placeholder="작성자"></Input>
      <Input fullWidth placeholder="작성 날짜"></Input>
      <Input fullWidth placeholder="작성자"></Input>
      <MenuBlock>너무 매워서 정신 나갈 것 같아 정신 나갈 것 같아 점심 나가서 먹을 것 같아</MenuBlock>
      </MenuBlock>
      <Button fullWidth cyan>
        <Link to="/PreResvPage">리뷰 작성</Link>
      </Button>
    </AuthTemplate>
  );
};

export default ReviewPage;
