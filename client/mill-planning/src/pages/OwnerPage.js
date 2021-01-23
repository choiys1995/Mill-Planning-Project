import React from "react";
import { Link } from "react-router-dom";
import AuthTemplate from "../components/auth/AuthTemplate";
import Button from "../components/common/Button";



const OwnerPage = () => {
  return (
    <AuthTemplate>
      관리자 페이지
      <br />
      <br />
      <div>
        <Button white fullWidth>
            <Link to="/ModStorePage">봉피양</Link>
          </Button>
      </div>
      <br/>
      <br/>
      <div>
      <Button round right>
        <Link to="/AddStorePage">+</Link>
      </Button>
      </div>
    </AuthTemplate>
  );
};

export default OwnerPage;
