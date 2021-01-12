import React from 'react';
import './App.css';
import Navigator from './component/Navigator';
import {Route, Switch} from 'react-router-dom';
import myPage from './myPage';
import Search from './Search';

const App = () => {
  return (
    <>
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
