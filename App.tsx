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
import ContactScreen from './src/views/contact-screen';
import { Amplify } from 'aws-amplify';

import awsConfig from './aws-config.json';
import ChangePasswordScreen from './src/views/change-password-screen';

Amplify.configure({
    Auth: {
        region: awsConfig.region,
        userPoolId: awsConfig.userPoolId,
        userPoolWebClientId: awsConfig.userPoolWebClientId,
        identityPoolId: awsConfig.identityPoolId
    }
});

const Stack = createNativeStackNavigator();

const App = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="GreetingScreen">
          <Stack.Screen name="GreetingScreen" component={GreetingScreen} options={{headerShown: false, title: "GreetingScreen"}}/>
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false, title: "Login"}}/>
          <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} options={{headerShown: false, title: "ChangePasswordScreen"}}/>
          <Stack.Screen name="ContactScreen" component={ContactScreen} options={{headerShown: true, title: "Contact"}}/>
          <Stack.Screen name="MainScreen" component={MainScreen} options={{headerShown: false, title: "Main"}}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;
