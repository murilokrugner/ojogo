import React from 'react';
import { SafeAreaView } from 'react-native';

import { Container, ContainerWinner, Winner, ContainerCash, Cash, ContainerShowAnimation } from './styles';

import {useSelector} from 'react-redux';

import LottieView from 'lottie-react-native';

import Coins from '../../../../assets/animations/coins.json';
import ShowCoins from '../../../../assets/animations/show-coins.json';

import {Button} from 'react-native-paper';

const FinishedPlay = ({route, navigation}) => {
  const user = useSelector((state) => state.user.profile);

  const data = route.params.data;

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
            <Winner>Você ganhou!!!</Winner>
            <ContainerCash>
            <LottieView
                source={Coins}
                autoPlay
                loop={true}
                style={{ width: 50, height: 50 }}
              />
              <Cash>5 moedas</Cash>
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
