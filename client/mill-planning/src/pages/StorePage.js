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

const ImgDiv = styled.div`
  float: left;
  padding: 0.5rem 0.75rem;
  border-radius: 0.25rem;
  font-weight: bold;
  font-size: 1rem;
  line-height: 1.5;
  border: 1px solid ${palette.gray[5]};
  height: 5.5rem;
  width: 5.5rem;
  margin-right: 0.5rem;
`;

const MenuBlock = styled.div`
  padding: 0.5rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  line-height: 1.5;
  border: 1px solid ${palette.gray[5]};
  width: 100%;
  margin-right: 1rem;
  ${(props) =>
    props.bold &&
    css`
      font-weight: bold;
    `}
  ${(props) =>
    props.right &&
    css`
      text-align: right;
    `}
`;

const StorePage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  return (
    <AuthTemplate>
      <h3>가게 조회</h3>
      <div>
        <ImgDiv>사진1</ImgDiv>
        <ImgDiv>사진2</ImgDiv>
        <ImgDiv>사진3</ImgDiv>
      </div>
      <br />
      <div align="right"> 4.4/5.0</div>
      <br />
      <MenuBlock right bold>
        평양냉면 1.4
        <br />
        비빔냉면 1.2
        <br />
      </MenuBlock>
      <MenuBlock>국물이 끝내줘요</MenuBlock>
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
              <item>1월 22일</item>
              <item>1월 23일</item>
              <item>1월 24일</item>
              <item>1월 25일</item>
              <item>1월 26일</item>
              <item>1월 27일</item>
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
