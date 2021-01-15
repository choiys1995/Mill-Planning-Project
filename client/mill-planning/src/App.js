import React from 'react';
import './App.css';
import Navigator from './components/common/Navigator';
import {Route, Switch} from 'react-router-dom';
import MyPage from './pages/MyPage';
import SearchPage from './pages/SearchPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MyResvPage from './pages/MyResvPage';
import PreResvPage from './pages/PreResvPage';
import ProfilePage from './pages/ProfilePage';

const App = () => {
  return (
    <>
      <Route component={LoginPage} path="/login"/>
      <Route component={RegisterPage} path="/register"/>
      <Route component={MyResvPage} path="/MyResvPage"/>
      <Route component={PreResvPage} path="/PreResvPage"/>
      <Route component={ProfilePage} path="/ProfilePage"/>
      <Switch>
        <Route path={'/'} exact/>
        <Route component={MyPage} path="/mypage"/>
        <Route component={SearchPage} path="/SearchPage"/>
      </Switch>
      <Navigator></Navigator>
    </>
  );
}

export default App;
