import React, { useState } from "react";
import AuthTemplate from "../components/auth/AuthTemplate";
import styled, { css } from "styled-components";
import palette from "../lib/styles/palette";
import AuthForm from "../components/auth/AuthForm";
import Button from "../components/common/Button";
import { Link } from "react-router-dom";
import Modal from "../components/modal/Modal";
import Carousel from "react-elastic-carousel";
import "../components/common/Carousel.css";
import ReviewTemplete from "../components/common/ImgDiv";
import MenuBlock from "../components/common/MenuBlock"
import ImgDiv from "../components/common/ImgDiv"
import Clock from "../components/common/Clock"
import Moment from 'react-moment'


const StorePage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  const date = new Date();
  return (
    <AuthTemplate relative>
      <h3>가게 조회</h3>
      <div>
      </div>
      <br />
      <div align="right"> 4.4/5.0</div>
      <br />
      <MenuBlock bold>
        <Carousel itemToShow={1}>
          <item><ImgDiv></ImgDiv><br/><p>평양냉면</p><p>14,000원</p></item>
          <item><ImgDiv></ImgDiv><br/><p>비빔냉면</p><p>12,000원</p></item>
          <item><ImgDiv></ImgDiv><br/><p>도가니탕</p><p>15,000원</p></item>
          <item><ImgDiv></ImgDiv><br/><p>꼬리곰탕</p><p>20,000원</p></item>
        </Carousel>
      </MenuBlock>

      <MenuBlock>
      <h5>너무 매워요</h5>
      <ImgDiv></ImgDiv>
      <p>작성자</p>
      <p>작성 날짜</p>
      <p>별점 4.5/5/0</p>
      <MenuBlock>너무 매워서 정신 나갈 것 같아 정신 나갈 것 같아 점심 나가서 먹을 것 같아</MenuBlock>
      </MenuBlock>
      <Button cyan fullWidth style={{ marginTop: "1rem" }} onClick={openModal}>
        예약하기
      </Button>
      {modalVisible && (
        <Modal
          visible={modalVisible}
          closable={true}
          maskClosable={true}
          onClose={closeModal}
        >
          <div>
            <Carousel itemToShow={1}>
              <item><Moment add={{ days: 1}} format="YYYY/MM/DD"></Moment></item>
              <item><Moment add={{ days: 2}} format="YYYY/MM/DD"></Moment></item>
              <item><Moment add={{ days: 3}} format="YYYY/MM/DD"></Moment></item>
              <item><Moment add={{ days: 4}} format="YYYY/MM/DD"></Moment></item>
              <item><Moment add={{ days: 5}} format="YYYY/MM/DD"></Moment></item>
              <item><Moment add={{ days: 6}} format="YYYY/MM/DD"></Moment></item>
              <item><Moment add={{ days: 7}} format="YYYY/MM/DD"></Moment></item>
            </Carousel>
          </div>
          <MenuBlock>
            <Button white fullWidth>
              14:00 ~ 16:00
            </Button>
            <Button white fullWidth>
              16:00 ~ 18:00
            </Button>
            <Button white fullWidth>
              <Link to="/ReservePage">18:00 ~ 20:00 (test용)</Link>
            </Button>
            <Button white fullWidth>
              20:00 ~ 22:00
            </Button>
          </MenuBlock>
        </Modal>
      )}
    </AuthTemplate>
  );
};

export default StorePage;
