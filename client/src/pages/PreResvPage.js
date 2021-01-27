import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import AuthTemplate from "../components/auth/AuthTemplate";
import Button from "../components/common/Button";
import { Link } from "react-router-dom";
import MenuBlock from '../components/common/MenuBlock'
import * as resAction from '../_actions/reserve_actions'
import * as userAction from '../_actions/user_actions'

const PreResvPage = () => {
  const dispatch = useDispatch();
  const { viewPreReserveData } = useSelector(state => state.reserve)

  useEffect(() => {
    dispatch(userAction.auth());
    dispatch(resAction.listOldReserve());
  }, [dispatch])

  return (
    <AuthTemplate>
      이전 예약 목록
      <br />
      <br />

      <MenuBlock>
        {viewPreReserveData &&
          viewPreReserveData.length > 0 &&
          viewPreReserveData.map(data => (
            <>
              <p>{data.reservedate} {data.reservetime/10000}시<br/>
              {data.name}
                <Button right>
                  <Link to={`/ReviewPage/${data.storeid}`}>리뷰 작성</Link>
                </Button>
              </p>
            </>
          ))
        }
      </MenuBlock>

    </AuthTemplate>
  );
};

export default PreResvPage;
