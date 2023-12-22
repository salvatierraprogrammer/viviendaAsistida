import { View, Text } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNav from './AuthNav';
import TabNav from './TabNav';
const MainNav = () => {
  
  return (
    <NavigationContainer>
      { checkedUser ? <TabNav/> : <AuthNav/> }
      </NavigationContainer>
    );
  
};

export default MainNav;