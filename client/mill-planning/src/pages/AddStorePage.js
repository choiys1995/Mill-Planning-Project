import React from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';
import Input from '../components/common/Input'
import Button from "../components/common/Button";
import MenuBlock from "../components/common/MenuBlock"
import ImgDiv from "../components/common/ImgDiv"



const AddStorePage = () => {
  return (
    <AuthTemplate relative>
        <h3>가게추가</h3>
        <Input fullWidth placeholder="사업자등록번호"></Input>
        <Input fullWidth placeholder="상호명"></Input>
        <Input fullWidth placeholder="주소"></Input>
        <Input fullWidth placeholder="전화번호"></Input>
        <Input short placeholder="휴식시간"></Input>~<Input short placeholder="휴식시간"></Input>
        <Input short placeholder="휴일"></Input>~<Input short placeholder="휴일"></Input>
        <Input fullWidth placeholder="가게설명"></Input>
        <Input fullWidth placeholder="선수금"></Input>
        <div style={{overflow:"hidden"}}>
        <MenuBlock short bold style={{float:"left"}}>메뉴</MenuBlock>
        <Button round style={{float:"left"}}>+</Button>
        <Button round style={{float:"left"}}>-</Button>
        </div>
        <MenuBlock>
        <ImgDiv></ImgDiv><p>메뉴명</p><p>가격</p>
        <h5>메뉴설명</h5>
        <MenuBlock>주저리주저리</MenuBlock>
        </MenuBlock>
        <br/>
        <Button fullWidth cyan>가게 추가</Button>
    </AuthTemplate>
  );
};

export default AddStorePage;

//pages/AddStorePage.js [가게에 들어갈내용 + 메뉴넣는기능 만들기 (+를 누르면 추가적으로 메뉴작성할 수 있고 -를 누르면 목록 삭제)]