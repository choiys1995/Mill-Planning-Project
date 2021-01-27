import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import palette from "../../lib/styles/palette";
import Button from "../common/Button";
import {registerUser, loginUser, auth, isExistUser} from '../../_actions/user_actions'
import * as domain from '../../lib/server'
import ToggleButton from 'react-toggle-button'

/**
 * 회원가입 또는 로그인 폼을 보여줍니다.
 */

const AuthFormBlock = styled.div`
  h3 {
    margin: 0;
    color: ${palette.gray[8]};
    margin-bottom: 1rem;
  }
`;

/**
 * 스타일링된 input
 */
const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[5]};
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;
  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid ${palette.gray[7]};
  }
  & + & {
    margin-top: 1rem;
  }
`;

/**
 * 폼 하단에 로그인 혹은 회원가입 링크를 보여줌
 */
const Footer = styled.div`
  margin-top: 2rem;
  text-align: right;
  a {
    color: ${palette.gray[6]};
    text-decoration: underline;
    &:hover {
      color: ${palette.gray[9]};
    }
  }
`;


const textMap = {
  login: "로그인",
  register: "회원가입",
};

/**
 * 에러를 보여줍니다
 */
const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 0.875rem;
  margin-top: 1rem;
`;


const { Kakao } = window;

const AuthForm = ({ history, type }) => {
  const text = textMap[type];
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [tel, setTel] = useState('');
  const [nickname, setNickname] = useState('');
  const [admin, setAdmin] = useState(false)
  const [existUser, setExistUser] = useState(true);

  function onEmailChange(e) {
    setEmail(e.currentTarget.value);
  }

  function onPasswordChange(e) {
    setPassword(e.currentTarget.value);
  }

  function onTelChange(e) {
    setTel(e.currentTarget.value);
  }

  function onNicknameChange(e) {
    setNickname(e.currentTarget.value);
  }

  function onAdminToggle(e) {
    setAdmin(!e);
  }

  function isExistUserCheck(e) {
    if(!Email || '') {
      alert('이메일 칸이 비어있습니다.');
      return;
    }

    if(Email.indexOf('@') === -1){
      alert('올바른 이메일 형식을 입력해주세요');
      return;
    }

    dispatch(isExistUser(Email, admin)).then(data => {
      const {isExist} = data.payload.data;
      
      setExistUser(isExist);
      alert(isExist ? '중복되었거나 잘못된 이메일입니다.' : '가입하셔도 좋습니다');
    });
  }

  function onSubmitHandler(e) {
    e.preventDefault();

    if(!Email || '') {
      alert('이메일을 입력해주세요')
      return;
    }
    if(!Password || '') {
      alert('패스워드를 입력해주세요');
      return;
    }

    if(type === "register" && existUser) {
      alert('중복된 이메일입니다.');
      return;
    }

    const body = {
      email: Email,
      password: Password,
      tel,
      nickname,
      admin,
    };

    if(type === 'register'){
      dispatch(registerUser(body, admin)).then(data => {
        history.push('/MyPage');
      })
    }
    if(type === 'login'){
      dispatch(loginUser(body));
      dispatch(auth());

      history.push('/MyPage');
    }
  }

  function KakaoLogin() {
    let redirectUri = admin ?
              `${domain.default}api/auth/oauth/kakao/1` :
              `${domain.default}api/auth/oauth/kakao`


    Kakao.Auth.authorize({
      redirectUri,
      scope: 'profile, gender'
    })

    dispatch(auth())
  }

  return (
    <AuthFormBlock>
      <h3>{text}</h3>
      <div align="right" width="100%">
        <p>관리자 {text}</p>
        <ToggleButton
          inactiveLabel = {'OFF'}
          activeLabel = {'ON'}
          value={admin}
          onToggle={onAdminToggle}/>
      </div>
      <form onSubmit={onSubmitHandler}>
        <StyledInput
          placeholder="이메일"
          type="email"
          value={Email}
          onChange={onEmailChange}
          pattern= "[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}"
          title="올바른 이메일 형식을 입력해주시기 바랍니다."
        /> 
        {type === "register" && <input type="button" onClick={isExistUserCheck} value="중복체크"/>}
        <br />
        <StyledInput
          placeholder="비밀번호"
          type="password"
          value={Password}
          onChange={onPasswordChange}
        />
        <br />
        {type === "register" && <>
          <StyledInput placeholder="전화번호" 
                type="text" 
                value={tel} 
                onChange={onTelChange} 
                pattern="01[016789]\d{7,8}"
                title="형식 01012345678으로 입력해주시기바랍니다."/>
          <StyledInput placeholder="닉네임" 
                type="text" 
                value={nickname} 
                onChange={onNicknameChange}
                required/>
          </>}
        <Button
          cyan
          fullWidth
          style={{ marginTop: "1rem" }}
          type="submit"
        >
          {text}
        </Button>
        {
          type === "login" &&
          <Button
            yellow
            fullWidth
            style={{ marginTop: "1rem" }}
            type="button"
            onClick={KakaoLogin}
          >
            카카오 로그인
        </Button>
        }

        <div className={('login')}>

        </div>
      </form>
      <Footer>
        {type === "login" ? (
          <Link to="/register">회원가입</Link>
        ) : (
            <Link to="/login">로그인</Link>
          )}
      </Footer>
    </AuthFormBlock>
  );
};

export default withRouter(AuthForm);
