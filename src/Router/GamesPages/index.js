import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Splash from '../../screens/Splash';
import RockPaperScissors from '../../pages/Application/Games/RockPaperScissors';
import Rooms from '../../pages/Application/Games/Rooms';
import CreateRoom from '../../pages/Application/Games/Rooms/CreateRoom';
import RoomWaiting from '../../pages/Application/Games/Rooms/RoomWaiting';
import EntryRoom from '../../pages/Application/Games/Rooms/EntryRoom';

const Stack = createStackNavigator();

export default function Auth() {
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyle: {backgroundColor: '#fff'},
          }}
          initialRouteName="Rooms"
          >
          <Stack.Screen name="Splash" component={Splash}
            options={{
              headerShown: false,
            }}
          />
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
          <Stack.Screen name="Rooms" component={Rooms}
            options={{
              headerShown: true,
              headerTitle: 'Salas',
              headerBackTitle: 'Voltar',
              headerTintColor: '#fff',
              headerStyle: {
                backgroundColor: '#002441',
              }
            }}
          />
          <Stack.Screen name="CreateRoom" component={CreateRoom}
            options={{
              headerShown: true,
              headerTitle: 'Criar sala',
              headerBackTitle: 'Voltar',
              headerTintColor: '#fff',
              headerStyle: {
                backgroundColor: '#002441',
              }
            }}
          />
          <Stack.Screen name="RoomWaiting" component={RoomWaiting}
            options={{
              headerShown: false,
              headerTitle: 'Aguardando...',
              headerBackTitle: 'Voltar',
              headerTintColor: '#fff',
              headerStyle: {
                backgroundColor: '#002441',
              }
            }}
          />
          <Stack.Screen name="EntryRoom" component={EntryRoom}
            options={{
              headerShown: false,
              headerTitle: 'Sala',
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
