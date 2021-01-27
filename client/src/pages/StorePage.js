import React, { useState, useEffect } from "react";
import AuthTemplate from "../components/auth/AuthTemplate";
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from "styled-components";
import palette from "../lib/styles/palette";
import AuthForm from "../components/auth/AuthForm";
import Button from "../components/common/Button";
import { Link } from "react-router-dom";
import Modal from '../components/modal/Modal'
import * as storeAction from '../_actions/store_actions'
import * as reviewAction from '../_actions/review_action'
import * as format from '../lib/dateFormat'
import Carousel from "react-elastic-carousel";
import RadioButton from '../components/common/radioButton'
import * as domain from '../lib/server'
import { Helmet } from 'react-helmet-async'



const ImgDiv = styled.img`
  padding: 0.5rem 0.75rem;
  border-radius: 0.25rem;
  font-weight: bold;
  font-size: 1rem;
  line-height: 1.5;
  border: 1px solid ${palette.gray[5]};
  width: 50%;
  margin-right: 0.5rem;
  &:{
    width: 100%;
  }
`;

const StyledImg = styled.img`
  width: 100%;
  height: 10vh;
  object-fit: cover;
  boder: 1px solid #000;
`

const MenuBlock = styled.div`
  padding: 0.5rem 0.75rem;
  border-radius: 0.25rem;
  font-size: ${({ font_size }) => font_size}rem;
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




const StorePage = (props) => {

  const { storeid } = props.match.params;

  const dispatch = useDispatch();
  const { findStoreInfo } = useSelector(state => state.store);
  const { indexReview } = useSelector(state => state.review);

  const [resDateIndex, setResDateIndex] = useState(0)
  const [radioIndex, setRadioIndex] = useState(0)

  const [modalVisible, setModalVisible] = useState(false)
  const openModal = () => {
    setModalVisible(true)
  }
  const closeModal = () => {
    setModalVisible(false)
  }

  useEffect(() => {
    dispatch(storeAction.storeInfo(storeid))
    dispatch(reviewAction.reviewIndexer(storeid))
  }, [dispatch, storeid])

  const carouselOnChangeHandler = (curItem, curPageIndex) => {
    setResDateIndex(curPageIndex);
  }

  const radioCheckHandler = (e) => {
    setRadioIndex(e.target.defaultValue)
  }

  return (<>
    {findStoreInfo ?
      <AuthTemplate relative>
        <Helmet>
          <title>{findStoreInfo.store.name}</title>
        </Helmet>
        <h3 align="center">{findStoreInfo.store.name}</h3>
        <h4 align="center">{findStoreInfo.store.address}</h4>
        <div align="center">
          <ImgDiv src={domain.default + findStoreInfo.store.store_img}
            alt="" />
        </div>
        <br />
        <div align="right"> 별점 평균 :
        {indexReview && indexReview.star.length > 0 &&
            <span> {indexReview.star[indexReview.star.length - 1].average}</span>}
        </div>
        <div align="right">
          {indexReview &&
            indexReview.star.length > 0 &&
            [...Array(5)].map((n, index) =>
              indexReview.star[indexReview.star.length - 1].average > index ?
                <>★</> : <>☆</>
            )
          }
        </div>
        <br />

        <h4 align="center"> 메뉴 </h4>
        <Carousel itemToShow={1}>
          {findStoreInfo.menu &&
            findStoreInfo.menu.length > 0 ?
            findStoreInfo.menu.map(data =>
              <MenuBlock right bold>
                <div>
                  <StyledImg src={`${domain.default}${data.menu_img}`} width='64px' alt='' />
                  <br /><p>{data.name}</p><p>{data.price}</p>
                </div>
              </MenuBlock>
            ) : <MenuBlock center bold>준비중입니다.</MenuBlock>
          }
        </Carousel>

        <h4 align="center"> 리뷰 </h4>
        {indexReview &&
          indexReview.review && indexReview.review.length > 0 ?
          indexReview.review.map(review =>
            <MenuBlock key={review.reviewid}>
              <h3>{review.title}</h3>
              <ImgDiv src={`${domain.default}${review.review_img}`} />
              <h5>작성자: {review.writer}</h5>
              <hr />
              <p>{review.content}</p>
              <p>별점 {review.score} {[...Array(5)].map((n, index) =>
                parseInt(review.score) > index ? <>★</> : <>☆</>
              )}</p>
            </MenuBlock>
          ) : <MenuBlock font_size="0.8"> 리뷰가 없습니다.😂<br /> 해당 가게의 첫번째 리뷰어가 되어볼까요?</MenuBlock>
        }
        <Button cyan fullWidth style={{ marginTop: "1rem" }} onClick={openModal}>
          예약하기
      </Button>
        {
          modalVisible && (
            <Modal
              visible={modalVisible}
              closable={true}
              maskClosable={true}
              onClose={closeModal}
            >
              <div>
                <Carousel itemToShow={1} onChange={carouselOnChangeHandler}>
                  {[...Array(7)].map((n, index) =>
                    <p>{new Date(Date.now() + (index * 86400 * 1000)).format('MM월 dd일')}</p>
                  )}
                </Carousel>
              </div>
              <MenuBlock>
                <RadioButton>
                  {[...Array(5)].map((n, index) =>
                    <div key={index}>
                      {resDateIndex === 0 &&
                        parseInt(new Date().format('HH')) + 1 >= (index * 2) + 12 ?
                        <> <input type="radio" disabled onChange={radioCheckHandler} id={index} name="timezone" value={index} />
                          <label htmlFor={index}>해당시간대는 선택하실 수 없습니다</label> </> :
                        <> <input type="radio" onChange={radioCheckHandler} id={index} name="timezone" value={index} />
                          <label htmlFor={index}>{(index * 2) + 12}:00 ~ {(index * 2) + 14}:00</label> </>

                      }

                    </div>
                  )}
                </RadioButton>
              </MenuBlock>
              <Link to={`/ReservePage/${storeid}/${(radioIndex * 2) + 12}/${resDateIndex}`}>
              <Button fullWidth>예약하기</Button>
              </Link>
            </Modal>
          )}
      </AuthTemplate> :
      ''
    }
  </>
  );
};

export default StorePage;
