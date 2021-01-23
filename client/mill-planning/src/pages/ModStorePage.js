import React from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';
import Button from "../components/common/Button";
import MenuBlock from "../components/common/MenuBlock"
import ImgDiv from "../components/common/ImgDiv"

const ModStorePage = () => {
  return (
    <AuthTemplate relative>
      <h3>가게추가</h3>
        <MenuBlock>사업자등록번호: 1234567890</MenuBlock>
        <MenuBlock>상호명: 봉피양</MenuBlock>
        <MenuBlock>장소: 경기도 분당시 머왕관교로</MenuBlock>
        <MenuBlock>전화번호: 123-4567-8910</MenuBlock>
        <MenuBlock short>15:00</MenuBlock>~<MenuBlock short>17:00</MenuBlock>
        <MenuBlock short>매주</MenuBlock><MenuBlock short>화요일</MenuBlock>
        <MenuBlock>가게 설명: 고기가 먹고싶어</MenuBlock>
        <MenuBlock>선수금: 20,000원</MenuBlock>
        <div style={{overflow:"hidden"}}>
        <MenuBlock short bold style={{float:"left"}}>메뉴</MenuBlock>
        <Button round style={{float:"left"}}>+</Button>
        <Button round style={{float:"left"}}>-</Button>
        </div>
        <MenuBlock>
        <ImgDiv></ImgDiv><p>평양냉면</p><p>14,000원</p>
        <h5>메뉴설명</h5>
        <MenuBlock>주저리주저리</MenuBlock>
        </MenuBlock>
        <br/>
        <Button fullWidth cyan>상세 정보 수정</Button>
    </AuthTemplate>
  );
};

export default ModStorePage;