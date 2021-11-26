import React, {useState, useEffect} from 'react';
import { ActivityIndicator, Alert, SafeAreaView } from 'react-native';
import { Container, ContainerWinner, Winner, ContainerCash, Cash, ContainerShowAnimation, ContainerAds } from './styles';
import {useSelector} from 'react-redux';
import LottieView from 'lottie-react-native';
import Coins from '../../../../assets/animations/coins.json';
import ShowCoins from '../../../../assets/animations/show-coins.json';
import {Button} from 'react-native-paper';
import { useBackHandler } from '@react-native-community/hooks';
import api from '../../../../services/api';

import {
  AdMobBanner,
  AdMobRewarded
} from 'react-native-admob'

let winner;
let type;

const FinishedPlay = ({route, navigation}) => {
  const user = useSelector((state) => state.user.profile);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const room = route.params;
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

  function processWinner(rival) {
    if (result === 'Você ganhou') {
      winner = user.id;
      type = 1;
    } else if (result === 'Empate') {
      winner = null;
      type = 2;
    } else if (result === 'Você perdeu') {
      type = 0;
      winner = rival;
    }
  }

  async function dataRoom() {
    try {
      const response = await api.get(`room-information-finished?id=${room.id}`);

      setData(response.data[0]);
      verifyPlayers(response.data[0])
    } catch (error) {

    }
  }

  async function finishedRoom() {
    try {
      await api.put(`delete-room?room=${room.id}`)
    } catch (error) {
      
    }
  }

  async function verifyPlayers(data) {
    let rival;
    try {
      if (user.id !== data.player_punter.id) {
        rival = data.player_punter.id;
      } else if (user.id !== data.player_owner.id) {
        rival = data.player_owner.id;
      }

      processWinner(rival);

      if (user.id === data.player_owner.id) {
        finishedRoom();
        saveHistory(data);
      } else {
        saveMovements(data);
      }

    } catch (error) {

    }
  }

  async function saveHistory(data) {

    try {
      await api.post('history', {
        owner: data.player_owner.id,
        punter: data.player_punter.id,
        winner: winner,
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
        type: type,
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

      setLoading(false);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    dataRoom();

    AdMobRewarded.setAdUnitID('ca-app-pub-3940256099942544/5224354917');
    AdMobRewarded.requestAd().then(() => AdMobRewarded.showAd());
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
        {loading ? (
          <Container>
            <ActivityIndicator color="#000" size="small" />
          </Container>
        ) : (
          <>
          <Container>
            <ContainerAds>
              <AdMobBanner
                style={{marginBottom: 10, marginTop: 5}}
                adSize="banner"
                adUnitID="ca-app-pub-3940256099942544/6300978111"
              />
            </ContainerAds>
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
          </>
        )}
    </SafeAreaView>
  );
}

export default FinishedPlay;
