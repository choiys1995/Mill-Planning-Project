import React from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';
import AuthStoreForm from '../components/auth/AuthStoreForm';

const ModStorePage = () => {
  return (
    <AuthTemplate>
      <AuthStoreForm type="register" />
    </AuthTemplate>
  );
};

export default ModStorePage;