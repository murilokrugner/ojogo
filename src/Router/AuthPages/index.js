import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SignIn from '../../pages/Auth/SignIn';
import SignUp from '../../pages/Auth/SignUp';

import ForgotPassword from '../../pages/Auth/ForgotPassword';

const Stack = createStackNavigator();

export default function Auth() {
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyle: {backgroundColor: '#fff'},
          }}
          initialRouteName="SignIn"
          >
          <Stack.Screen name="SignUp" component={SignUp}
            options={{
              headerShown: true,
              headerTitle: 'Criar conta',
              headerBackTitle: 'Voltar',
              headerTintColor: '#fff',
              headerStyle: {
                backgroundColor: '#000',
              }
            }}
          />
          <Stack.Screen name="SignIn" component={SignIn}
            options={{
              headerShown: false,
              headerTitle: '',
              headerBackTitle: 'Voltar',
              headerTintColor: '#fff',
              headerStyle: {
                backgroundColor: '#000',
              }
            }}
          />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword}
            options={{
              headerShown: true,
              headerTitle: 'Recuperar senha',
              headerBackTitle: 'Voltar',
              headerTintColor: '#fff',
              headerStyle: {
                backgroundColor: '#000',
              }
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
