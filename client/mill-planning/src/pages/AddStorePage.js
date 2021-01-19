import React from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';
import AuthStoreForm from '../components/auth/AuthStoreForm';

const AddStorePage = () => {
  return (
    <AuthTemplate>
        {/* 가게 추가 + 가게 정보 수정 합쳐서 Form으로 제작할 예정 */}
      <AuthStoreForm type="login" />
    </AuthTemplate>
  );
};

export default AddStorePage;