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
import AddStorePage from "./pages/AddStorePage"
import ReviewPage from "./pages/ReviewPage"
import CancelPage from "./pages/CancelPage"
import HomePage from "./pages/HomePage"
import ModStorePage from "./pages/ModStorePage"
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
      <Route component={AddStorePage} path="/AddStorePage"/>
      <Route component={ReviewPage} path="/ReviewPage"/>
      <Route component={CancelPage} path="/CancelPage"/>
      <Route component={ModStorePage} path="/ModStorePage"/>
      <Switch>
        <Route component={HomePage} path="/HomePage"/>
        <Route component={MyPage} path="/MyPage"/>
        <Route component={SearchPage} path="/SearchPage"/>
      </Switch>
      
      <Navigator></Navigator>
    </>
  );
}

export default App;
