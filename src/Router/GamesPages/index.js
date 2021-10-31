import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import EvenOrOdd from '../../pages/Application/Games/EvenOrOdd';

const Stack = createStackNavigator();

export default function Auth() {
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyle: {backgroundColor: '#fff'},
          }}
          initialRouteName="EvenOrOdd"        
          >
          <Stack.Screen name="EvenOrOdd" component={EvenOrOdd} 
            options={{
              headerShown: false,
              headerTitle: '',
              headerBackTitle: 'Voltar',
              headerTintColor: '#fff',
              headerStyle: {
                backgroundColor: '#002441',
              }
            }}
          />      
        </Stack.Navigator>    
      </NavigationContainer>
    );
  }