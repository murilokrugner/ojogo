import React, {useState} from 'react';
import {Alert, SafeAreaView} from 'react-native';
import {
  Container,
  ContainerSelect,
  SelectMove,
  Move,
  TitleMove,
  ImageMove,
  ContainerStatus,
  ContainerRound,
  TitleRound,
  ContainerStatusRound,
  RoundOne,
  RoundTwo,
  RoundTree,
  ContainerTypeGame,
  TitleTypeGame
} from './styles';

import rockIcon from '../../../../assets/rock.png';
import paperIcon from '../../../../assets/paper.png';
import scissorsIcon from '../../../../assets/scissors.png';

import LottieView from 'lottie-react-native';

import Line from '../../../../components/Line';

import go from '../../../../assets/animations/go.json';

const RockPaperScissors = () => {
  // rock or paper or scissors
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');

  function processWinner() {
    if (player1 === 'rock' && player2 === 'paper') {
      console.log('Winner player 2');
    }
    else if (player1 === 'paper' && player2 === 'rock') {
      console.log('Winner player 1');
    }
    else if (player1 === 'rock' && player2 === 'scissors') {
      console.log('Winner player 1');
    }
    else if (player1 === 'scissors' && player2 === 'rock') {
      console.log('Winner player 2');
    }
    else if (player1 === 'paper' && player2 === 'scissors') {
      console.log('Winner player 2');
    }
    else if (player1 === 'scissors' && player2 === 'paper') {
      console.log('Winner player 1');
    }
    else if (player1 === 'rock' && player2 === 'rock') {
      console.log('Draw');
    }
    else if (player1 === 'paper' && player2 === 'paper') {
      console.log('Draw');
    }
    else if (player1 === 'scissors' && player2 === 'scissors') {
      console.log('Draw');
    }
  }

  return (
    <SafeAreaView style={{flex: 1}}>
        <Container>

          <ContainerStatus>

            <ContainerRound>
              <TitleRound>Rodada 3</TitleRound>
              <ContainerStatusRound>
                <RoundOne style={{backgroundColor: '#FF1717'}} />
                <RoundTwo style={{backgroundColor: '#4DE022'}} />
                <RoundTree style={{backgroundColor: '#FAF059'}} />
              </ContainerStatusRound>
            </ContainerRound>

            <ContainerTypeGame>
              <TitleTypeGame>Melhor de 3</TitleTypeGame>
            </ContainerTypeGame>

          </ContainerStatus>

          <LottieView source={go} autoPlay loop style={{width: 200, height: 200}} />

          <ContainerSelect>
            <Line bottom={30} top={0}/>
            <SelectMove>
              <Move>
                <TitleMove>Pedra</TitleMove>
                <ImageMove source={rockIcon}></ImageMove>
              </Move>
              <Move>
                <TitleMove>Papel</TitleMove>
                <ImageMove source={paperIcon}></ImageMove>
              </Move>
              <Move>
                <TitleMove>Tesoura</TitleMove>
                <ImageMove source={scissorsIcon}></ImageMove>
              </Move>
            </SelectMove>
          </ContainerSelect>
        </Container>
    </SafeAreaView>
  );
}

export default RockPaperScissors;
