import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import RockPaperScissors from '../../pages/Application/Games/RockPaperScissors';

const Stack = createStackNavigator();

export default function Auth() {
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyle: {backgroundColor: '#fff'},
          }}
          initialRouteName="RockPaperScissors"        
          >
          <Stack.Screen name="RockPaperScissors" component={RockPaperScissors} 
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