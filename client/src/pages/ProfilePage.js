import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import AuthTemplate from '../components/auth/AuthTemplate';
import Button from "../components/common/Button";
import MenuBlock from "../components/common/MenuBlock"
import Input from '../components/common/Input'
import { Link, withRouter } from "react-router-dom";
import * as userAction from '../_actions/user_actions'

const ProfilePage = ({ history }) => {

  const dispatch = useDispatch()
  const { account } = useSelector(state => state.user)

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('')
  const [newTel, setNewTel] = useState('')
  const [newNickname, setNewNickname] = useState('')

  useEffect(() => {
    if (!account) {
      history.push('/')
    }
    dispatch(userAction.auth()).then(data => {
      const { nickname, tel } = data.payload.data.account

      setNewTel(tel || '')
      setNewNickname(nickname || '')
    });
  }, [dispatch])

  const onChangeCurrentPassword = (e) => {
    switch (e.target.name) {
      case "currentPassword":
        setCurrentPassword(e.currentTarget.value)
        break;
      case "newPassword":
        setNewPassword(e.currentTarget.value)
        break;
      case "newPasswordConfirm":
        setNewPasswordConfirm(e.currentTarget.value)
        break;
      case "newNickname":
        setNewNickname(e.currentTarget.value);
        break;
      case "newTel":
        setNewTel(e.currentTarget.value);
        break;
      default:
        break;
    }
  }

  const onProfileEditHandler = (e) => {
    e.preventDefault();

    const profileData = {
      currentPassword,
      newPassword,
      newNickname,
      newTel
    }

    if (!account.account.token || '') {
      if (!currentPassword || '') {
        alert("현재 비밀번호를 입력해주세요")
        return;
      }
      if (!newPassword || '') {
        alert("새로운 비밀번호를 입력해주세요")
        return;
      }
      if ((!newPasswordConfirm || '') ||
        (newPassword !== newPasswordConfirm)) {
        alert("새로운 비밀번호가 일치하지않습니다.")
        return;
      }
    }



    if (!newNickname || '') {
      alert("닉네임을 입력해주세요")
      return;
    }

    dispatch(userAction.profile_check(profileData)).then(data => {
      const { passwordConfirm } = data.payload.data

      if (passwordConfirm) {
        dispatch(userAction.profile_edit(profileData))

        alert("성공적으로 프로필이 변경되었습니다.")
        return history.push('/');
      }

      alert('현재 비밀번호가 다릅니다.')
      setCurrentPassword('');
      return false;
    })
  }

  return (

    <AuthTemplate relative>
      {account && account.account && <>
        <h3>프로필수정</h3>
        <form onSubmit={onProfileEditHandler}>
          <MenuBlock>{account.account.email || account.account.nickname + '(카카오)'}</MenuBlock>
          {
            !account.account.token && <>
              <Input type="password"
                name="currentPassword"
                fullWidth
                placeholder="현재비밀번호"
                value={currentPassword}
                onChange={onChangeCurrentPassword} />
              <Input type="password"
                name="newPassword"
                fullWidth
                placeholder="새비밀번호"
                value={newPassword}
                onChange={onChangeCurrentPassword} />
              <Input type="password"
                name="newPasswordConfirm"
                fullWidth
                placeholder="비밀번호재입력"
                value={newPasswordConfirm}
                onChange={onChangeCurrentPassword} />
            </>
          }

            전화번호
          <Input type="text"
            name="newTel"
            placeholder="전화번호 ['-'는 제외하고 입력]"
            fullWidth
            pattern="01[016789]\d{7,8}"
            title="형식 01012345678"
            value={newTel}
            onChange={onChangeCurrentPassword} /><br />
            닉네임
          <Input type="text"
            name="newNickname"
            fullWidth
            placeholder="닉네임"
            value={newNickname}
            onChange={onChangeCurrentPassword} /><br />

          <Button type="submit" fullWidth cyan>
            프로필 수정
          </Button>
        </form>
      </>
      }
    </AuthTemplate>
  );
};

export default withRouter(ProfilePage);