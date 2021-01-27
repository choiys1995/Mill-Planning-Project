import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as userAction from '../_actions/user_actions'
import AuthTemplate from '../components/auth/AuthTemplate';
import Button from '../components/common/Button';
import { Link } from 'react-router-dom';
import Carousel from 'react-elastic-carousel'
import * as storeAction from '../_actions/store_actions'
import * as domain from '../lib/server'
import styled from 'styled-components'


const StyledImg = styled.img`
  width: 100%;
  object-fit: cover;
  boder: 1px solid #000;
`




const HomePage = () => {

  const dispatch = useDispatch();
  const { account } = useSelector(state => state.user)
  const { homeArrayStoreList } = useSelector(state => {
    //console.log(state.store)
    return state.store;
  })

  useEffect(() => {
    dispatch(userAction.auth())
    dispatch(storeAction.mainPageStoreList())
  }, [dispatch])

  return (
    <AuthTemplate>
        <Carousel itemsToShow={1}>
          {
            homeArrayStoreList ? 
              homeArrayStoreList.store.map(data => 
                <Link to={`/StorePage/${data.storeid}`}>
                  <StyledImg src={`${domain.default}` + data.store_img} 
                        alt={data.storeid} 
                        key={data.storeid}
                        />
                </Link>
              ) :
            <img src={`${domain.default}images/ml-untitle.png` }
                    alt=''/>
          }
        </Carousel>
      
    
      <div>
        {account && account.admin ?
          <Button right>
            <Link to="/OwnerPage">관리자페이지</Link>
            {/* 관리자 아이디 로그인시만 보여야함 */}
          </Button> : ''
        }
      </div>
    </AuthTemplate>
  );
};

export default HomePage;
