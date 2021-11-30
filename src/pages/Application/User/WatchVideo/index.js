import React, {useEffect, useState} from 'react';
import { Button } from 'react-native';
import {useSelector} from 'react-redux';
import { Container } from './styles';

import {
  AdMobBanner,
  AdMobRewarded
} from 'react-native-admob'

import api from '../../../../services/api';

const WatchVideo = ({navigation}) => {
  const user = useSelector((state) => state.user.profile);
  
  useEffect(() => {  
    AdMobRewarded.requestAd().then(() => AdMobRewarded.showAd());

  }, []);

  async function rewardedCoins() {
    try {
      await api.put(`rewards`, {
        id: user.id,
        balance: 50,
      });

      navigation.goBack();
    } catch (error) {
      navigation.goBack();
      
    }
  }

  return (
    <Container>
      <AdMobBanner
          style={{marginBottom: 10, marginTop: 5}}
          adSize="banner"
          adUnitID="ca-app-pub-4499612911905101/1108175371"
        />

      <Button title="voltar" onPress={rewardedCoins} />
    </Container>
  );
}

export default WatchVideo;