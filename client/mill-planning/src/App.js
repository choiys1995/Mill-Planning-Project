import React from 'react';
import './App.css';
import Navigator from './components/common/Navigator';
import {Route, Switch} from 'react-router-dom';
import myPage from './myPage';
import Search from './Search';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const App = () => {
  return (
    <>
      <Route component={LoginPage} path="/login"/>
      <Route component={RegisterPage} path="/register"/>
      <Switch>
        <Route path={'/'} exact/>
        <Route component={myPage} path="/mypage"/>
        <Route component={Search} path="/search"/>
      </Switch>
      <Navigator></Navigator>
    </>
  );
}

export default App;
