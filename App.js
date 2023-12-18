import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNav from './src/navigation/TabNav';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <TabNav/>
    </NavigationContainer>
  );
};

export default App;