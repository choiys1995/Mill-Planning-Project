import React from 'react';
import './Navigator.css';
import { Route, Link } from 'react-router-dom';
import Button from '../common/Button'
import { MdHome, MdSearch, MdPeople } from 'react-icons/md'

const Navigator = () => {
  return (
    <div className="footer-row">
      {/*<Button bigfont cyan className="footer-column">
          <Link to="/HomePage">홈</Link>
      </Button>
      <Button bigfont cyan className="footer-column">
          <Link to="/SearchPage">검색</Link>
      </Button>
      <Button bigfont cyan className="footer-column">
          <Link to="/MyPage">마이페이지</Link>
      </Button>*/}
      <Link to="/">
        <Button bigfont cyan className="footer-column">
          <MdHome size="2.0rem" />
        </Button>
      </Link>

      <Link to="/SearchPage">
        <Button bigfont cyan className="footer-column">
          <MdSearch size="2.0rem" />
        </Button>
      </Link>
      <Link to="/MyPage">
        <Button bigfont cyan className="footer-column">
          <MdPeople size="2.0rem" />
        </Button>
      </Link>
    </div>
  );
};

export default Navigator;