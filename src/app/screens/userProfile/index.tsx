import React from 'react';

import CustomTabView from './customTabView';
import Header from '../../components/header';

const UserProfile = () => {
  return (
    <>
      <Header type="secondary" />
      {/* <Header type="primary" title="Profile" isRightButtonClickable={false} /> */}
      <CustomTabView />
    </>
  );
};

export default UserProfile;
