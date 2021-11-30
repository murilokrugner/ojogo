import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  height: 100%;
  width: 100%;

  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const ContainerSelect = styled.View`
  padding: 20px;
  width: 100%;
`;

export const SelectMove = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const Move = styled.TouchableOpacity`
  height: 120px;
  align-items: center;
  justify-content: space-between;

  border: 0.3px;
  border-radius: 10px;

  padding: 20px;

  width: 100px;
`;

export const TitleMove = styled.Text`
  font-size: 16px;
  font-family: 'Helvetica';

  color: #000;
`;

export const ImageMove = styled.Image`
  width: 48px;
  height: 48px;
`;

export const ContainerStatus = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80px;
`;

export const ContainerRound = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100px;

  margin-left: 5px;
`;

export const TitleRound = styled.Text`
  font-size: 14px;
  margin-bottom: 8px;

  color: #000;
`;

export const ContainerStatusRound = styled.View`
  flex-direction: row;
  justify-content: space-around;

  width: 100px;
`;

export const RoundOne = styled.View`
  width: 15px;
  height: 18px;
  background-color: #000;

  border-radius: 100px;

  border: 0.3px;
`;

export const RoundTwo = styled.View`
  width: 15px;
  height: 18px;
  background-color: #000;

  border-radius: 100px;
  border: 0.3px;
`;

export const RoundTree = styled.View`
  width: 15px;
  height: 18px;
  background-color: #000;

  border-radius: 100px;
  border: 0.3px;
`;

export const ContainerTypeGame = styled.View`
  margin-right: 25px;
  justify-content: center;
  align-items: center;

  border: 0.2px;
  border-radius: 50px;

  padding: 12px;
`;

export const TitleTypeGame = styled.Text`

  font-size: 14px;

  color: #000;
`;


export const ContainerGame = styled.View`
  width: 100%;
  justify-content: space-between;
  align-items: center;
  height: 200px;



`;

export const ContainerMove = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 330px;
`;

export const TextVs = styled.Text`
  color: #000;
`;

export const TitleStatus = styled.Text`
  font-size: 16px;
  font-weight: bold;

  color: #000;
`;

export const ContainerBorderMove = styled.View`
  height: 120px;
  align-items: center;
  justify-content: space-between;

  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  border: ${props => props.move === null ? "0.3px" : "0px"};
  border-radius: 10px;

  padding: 50px;

  width: 90px;


`;

export const ContainerAds = styled.View`
  align-items: center;
`;
