import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import AuthTemplate from "../components/auth/AuthTemplate";
import styled, { css } from "styled-components";
import palette from "../lib/styles/palette";
import Button from "../components/common/Button";
import { Link } from "react-router-dom";
import * as resAction from '../_actions/reserve_actions'

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


const CompletePage = (props) => {

  const { reserveid } = props.match.params;
  const { indexReserveData } = useSelector(state => state.reserve);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resAction.indexReserve(reserveid))
  }, [dispatch, reserveid])

  return (
    <>
      {indexReserveData &&
        <AuthTemplate relative>
          <h3>예약확인</h3>
          <MenuBlock bold right>
            <table>
              <tr>
                <td>주문번호</td>
                <td><p>{indexReserveData.ordercode}</p></td>
              </tr>
              <tr>
                <td>가게명</td>
                <td><p>{indexReserveData.name}</p></td>
              </tr>
              <tr>
                <td>주소</td>
                <td><p>{indexReserveData.address}</p></td>
              </tr>
              <tr>
                <td>예약일시</td>
                <td><p>{indexReserveData.reservedate}</p></td>
              </tr>
              <tr>
                <td>이용시간</td>
                <td><p>{indexReserveData.reservetime / 10000}:00 ~ {indexReserveData.reservetime / 10000 + 2}:00</p></td>
              </tr>
              <tr>
                <td>예약자명</td>
                <td><p>{!indexReserveData.c_nickname || '' ?
                  indexReserveData.o_nickname :
                  indexReserveData.c_nickname
                }</p></td>
              </tr>
              <tr>
                <td>선수금 결제 금액</td>
                <td>{indexReserveData.prepay}원</td>
              </tr>
            </table>
          </MenuBlock>
          <Button cyan fullWidth>
            <Link to="/">홈으로</Link>
          </Button>
        </AuthTemplate>
      }
    </>

  );
};

export default CompletePage;