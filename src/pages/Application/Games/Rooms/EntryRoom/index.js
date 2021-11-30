import React, { useEffect, useState } from 'react';
import { Alert, ScrollView } from 'react-native';

import {
  Container,
  ContainerInfoRoom,
  Name,
  Value,
  Title,
  ContainerPlayers,
  Player,
  Nickname,
  Status,
} from './styles';

import Line from '../../../../../components/Line';

import { Button } from 'react-native-paper';

import { useBackHandler } from '@react-native-community/hooks';

import api from '../../../../../services/api';

import NetInfo from '../../../../../functions/NetInfo';

import io from 'socket.io-client';

let socket = io('http://knowledgesoftware.kinghost.net:21022');

import { useSelector } from 'react-redux';

import {
  AdMobBanner,
} from 'react-native-admob'

const EntryRoom = ({ route, navigation }) => {
  const user = useSelector((state) => state.user.profile);

  var sendStatus;
  const [loading, setLoading] = useState(true);
  const [information, setInformation] = useState(false);
  const [loadingStart, setLoadingStart] = useState(false);
  const [loadingCanceled, setLoadingCanceled] = useState(false);
  const [canceled, setCanceled] = useState(true);
  const [status, setStatus] = useState(false);
  const data = route.params;

  const [punter, setPunter] = useState(null);

  const [numberRequest, setNumberRequest] = useState(0);

  useBackHandler(() => {
    if (canceled) {
      return true;
    }
    return false;
  });

  async function handleSubmit() {
    try {
      setLoadingStart(true);

      sendStatus = status === false ? true : false;

      await api.put(`room-information?id=${data.id}&status=${sendStatus}`);

      setStatus(status === false ? true : false);

      setLoadingStart(false);
    } catch (error) {
      Alert.alert('Não foi possivel dar ok na sala, tente novamente');
      setLoadingStart(false);
    }
  }

  async function askCanceled() {
    sendStatus = status === false ? true : false;

    if (sendStatus === false) {
      return;
    }

    Alert.alert('Sair da sala', `Deseja realmente sair dessa sala?`, [
      {
        text: 'Não',
        onPress: () => {
          return;
        },
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: () => {
          handleCanceled();
        },
      },
    ]);
  }

  async function handleCanceled() {
    try {
      setLoadingCanceled(true);

      await api.delete(`entry-room?id=${data.id}&type=0`);

      Alert.alert('Você saiu da sala!');
      navigation.goBack();

      setLoadingCanceled(false);
      setCanceled(false);
    } catch (error) {
      Alert.alert('Não foi possível sair da sala, tente novamente mais tarde');
      setLoadingCanceled(false);
    }
  }

  async function loadRoomInformation() {
    try {
      const response = await api.get(`room-information?id=${data.id}`);

      setInformation(response.data);
      setPunter(response.data);

      setLoading(false);
    } catch (error) {
      setNumberRequest(numberRequest + 1);
      if (numberRequest <= 3) {
        loadRoomInformation();
      } else {
        handleCanceled();
      }
    }
  }

  useEffect(() => {
    loadRoomInformation();
  }, []);

  useEffect(() => {
    socket.on(`${data.id}`, (inf) => {
      setPunter(false);
      setPunter(inf);

      if (inf) {
        if (inf[0].start_owner === true) {
          navigation.navigate('RockPaperScissors', { data });
        }
      }
    });
  }, []);

  return (
    <ScrollView style={{ flex: 1 }}>
      {loading ? (
        <></>
      ) : (
        <Container>
          <ContainerInfoRoom>
            <Name>Nome da sala: {data.name}</Name>
            <Value>Aposta: {data.gamesvalues.value} moedas</Value>
          </ContainerInfoRoom>

          <Line top={20} />

          <Title>Jogadores: </Title>

          <ContainerPlayers>
            <Player>
              <Nickname>{information[0].player_owner.nickname}</Nickname>
              <Status>Pronto!</Status>
            </Player>

            <Line />
            <Player>
              <Nickname>{user.nickname}</Nickname>
              <Status>{status ? 'PRONTO' : 'Em espera...'}</Status>
            </Player>
          </ContainerPlayers>

          <Button
            mode="contained"
            onPress={handleSubmit}
            color="#002441"
            style={{ marginTop: 40 }}
            loading={loadingStart}
          >
            {status ? `CANCELAR PRONTO` : `JOGAR`}
          </Button>

          <Button
            mode="contained"
            onPress={askCanceled}
            color="#000"
            loading={loadingCanceled}
            style={{ marginTop: 40 }}
          >
            SAIR DA SALA
          </Button>

          <AdMobBanner
            style={{marginTop: 30}}
            adSize="banner"
            adUnitID="ca-app-pub-4499612911905101/1108175371"
          />
        </Container>
      )}
    </ScrollView>
  );
};

export default EntryRoom;
