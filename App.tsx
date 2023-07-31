/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/views/home-screen';
import SownScreen from './src/views/sown-screen';
import HarvestScreen from './src/views/harvest-screen';
import StoredScreen from './src/views/stored-screen';
import LogisticScreen from './src/views/logistic-screen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomeScreen">
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false, title: "Home"}}/>
          <Stack.Screen name="SownScreen" component={SownScreen} options={{headerShown: true, title: "Siembra"}}/>
          <Stack.Screen name="HarvestScreen" component={HarvestScreen} options={{headerShown: true, title: "Cosecha"}}/>
          <Stack.Screen name="StoredScreen" component={StoredScreen} options={{headerShown: true, title: "Almacenado"}}/>
          <Stack.Screen name="LogisticScreen" component={LogisticScreen} options={{headerShown: true, title: "Logistica"}}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;
