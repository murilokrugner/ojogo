import React, {useState, useEffect} from 'react';
import { Alert, SafeAreaView } from 'react-native';

import { Container, ContainerWinner, Winner, ContainerCash, Cash, ContainerShowAnimation } from './styles';

import {useSelector} from 'react-redux';

import LottieView from 'lottie-react-native';

import Coins from '../../../../assets/animations/coins.json';
import ShowCoins from '../../../../assets/animations/show-coins.json';

import {Button} from 'react-native-paper';

import { useBackHandler } from '@react-native-community/hooks';

import api from '../../../../services/api';

const FinishedPlay = ({route, navigation}) => {
  const user = useSelector((state) => state.user.profile);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const room = route.params.data;

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

  async function dataRoom() {
    try {
      const response = await api.get(`room-information?id=${room.id}`);

      setData(response.data[0]);

      setLoading(false);

      saveHistory(response.data[0]);

    } catch (error) {

    }
  }

  async function saveHistory(data) {
    try {
      await api.post('history', {
        owner: data.player_owner.id,
        punter: data.player_punter.id,
        winner: result === 'Você ganhou' ? user.id :  data.player_punter.id !== user.id ?  data.player_punter.id :  data.player_owner.id,
        room: data.id,
        value: data.gamesvalues.value,
      });

      saveMovements(data);
    } catch (error) {
    }
  }

  async function saveMovements(data) {
    try {
      const response = await api.post('movements', {
        player: user.id,
        value: data.gamesvalues.value,
        winner: result === 'Você ganhou' ? 1 : 0,
      });

      saveWallet(response.data);

    } catch (error) {
    }
  }

  async function saveWallet(balance) {
    try {
      await api.put('wallet', {
        id: user.id,
        balance: balance,
      });
    } catch (error) {

    }
  }

  useEffect(() => {
    dataRoom();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
        <Container>
          {!loading && (
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
                  <Cash>-{data.gamesvalues.value} moedas</Cash>
                )}
                {result === 'Empate' && (
                  <Cash></Cash>
                )}
                {result === 'Você ganhou' && (
                  <Cash>{data.gamesvalues.value} moedas</Cash>
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
          )}
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
