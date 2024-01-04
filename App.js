import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNav from './src/navigation/TabNav';
import { Provider } from 'react-redux';
import {store} from './src/redux/store';
import AuthNav from './src/navigation/AuthNav';
import MainNav from './src/navigation/MainNav';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <MainNav/>
    </Provider>
  );
};

export default App;