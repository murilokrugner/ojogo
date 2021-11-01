import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import App from './App';

import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux'

import './config/ReactotronConfig';
import {store, persistor} from './store';

function index() {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <NavigationContainer>
            <StatusBar barStyle="light-content" backgroundColor={'#002441'} />
            <App />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </>
  );
}

export default index;
