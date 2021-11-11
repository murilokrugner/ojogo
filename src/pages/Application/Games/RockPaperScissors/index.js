import React, {useState, useEffect} from 'react';
import {Alert, SafeAreaView, Button} from 'react-native';
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
  TitleStatus,
  ContainerBorderMove
} from './styles';

import Animated, {useSharedValue, useAnimatedStyle, withTiming, Easing} from 'react-native-reanimated';

import rockIcon from '../../../../assets/rock.png';
import paperIcon from '../../../../assets/paper.png';
import scissorsIcon from '../../../../assets/scissors.png';

import LottieView from 'lottie-react-native';

import Line from '../../../../components/Line';

import go from '../../../../assets/animations/go.json';

import io from 'socket.io-client';

const RockPaperScissors = () => {
  let socket = io('http://192.168.2.125:3333');

  socket.on("connect", () => {
    console.log(socket.id)
  });

  const animationRock = useSharedValue(0);
  const animationPaper = useSharedValue(0);
  const animationPaperX = useSharedValue(0);
  const animationScissors = useSharedValue(0);
  const animationScissorsX = useSharedValue(0);

  // rock or paper or scissors
  const [round, setRound] = useState(1);
  const [roundOne, setRoundOne] = useState('#fff');
  const [roundTwo, setRoundTwo] = useState('#fff');
  const [roundTree, setRoundTree] = useState('#fff');

  const [move, setMove] = useState(null);
  const [moveRival, setMoveRival] = useState('scissors');

  const [confirm, setConfirm] = useState(false);
  const [confirmRival, setConfirmRival] = useState(true);

  const [playerOk, setPlayerOk] = useState(false);
  const [rivalOk, setRivalOk] = useState(true);

  const [finished, setFinished] = useState(false);
  const [finishedAll, setFinishedAll] = useState(false);
  const [result, setResult] = useState('');

  const [pointsPlayer, setPointsPlayer] = useState(0);
  const [pointsRival, setPointsRival] = useState(0);

  const animatedStylesRock = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withTiming(animationRock.value, {
        duration: 250,
      //  easing: Easing.exp
      }) }]
    }
  });

  function handleAnimationPositionRock() {
    animationScissorsX.value = 0;
    animationScissors.value = 0;
    animationPaper.value = 0;
    animationPaperX.value = 0;

    if (animationRock.value === 0) {
      animationRock.value = -500;
      setMove('rock');
    } else {
      animationRock.value = 0;
      setMove(null);
      setConfirm(false);
    }
  }

  const animatedStylesPaper = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withTiming(animationPaper.value) }, {translateX: withTiming(animationPaperX.value)}]
    }
  });

  function handleAnimationPositionPaper() {
    animationScissorsX.value = 0;
    animationScissors.value = 0;
    animationRock.value = 0;

    if (animationPaper.value === 0) {
      animationPaper.value = -500;
      setMove('paper');
    } else {
      animationPaper.value = 0;
      setMove(null);
      setConfirm(false);
    }

    if (animationPaperX.value === 0) {
      animationPaperX.value = -110;
    } else {
      animationPaperX.value = 0;
    }
  }

  const animatedStylesScissors = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withTiming(animationScissors.value) }, {translateX: withTiming(animationScissorsX.value)}]
    }
  });

  function handleAnimationPositionScissors() {
    animationPaper.value = 0;
    animationPaperX.value = 0;
    animationRock.value = 0;

    if (animationScissors.value === 0) {
      animationScissors.value = -500;
      setMove('scissors');
    } else {
      animationScissors.value = 0;
      setMove(null);
      setConfirm(false);
    }

    if (animationScissorsX.value === 0) {
      animationScissorsX.value = -230;
    } else {
      animationScissorsX.value = 0;
    }
  }

  function processRound(winner) {
    if (round === 1) {
      if (winner === 1) {
        setRoundOne('#4DE022');
      } else if (winner === 0) {
        setRoundOne('#FAF059');
      } else {
        setRoundOne('#FF1717');
      }
    } else if (round === 2) {
      if (winner === 1) {
        setRoundTwo('#4DE022');
      } else if (winner === 0) {
        setRoundTwo('#FAF059');
      } else {
        setRoundTwo('#FF1717');
      }

    } else if (round === 3) {
      if (winner === 1) {
        setRoundTree('#4DE022');
      } else if (winner === 0) {
        setRoundTree('#FAF059');
      } else {
        setRoundTree('#FF1717');
      }
    }

    setFinished(true);
  }


  function handleContinuePlay() {
    setPlayerOk(true);
    setRound(round < 3 && round + 1);

    if (round === 3) {
      processFinishedPlay();
    }

    emptyScrenn();
  }

  function processFinishedPlay() {
    if(pointsPlayer > pointsRival) {
      Alert.alert('Você ganhou a partida!');
    } else if (pointsRival > pointsPlayer) {
      Alert.alert('Você perdeu a partida!');
    } else if (pointsRival === pointsPlayer) {
      Alert.alert('Houve um empate!');
    }

    setFinishedAll(true);
  }

  function emptyScrenn() {
    animationScissorsX.value = 0;
    animationScissors.value = 0;
    animationRock.value = 0;
    animationPaper.value = 0;
    animationPaperX.value = 0;

    setMove(null);
    setConfirm(false);
    setFinished(false);

  }

  function processWinner() {
    if (move === 'rock' && moveRival === 'paper') {
      setResult('Winner player 2');
      setPointsRival(pointsRival + 1);
      processRound(2);
    }
    else if (move === 'paper' && moveRival === 'rock') {
      setResult('Winner player 1');
      setPointsPlayer(pointsPlayer + 1);
      processRound(1);
    }
    else if (move === 'rock' && moveRival === 'scissors') {
      setResult('Winner player 1');
      setPointsPlayer(pointsPlayer + 1);
      processRound(1);
    }
    else if (move === 'scissors' && moveRival === 'rock') {
      setResult('Winner player 2');
      setPointsRival(pointsRival + 1);
      processRound(2);
    }
    else if (move === 'paper' && moveRival === 'scissors') {
      setResult('Winner player 2');
      setPointsRival(pointsRival + 1);
      processRound(2);
    }
    else if (move === 'scissors' && moveRival === 'paper') {
      setResult('Winner player 1');
      setPointsPlayer(pointsPlayer + 1);
      processRound(1);
    }
    else if (move === 'rock' && moveRival === 'rock') {
      setResult('Draw');
      processRound(0);
    }
    else if (move === 'paper' && moveRival === 'paper') {
      setResult('Draw');
      processRound(0);
    }
    else if (move === 'scissors' && moveRival === 'scissors') {
      setResult('Draw');
      processRound(0);
    }
  }

  function confirmMove() {
    if (move !== null) {
      setConfirm(true);
    } else {
      setConfirm(false);
    }

    if (confirmRival) {
      processWinner();
    }
  }

  useEffect(() => {

  }, [confirm, move]);

  return (
    <SafeAreaView style={{flex: 1}}>
        <Container>

          <ContainerStatus>

            <ContainerRound>
              <TitleRound>Rodada {round}</TitleRound>
              <ContainerStatusRound>
                <RoundOne style={{backgroundColor: roundOne}} />
                <RoundTwo style={{backgroundColor: roundTwo}} />
                <RoundTree style={{backgroundColor: roundTree}} />
              </ContainerStatusRound>
            </ContainerRound>

            <ContainerTypeGame>
              <TitleTypeGame>Melhor de 3</TitleTypeGame>
            </ContainerTypeGame>

          </ContainerStatus>


          <ContainerGame>
            <ContainerMove>

              <ContainerBorderMove move={move} />

              <TextVs>VS</TextVs>

              <ContainerBorderMove move={moveRival}>
                <Move onPress={() => {}}>
                  <TitleMove>Tesoura</TitleMove>
                  <ImageMove source={scissorsIcon}></ImageMove>
                </Move>
              </ContainerBorderMove>

            </ContainerMove>


            {finished && (
              <>
                <TitleStatus>{result}</TitleStatus>
                <Button title={"Continuar"} onPress={handleContinuePlay} />
              </>
            )}

            {confirm && !confirmRival && (
              <TitleStatus>Aguardando jogador...</TitleStatus>
            )}

            {!confirm && move !== null && (
              <Button title={"Confirmar jogada"} onPress={confirmMove} />
            )}
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
