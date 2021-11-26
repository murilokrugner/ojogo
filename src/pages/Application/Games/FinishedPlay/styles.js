import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const windowHeight = Dimensions.get('window').height;

export const Container = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;

`;

export const ContainerWinner = styled.View`
  flex-direction: column;
  margin-top: ${(windowHeight - 550).toFixed(0)+'px'};
  align-items: center;

  width: 100%;
  height: 100%;

  margin-bottom: 30px;
`;

export const Winner = styled.Text`
  color: #000;

  font-size: 25px;
  font-weight: bold;
`;

export const ContainerCash = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 60px;
`;

export const Cash = styled.Text`
  color: #000;
  font-size: 20px;
`;

export const ContainerShowAnimation = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-end;

  position: absolute;
  top: ${(windowHeight - 250).toFixed(0)+'px'};
`;

export const ContainerAds = styled.View`
  align-items: center;
  margin-top: 20px;
`;