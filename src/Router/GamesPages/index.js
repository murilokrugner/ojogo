import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Splash from '../../screens/Splash';
import RockPaperScissors from '../../pages/Application/Games/RockPaperScissors';
import Rooms from '../../pages/Application/Games/Rooms';
import CreateRoom from '../../pages/Application/Games/Rooms/CreateRoom';
import RoomWaiting from '../../pages/Application/Games/Rooms/RoomWaiting';
import EntryRoom from '../../pages/Application/Games/Rooms/EntryRoom';
import FinishedPlay from '../../pages/Application/Games/FinishedPlay';
import WatchVideo from '../../pages/Application/User/WatchVideo';

const Stack = createStackNavigator();

import ProfileHeader from '../../components/ProfileHeader';

import Profile from '../../pages/Application/User/Profile';

import eu from '../../assets/eu.png';

export default function Games() {
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
              headerBackTitle: 'Voltar',
              headerTintColor: '#fff',
              headerStyle: {
                backgroundColor: '#002441',
              },
              headerTitle: (props) => <ProfileHeader title={"Salas"} image={eu} screen={'Profile'}/>
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
          <Stack.Screen name="FinishedPlay" component={FinishedPlay}
            options={{
              headerShown: false,
              headerTitle: '',
              headerBackTitle: '',
              headerTintColor: '#fff',
              headerStyle: {
                backgroundColor: '#002441',
              }
            }}
          />
          <Stack.Screen name="Profile" component={Profile}
            options={{
              headerShown: true,
              headerTitle: 'Meu perfil',
              headerBackTitle: '',
              headerTintColor: '#fff',
              headerStyle: {
                backgroundColor: '#002441',
              }
            }}
          />
          <Stack.Screen name="WatchVideo" component={WatchVideo}
            options={{
              headerShown: false,
              headerTitle: '',
              headerBackTitle: '',
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
