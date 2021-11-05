import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 20px;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const ContainerRooms = styled.TouchableOpacity`
  width: 350px;
  height: 120px;

  border: 0.5px;
  border-radius: 20px;

  margin-bottom: 30px;
`;

export const TitleRoom = styled.Text`
  margin-left: 20px;
  margin-top: 10px;

  font-weight: bold;
  font-size: 16px;
`;

export const Value = styled.Text`
  margin-left: 20px;
  margin-top: 10px;

  font-size: 14px;
`;

export const Owner = styled.Text`
  margin-left: 20px;
  margin-top: 10px;

  font-size: 14px;
`;
