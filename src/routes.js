import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import Auth from './Router/Auth';
import Application from './Router/Application';

export default function Routes({signed}) {
  return (
    <NavigationContainer independent={1}>
      {signed ? <Application /> : <Application />}
    </NavigationContainer>
  );
}

