import React, {useState, useEffect} from 'react';
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
  TitleTypeGame,
  ContainerGame,
  ContainerMove,
  TextVs,
  TitleStatus
} from './styles';

import Animated, {useSharedValue, useAnimatedStyle} from 'react-native-reanimated';

import rockIcon from '../../../../assets/rock.png';
import paperIcon from '../../../../assets/paper.png';
import scissorsIcon from '../../../../assets/scissors.png';

import LottieView from 'lottie-react-native';

import Line from '../../../../components/Line';

import go from '../../../../assets/animations/go.json';

const RockPaperScissors = () => {
  const animationRock = useSharedValue(0);
  const animationPaper = useSharedValue(0);
  const animationPaperX = useSharedValue(0);
  const animationScissors = useSharedValue(0);
  const animationScissorsX = useSharedValue(0);

  // rock or paper or scissors
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');

  const animatedStylesRock = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: animationRock.value }]
    }
  });

  function handleAnimationPositionRock() {
    animationScissorsX.value = 0;
    animationScissors.value = 0;
    animationPaper.value = 0;
    animationPaperX.value = 0;

    if (animationRock.value === 0) {
      animationRock.value = -500;
    } else {
      animationRock.value = 0;
    }
  }

  const animatedStylesPaper = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: animationPaper.value }, {translateX: animationPaperX.value}]
    }
  });

  function handleAnimationPositionPaper() {
    animationScissorsX.value = 0;
    animationScissors.value = 0;
    animationRock.value = 0;

    if (animationPaper.value === 0) {
      animationPaper.value = -500;
    } else {
      animationPaper.value = 0;
    }

    if (animationPaperX.value === 0) {
      animationPaperX.value = -110;
    } else {
      animationPaperX.value = 0;
    }
  }

  const animatedStylesScissors = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: animationScissors.value }, {translateX: animationScissorsX.value}]
    }
  });

  function handleAnimationPositionScissors() {
    animationPaper.value = 0;
    animationPaperX.value = 0;
    animationRock.value = 0;

    if (animationScissors.value === 0) {
      animationScissors.value = -500;
    } else {
      animationScissors.value = 0;
    }

    if (animationScissorsX.value === 0) {
      animationScissorsX.value = -230;
    } else {
      animationScissorsX.value = 0;
    }
  }

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

  useEffect(() => {

  }, []);

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


          <ContainerGame>
            <ContainerMove>

              <TextVs>VS</TextVs>

            </ContainerMove>
            <TitleStatus>Aguardando jogador...</TitleStatus>
          </ContainerGame>


          <LottieView source={go} autoPlay loop={false} style={{width: 200, height: 200}} />


          <ContainerSelect>
            <Line bottom={30} top={0}/>
            <SelectMove>
                <Animated.View style={[animatedStylesRock]}>
                  <Move onPress={handleAnimationPositionRock}>
                    <TitleMove>Pedra</TitleMove>
                    <ImageMove source={rockIcon}></ImageMove>
                  </Move>
                </Animated.View>
              <Animated.View style={[animatedStylesPaper]}>
                <Move onPress={handleAnimationPositionPaper}>
                  <TitleMove>Papel</TitleMove>
                  <ImageMove source={paperIcon}></ImageMove>
                </Move>
              </Animated.View>
              <Animated.View style={[animatedStylesScissors]}>
                <Move onPress={handleAnimationPositionScissors}>
                  <TitleMove>Tesoura</TitleMove>
                  <ImageMove source={scissorsIcon}></ImageMove>
                </Move>
              </Animated.View>
            </SelectMove>
          </ContainerSelect>
        </Container>
    </SafeAreaView>
  );
}

export default RockPaperScissors;
