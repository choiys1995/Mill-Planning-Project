import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import AuthTemplate from "../components/auth/AuthTemplate";
import Button from "../components/common/Button";
import * as storeAction from '../_actions/store_actions'



const OwnerPage = () => {

  const { adminManagmentStoreList } = useSelector(state => state.store)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(storeAction.adminManagementStoreList())
  }, [dispatch])

  return (
    <AuthTemplate>
      관리자 페이지
      {adminManagmentStoreList &&
        adminManagmentStoreList.map(data => (
          <>
            <br />
            <br />
            <div>
              <Link to={`/StorePage/${data.storeid}`}>
                <Button white fullWidth>
                  {data.name}
                </Button>
              </Link>
            </div>
            <br />
            <br />
          </>
        ))

      }
      <div>
        <Link to="/AddStorePage">
          <Button round right>
            +
      </Button>
        </Link>
      </div>
    </AuthTemplate >
  );
};

export default OwnerPage;
