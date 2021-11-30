import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  width: 100%;
  height: auto;

  justify-content: space-between;
  align-items: center;
`;

export const Balance = styled.Text`
  color: #fff;
  font-size: 14px;
`;

export const ContainerUser = styled.View`
  flex-direction: row;
  width: 210px;
  justify-content: space-around;

  align-items: center;
`;

export const TitleScreen = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 22px;
`;

export const ButtonImage = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
`;

export const ImageProfile = styled.Image`
  width: 38px;
  height: 38px;

  border-radius: 20px;
`;
