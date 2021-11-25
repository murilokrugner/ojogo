import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 20px;
  width: auto;
  height: 550px;
  flex-direction: column;
  justify-content: space-between;

  margin-top: 50px;
`;

export const ContainerLogo = styled.View`
  justify-content: center;
  align-items: center;

  width: 100%;
  height: auto;
`;

export const Logo = styled.Image`
  width: 150px;
  height: 150px;

  border-radius: 50px;
`;

export const ButtonForgotPassword = styled.TouchableOpacity`
  margin-top: 30px;
`;

export const TextForgotPassword = styled.Text`
  color: #000;
  font-size: 16px;
  font-weight: bold;

`;
