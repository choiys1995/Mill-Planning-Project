import React, { useEffect } from "react";
import AuthTemplate from "../components/auth/AuthTemplate";
import Button from "../components/common/Button";
import { Link, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import Moment from 'react-moment'
import MenuBlock from '../components/common/MenuBlock'
import Iamport from 'react-iamport'
import * as storeAction from '../_actions/store_actions'
import * as userAction from '../_actions/user_actions'
import * as resAction from '../_actions/reserve_actions'
import * as format from '../lib/dateFormat'
import * as domain from '../lib/server'


const ReservePage = (props) => {

  const { storeid, date, time } = props.match.params;
  const dispatch = useDispatch();

  const { findStoreInfo } = useSelector(state => state.store);
  const { account } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(userAction.auth())
    dispatch(storeAction.storeInfo(storeid))
  }, [dispatch, storeid])

  return (
    <>
      {

        account &&
        account.account &&
        findStoreInfo &&
        findStoreInfo.store &&
        <AuthTemplate relative>
          <h3>예약확인</h3>
          <MenuBlock right>
            <table>
              <tr>
                <td>가게명</td>
                <td><p>{findStoreInfo.store.name}</p></td>
              </tr>
              <tr>
                <td>예약일시</td>
                <td><p>{new Date(Date.now() + (date * 86400 * 1000)).format('MM월 dd일')}</p></td>
              </tr>
              <tr>
                <td>이용시간</td>
                <td><p>{time}:00 ~ {parseInt(time) + 2}:00</p></td>
              </tr>
              <tr>
                <td>예약자명</td>
                <td><p>{account.account.nickname}</p></td>
              </tr>
              <tr>
                <td>결제 금액</td>
                <td><p>{findStoreInfo.store.prepay}</p></td>
              </tr>
            </table>

          </MenuBlock>
          <Iamport
            identificationCode="imp94333879"
            params={{
              pg: "html5_inicis",
              pay_method: "card",
              merchant_uid: `MILLP${storeid}-${new Date().getTime()}`,
              name: `${findStoreInfo.store.name}`,
              amount: findStoreInfo.store.prepay,
              buyer_email: `${!account.account || '' ? '' : account.account.email}`,
              buyer_tel: `${!account.account || '' ? '' : account.account.tel}`,
              buyer_name: `${account.account.nickname}`,
              m_redirect_url: `${domain.default}api/customers/mobile/reserve/${storeid}`
            }}
            onFailed={err => {
              props.history.push(`/StorePage/${storeid}`)
            }}
            onSuccess={res => {
              const resData = {
                imp_uid: res.imp_uid,
                merchant_uid: res.merchant_uid,
                name: res.name,
                amount: res.amount,
                buyer_name: res.buyer_name,
                buyer_tel: res.buyer_tel,
                storeid: storeid,
                reservedate: new Date(Date.now() + (date * 86400 * 1000)).format('yyyyMMdd'),
                prepay: findStoreInfo.store.prepay,
                peoples: 1,
                reservetime: time * 10000
              }
              dispatch(resAction.doReserve(resData)).then((data) => {
                props.history.push(`/CompletePage/${data.payload.data.insert_reserve}`)
              })
            }}

            render={(renderProps) =>
              <Button fullWidth onClick={renderProps.onClick}>예약하기</Button>}
          />
        </AuthTemplate>
      }
    </>

  );
};

export default withRouter(ReservePage);
