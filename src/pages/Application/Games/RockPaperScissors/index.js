import React, { useState, useEffect } from 'react';
import { Alert, SafeAreaView, Button, Dimensions } from 'react-native';
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
  ContainerBorderMove,
  ContainerAds
} from './styles';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import rockIcon from '../../../../assets/rock.png';
import paperIcon from '../../../../assets/paper.png';
import scissorsIcon from '../../../../assets/scissors.png';
import LottieView from 'lottie-react-native';
import Line from '../../../../components/Line';
import go from '../../../../assets/animations/go.json';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import api from '../../../../services/api';
import { ActivityIndicator } from 'react-native-paper';

import { useBackHandler } from '@react-native-community/hooks';

import {
  AdMobBanner,
} from 'react-native-admob'

let socket = io('http://knowledgesoftware.kinghost.net:21022');

let round = 1;
let pointsPlayer = 0;
let pointsRival = 0;
let result = '';

const windowHeight = Dimensions.get('window').height;

const RockPaperScissors = ({ route, navigation }) => {
  const user = useSelector((state) => state.user.profile);

  const data = route.params.data;

  useBackHandler(() => {
    if (true) {
      return true;
    }
    return false;
  });

  const animationRock = useSharedValue(0);
  const animationPaper = useSharedValue(0);
  const animationPaperX = useSharedValue(0);
  const animationScissors = useSharedValue(0);
  const animationScissorsX = useSharedValue(0);

  // rock or paper or scissors
  const [roundOne, setRoundOne] = useState('#fff');
  const [roundTwo, setRoundTwo] = useState('#fff');
  const [roundTree, setRoundTree] = useState('#fff');

  const [move, setMove] = useState(null);
  const [moveRival, setMoveRival] = useState(null);
  const [rivalRound, setRivalRound] = useState(null);

  const [confirm, setConfirm] = useState(false);
  const [confirmRival, setConfirmRival] = useState(false);

  const [playerOk, setPlayerOk] = useState(false);

  const [finished, setFinished] = useState(false);
  const [finishedAll, setFinishedAll] = useState(false);

  const [loadingMove, setLoadingMove] = useState(false);

  const [loadingProcess, setLoadingProcess] = useState(false);

  const animatedStylesRock = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(animationRock.value, {
            duration: 250,
            //  easing: Easing.exp
          }),
        },
      ],
    };
  });

  function handleAnimationPositionRock() {
    if (confirm === true) {
      return;
    }

    animationScissorsX.value = 0;
    animationScissors.value = 0;
    animationPaper.value = 0;
    animationPaperX.value = 0;

    if (animationRock.value === 0) {
      animationRock.value = (windowHeight.toFixed(0) - 265) * -1
      setMove('rock');
    } else {
      animationRock.value = 0;
      setMove(null);
      setConfirm(false);
    }
  }

  const animatedStylesPaper = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: withTiming(animationPaper.value) },
        { translateX: withTiming(animationPaperX.value) },
      ],
    };
  });

  function handleAnimationPositionPaper() {
    if (confirm === true) {
      return;
    }

    animationScissorsX.value = 0;
    animationScissors.value = 0;
    animationRock.value = 0;

    if (animationPaper.value === 0) {
      animationPaper.value = (windowHeight.toFixed(0) - 265) * -1
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
      transform: [
        { translateY: withTiming(animationScissors.value) },
        { translateX: withTiming(animationScissorsX.value) },
      ],
    };
  });

  function handleAnimationPositionScissors() {
    if (confirm === true) {
      return;
    }

    animationPaper.value = 0;
    animationPaperX.value = 0;
    animationRock.value = 0;

    if (animationScissors.value === 0) {
      animationScissors.value = (windowHeight.toFixed(0) - 265) * -1
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
    setLoadingProcess(false);
  }

  function handleContinuePlay() {
    setPlayerOk(true);
    round = round + 1;

    if (round > 3) {
      processFinishedPlay();
    } else {
      emptyScrenn();
    }
  }

  function processFinishedPlay() {
    setFinishedAll(true);

    if (pointsPlayer > pointsRival) {
      result = 'Você ganhou';
    } else if (pointsPlayer === pointsRival) {
      result = 'Empate';
    } else if (pointsPlayer < pointsRival) {
      result = 'Você perdeu';
    }

    round = 1;
    pointsPlayer = 0;
    pointsRival = 0;
    let id = data.id;
    navigation.navigate('FinishedPlay', {id, result});
    result = '';
  }

  function emptyScrenn() {
    animationScissorsX.value = 0;
    animationScissors.value = 0;
    animationRock.value = 0;
    animationPaper.value = 0;
    animationPaperX.value = 0;

    setMove(null);
    setMoveRival(null);
    setConfirm(false);
    setFinished(false);
  }

  function processWinner(move, moveRival) {
    setLoadingProcess(true);
    if (move === 'rock' && moveRival === 'paper') {
      result = 'Você perdeu';
      pointsRival = pointsRival + 1;
      processRound(2);
    } else if (move === 'paper' && moveRival === 'rock') {
      result = 'Você ganhou';
      pointsPlayer = pointsPlayer + 1;
      processRound(1);
    } else if (move === 'rock' && moveRival === 'scissors') {
      result = 'Você ganhou';
      pointsPlayer = pointsPlayer + 1;
      processRound(1);
    } else if (move === 'scissors' && moveRival === 'rock') {
      result = 'Você perdeu';
      pointsRival = pointsRival + 1;
      processRound(2);
    } else if (move === 'paper' && moveRival === 'scissors') {
      result = 'Você perdeu';
      pointsRival = pointsRival + 1;
      processRound(2);
    } else if (move === 'scissors' && moveRival === 'paper') {
      result = 'Você ganhou';
      pointsPlayer = pointsPlayer + 1;
      processRound(1);
    } else if (move === 'rock' && moveRival === 'rock') {
      result = 'Empate';
      processRound(0);
    } else if (move === 'paper' && moveRival === 'paper') {
      result = 'Empate';
      processRound(0);
    } else if (move === 'scissors' && moveRival === 'scissors') {
      result = 'Empate';
      processRound(0);
    }
  }

  function confirmMove() {
    setPlayerOk(false);
    if (move !== null) {
      setConfirm(true);
      sendMove();
    } else {
      setConfirm(false);
    }
  }

  async function sendMove() {
    setLoadingMove(true);
    try {
      const response = await api.post('plays', {
        id_room: data.id,
        player: user.id,
        move: move,
        round: round,
      });

      setLoadingMove(false);
    } catch (error) {
      Alert.alert('Não foi possível registrar sua jogada, tente novamente');
      setLoadingMove(false);
    }
  }

  async function verifyMove(inf) {
    try {
      const me = inf.filter((item) => item.player_id === user.id);
      const rival = inf.filter((item) => item.player_id !== user.id);

      if (rival[0]) {
        setConfirmRival(true);
        setMoveRival(rival[0].move);

        if (rival[0].round !== round) {
          setRivalRound(true);
        } else {
          setRivalRound(false);
        }

      }

      if (me[0]) {
        setMove(me[0].move);
      }

      if (me[0] && rival[0]) {
        processWinner(me[0].move, rival[0].move);
      }
    } catch (error) {
      Alert.alert('Erro ao carregar dados');
    }
  }

  async function loadRoomInformation() {
    try {
      const response = await api.get(`plays?id_room=${data.id}&round=${round}`);

      verifyMove(response.data);
    } catch (error) {
      Alert.alert('Erro ao carregar os dados');
    }
  }

  useEffect(() => {
    loadRoomInformation();
  }, []);

  useEffect(() => {
    socket.on(`plays-${data.id}`, (inf) => {
      verifyMove(inf);
    });
  }, []);

  useEffect(() => {}, [loadingProcess, round]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <ContainerStatus>
          <ContainerRound>
            <TitleRound>Rodada {round}</TitleRound>
            <ContainerStatusRound>
              <RoundOne style={{ backgroundColor: roundOne }} />
              <RoundTwo style={{ backgroundColor: roundTwo }} />
              <RoundTree style={{ backgroundColor: roundTree }} />
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
                {confirm === false && moveRival !== null ? (
                  <TitleMove>OK!</TitleMove>
                ) : (
                  <>
                    {rivalRound ? (
                      <TitleMove>OK!</TitleMove>
                    ) : (
                      <>
                      {confirm === true &&
                        confirmRival === true &&
                        moveRival !== null && (
                          <>
                            {moveRival === 'rock' && <TitleMove>Pedra</TitleMove>}
                            {moveRival === 'paper' && (
                              <TitleMove>Papel</TitleMove>
                            )}
                            {moveRival === 'scissors' && (
                              <TitleMove>Tesoura</TitleMove>
                            )}

                            {moveRival === 'rock' && (
                              <ImageMove source={rockIcon}></ImageMove>
                            )}
                            {moveRival === 'paper' && (
                              <ImageMove source={paperIcon}></ImageMove>
                            )}
                            {moveRival === 'scissors' && (
                              <ImageMove source={scissorsIcon}></ImageMove>
                            )}
                          </>
                        )}
                    </>
                    )}
                  </>
                )}
              </Move>
            </ContainerBorderMove>
          </ContainerMove>

          {loadingProcess ? (
            <ActivityIndicator color="#000" size="small" />
          ) : (
            <>
              {finished && (
                <>
                  <TitleStatus>{result}</TitleStatus>
                  <Button title={'Continuar'} onPress={handleContinuePlay} />
                </>
              )}
            </>
          )}

          {confirm && !moveRival === null && (
            <TitleStatus>Aguardando jogador...</TitleStatus>
          )}

          {move !== null && !confirm && (
            <Button title={'Confirmar jogada'} onPress={confirmMove} />
          )}
        </ContainerGame>

        <LottieView
          source={go}
          autoPlay
          loop={false}
          style={{ width: 200, height: 200 }}
        />

        <ContainerSelect>
          <Line bottom={30} top={0} />
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

      <ContainerAds>
        <AdMobBanner
            style={{marginBottom: 10, marginTop: 5}}
            adSize="banner"
            adUnitID="ca-app-pub-4499612911905101/1108175371"
          />
      </ContainerAds>
    </SafeAreaView>
  );
};

export default RockPaperScissors;
