import React from 'react';
import './App.css';
import Navigator from './components/common/Navigator';
import {Route, Switch, Link} from 'react-router-dom';
import MyPage from './pages/MyPage';
import SearchPage from './pages/SearchPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MyResvPage from './pages/MyResvPage';
import PreResvPage from './pages/PreResvPage';
import ProfilePage from './pages/ProfilePage';
import OwnerPage from './pages/OwnerPage';
import OwnerStorePage from "./pages/OwnerStorePage"
import Button from './components/common/Button';

const App = () => {
  return (
    <>
      <Route component={LoginPage} path="/login"/>
      <Route component={RegisterPage} path="/register"/>
      <Route component={MyResvPage} path="/MyResvPage"/>
      <Route component={PreResvPage} path="/PreResvPage"/>
      <Route component={ProfilePage} path="/ProfilePage"/>
      <Route component={OwnerPage} path="/OwnerPage"/>
      <Route component={OwnerStorePage} path="/OwnerStorePage"/>
      <Switch>
        <Route path={'/'} exact/>
        <Route component={MyPage} path="/mypage"/>
        <Route component={SearchPage} path="/SearchPage"/>
      </Switch>
      <Button>
          <Link to="/OwnerPage">관리자페이지</Link> 
          {/* 관리자 아이디 로그인시만 보여야함 */}
      </Button>
      <Navigator></Navigator>
    </>
  );
}

export default App;
