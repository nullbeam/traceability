/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/views/login-screen';
import GreetingScreen from './src/views/greeting-screen';
import MainScreen from './src/views/main-screen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="GreetingScreen">
          <Stack.Screen name="GreetingScreen" component={GreetingScreen} options={{headerShown: false, title: "GreetingScreen"}}/>
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false, title: "Login"}}/>
          <Stack.Screen name="MainScreen" component={MainScreen} options={{headerShown: false, title: "Main"}}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;
