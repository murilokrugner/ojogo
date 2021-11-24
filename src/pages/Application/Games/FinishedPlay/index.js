import React from 'react';
import { SafeAreaView } from 'react-native';

import { Container, ContainerWinner, Winner, ContainerCash, Cash, ContainerShowAnimation } from './styles';

import {useSelector} from 'react-redux';

import LottieView from 'lottie-react-native';

import Coins from '../../../../assets/animations/coins.json';
import ShowCoins from '../../../../assets/animations/show-coins.json';

import {Button} from 'react-native-paper';

import { useBackHandler } from '@react-native-community/hooks';

const FinishedPlay = ({route, navigation}) => {
  const user = useSelector((state) => state.user.profile);

  const data = route.params.data;

  const result = route.params.result;

  useBackHandler(() => {
    if (true) {
      return true;
    }
    return false;
  });

  function Continue() {
    navigation.goBack();
    navigation.goBack();
    navigation.goBack();
    navigation.goBack();
  }

  return (
    <SafeAreaView style={{flex: 1}}>
        <Container>
          <ContainerWinner>
            <Winner>{result}</Winner>
            <ContainerCash>
            {result !== 'Empate' && (
                <LottieView
                  source={Coins}
                  autoPlay
                  loop={true}
                  style={{ width: 50, height: 50 }}
                />
              )}
              {result === 'Você perdeu' && (
                <Cash>-{data.value ? data.value : data.gamesvalues.value} moedas</Cash>
              )}
              {result === 'Empate' && (
                <Cash></Cash>
              )}
              {result === 'Você ganhou' && (
                <Cash>{data.value ? data.value : data.gamesvalues.value} moedas</Cash>
              )}
            </ContainerCash>
            <Button
              mode="contained"
              onPress={Continue}
              color="#002441"
              style={{ marginTop: 40 }}
            >
              Continuar
            </Button>
          </ContainerWinner>
        </Container>
        <ContainerShowAnimation>
          <LottieView
            source={ShowCoins}
            autoPlay
            loop={true}
            style={{ width: 100, height: 300 }}
          />
          <LottieView
            source={ShowCoins}
            autoPlay
            loop={true}
            style={{ width: 100, height: 300 }}
          />
          <LottieView
            source={ShowCoins}
            autoPlay
            loop={true}
            style={{ width: 100, height: 300 }}
          />
        </ContainerShowAnimation>
    </SafeAreaView>

  );
}

export default FinishedPlay;
