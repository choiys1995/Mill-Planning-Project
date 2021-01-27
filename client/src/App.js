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
import StorePage from "./pages/StorePage"
import ReservePage from "./pages/ReservePage"
import CompletePage from "./pages/CompletePage"
import NotFoundPage from './pages/NotFoundPage'
import { Helmet } from 'react-helmet-async';
import ResiCheckPage from './pages/ResiCheckPage'
import TestReviewPage from './pages/TestReviewPage';

const App = () => {
  return (
    <>
    <Helmet>
      <title>Mill-Planning 예약서비스</title>
    </Helmet>
      <Route component={LoginPage} path="/login"/>
      <Route component={RegisterPage} path="/register"/>
      <Route component={MyResvPage} path="/MyResvPage"/>
      <Route component={PreResvPage} path="/PreResvPage"/>
      <Route component={ProfilePage} path="/ProfilePage"/>
      <Route component={OwnerPage} path="/OwnerPage"/>
      <Route component={AddStorePage} path="/AddStorePage"/>
      <Route component={TestReviewPage} path="/ReviewPage/:storeid"/>
      <Route component={CancelPage} path="/CancelPage"/>
      <Route component={ModStorePage} path="/ModStorePage"/>
      <Route component={StorePage} path={["/StorePage/:storeid"]}/>
      <Route component={ReservePage} path={["/ReservePage/:storeid/:time/:date", "/ReservePage/:storeid"]}/>
      <Route component={CompletePage} path="/CompletePage/:reserveid"/>
      <Route component={ResiCheckPage} path="/owner/reserve"/>
    
      <Switch>
        <Route component={HomePage} exact path="/"/>
        <Route component={MyPage} path="/MyPage"/>
        <Route component={SearchPage} path="/SearchPage"/>
      </Switch>
      
      <Navigator></Navigator>
    </>
  );
}

export default App;
