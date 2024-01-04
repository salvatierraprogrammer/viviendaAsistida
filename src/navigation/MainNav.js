import { View, Text } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNav from './AuthNav';
import TabNav from './TabNav';
const MainNav = () => {
  
  const user = ""

  return (
    <NavigationContainer>
      { user ? <TabNav/> : <AuthNav/> }
    </NavigationContainer>
    );
  
};

export default MainNav;