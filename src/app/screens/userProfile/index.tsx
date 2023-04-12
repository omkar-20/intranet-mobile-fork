import React from 'react';

import CustomTabView from './customTabView';
import Header from '../../components/Header';

const UserProfile = () => {
  return (
    <>
      <Header onMainScreen={false} />
      <CustomTabView />
    </>
  );
};

export default UserProfile;
