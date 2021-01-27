import React from 'react';
import MenuBlock from '../common/MenuBlock';
import ImgDiv from '../common/ImgDiv';


const ReviewTemplete = () => {
  return (
      <div>
      <h5>너무 매워요</h5>
      <p>작성자</p>
      <p>작성 날짜</p>
      <p style="text-align:right">별점 4.5/5/0</p>
        <ImgDiv></ImgDiv>
      <MenuBlock>너무 매워서 정신 나갈 것 같아 정신 나갈 것 같아 점심 나가서 먹을 것 같아</MenuBlock>
      </div>
  );
};

export default ReviewTemplete;