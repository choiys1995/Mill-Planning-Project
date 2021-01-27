import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import AuthTemplate from "../components/auth/AuthTemplate";
import Button from "../components/common/Button";
import { Link } from "react-router-dom";
import MenuBlock from '../components/common/MenuBlock'
import * as resAction from '../_actions/reserve_actions'
import * as userAction from '../_actions/user_actions'
import * as domain from '../lib/server'



const MyResvPage = () => {
  const dispatch = useDispatch();
  const { viewReserveData } = useSelector(state => state.reserve)

  useEffect(() => {
    dispatch(userAction.auth());
    dispatch(resAction.listReserve());
  }, [dispatch])

  return (
    <AuthTemplate>
      나의 예약 현황
      <br />
      <br />
      <MenuBlock>
        {viewReserveData &&
          viewReserveData.length > 0 &&
          viewReserveData.map(data => (
            <>
              <p>{data.reservedate} {data.reservetime/10000}시<br/>
              {data.name}
              <Link to={`/ReviewPage/${data.storeid}`}>
                <Button right>
                  리뷰 작성
                </Button>
                </Link>
              </p>
            </>
          ))
        }
      </MenuBlock>
    </AuthTemplate>
  );
};

export default MyResvPage;
