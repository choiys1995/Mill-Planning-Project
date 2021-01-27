import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import AuthTemplate from '../components/auth/AuthTemplate';
import MenuBlock from '../components/common/MenuBlock';
import Button from '../components/common/Button'
import Modal from "../components/modal/Modal";
import * as storeAction from '../_actions/store_actions'
import * as resAction from '../_actions/reserve_actions'


const ResiCheckPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { viewAdminReserveData } = useSelector(state => {
    return state.reserve
  })
  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(resAction.adminReserveView())
  }, [dispatch])
  return (
    <AuthTemplate relative>
      <h3>예약확인</h3>
      {
        viewAdminReserveData &&
        viewAdminReserveData.length > 0 &&
        viewAdminReserveData.map(data =>
          <>
            
            <Button fullWidth style={{ marginTop: "1rem" }} onClick={openModal}>
              <p><span>{data.reservedate}</span> <span>{data.reservetime/10000}시</span> <span>{data.orderer_cust === 0 ? data.orderer_owner_nickname : data.orderer_cust_nickname}</span></p>
            </Button>
            {modalVisible && (
              <Modal
                visible={modalVisible}
                closable={true}
                maskClosable={true}
                onClose={closeModal}
              >
                <h3>예약내용</h3>
                <MenuBlock>
                  <p>결제번호: {data.ordercode}</p>
                  <p>가게명: {data.store_name}</p>
                  <p>예약날짜: {data.reservedate}</p>
                  <p>예약시간: {data.reservetime/10000}시</p>
                  <p>예약자: {data.orderer_cust === 0 ? data.orderer_owner_nickname : data.orderer_cust_nickname}</p>
                  <p>인원: {!data.peoples || '' ? 1 : 2}</p>
                  <p>취소여부: {data.cancel}</p>
                </MenuBlock>
              </Modal>
            )}
          </>
        )
      }

    </AuthTemplate>
  );
};

export default ResiCheckPage;