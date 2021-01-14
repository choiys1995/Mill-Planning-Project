import React from 'react';
import './Navigator.css';
import {Route, Link} from 'react-router-dom';

const Navigator = () => {
  return (
    <div className="footer-row">
      <div className="footer-column">
          <Link to="/">홈</Link>
      </div>
      <div className="footer-column">
          <Link to="/Search">검색</Link>
      </div>
      <div className="footer-column">
          <Link to="/myPage">마이페이지</Link>
      </div>
    </div>
  );
};

export default Navigator;