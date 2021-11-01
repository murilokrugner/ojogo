import React from 'react';
import { View } from 'react-native';

import { Container } from './styles';

const Line = ({bottom, top}) => {
  return <Container style={{marginBottom: bottom, marginTop: top}} />;
}

export default Line;
