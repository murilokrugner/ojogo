import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 20px;
  width: auto;
  height: 580px;
  max-height: 620px;
  flex-direction: column;
  justify-content: space-between;
`;

export const ContainerInfoRoom = styled.View`
  flex-direction: column;
  justify-content: space-around;

  height: 70px;

`;

export const Name = styled.Text`
  font-size: 16px;

  color: #000;
`;

export const Value = styled.Text`
  font-size: 16px;

  color: #000;
`;

export const Title = styled.Text`
  font-weight: bold;
  font-size: 16px;

  margin-top: 20px;

  color: #000;
`;

export const ContainerPlayers = styled.View`
  margin-top: 20px;

`;

export const Player = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px;

  height: 80px;

`;
export const Nickname = styled.Text`
  font-size: 15px;

  color: #000;

`;
export const Status = styled.Text`
  font-weight: bold;
  font-size: 16px;

  color: #000;

`;
