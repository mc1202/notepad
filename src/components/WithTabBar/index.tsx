import React from 'react';
import TabBar from '@/components/TabBar';

const WithTabBar: React.FC<{ showTabBar: boolean; children: React.ReactNode }> = ({ showTabBar, children }) => {
  return (
    <>
      {children}
      {showTabBar && <TabBar />}
    </>
  );
};

export default WithTabBar;