import React, { useState, useEffect } from 'react';
import { Alert, ScrollView, ActivityIndicator } from 'react-native';

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

import io from 'socket.io-client';

let socket = io('http://192.168.2.108:3333');

const RoomWaiting = ({ route, navigation }) => {
  var sendStatus;

  const [canceled, setCanceled] = useState(true);
  const [information, setInformation] = useState(false);
  const [punter, setPunter] = useState(null);

  useBackHandler(() => {
    if (canceled) {
      return true;
    }
    return false;
  });

  const [loading, setLoading] = useState(true);
  const [loadingCanceled, setLoadingCanceled] = useState(false);

  const data = route.params.data;

  async function askCanceled() {
    if (punter !== null) {
      if (punter[0].player_punter) {
        return;
      }
    }

    Alert.alert('Cancelar sala', `Deseja realmente cancelar essa sala?`, [
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

      await api.delete(`rooms?id=${data.id}&type=1`);

      Alert.alert('Sala cancelada com sucesso!');
      navigation.goBack();
      navigation.goBack();

      setLoadingCanceled(false);
      setCanceled(false);
    } catch (error) {
      Alert.alert(
        'Não foi possível cancelar a sala, tente novamente mais tarde'
      );
      setLoadingCanceled(false);
    }
  }

  async function updateRoomOwnerStart() {
    try {
      await api.put(`room-information-owner?id=${data.id}&status=${true}`);

      navigation.navigate('RockPaperScissors', { data });
    } catch (error) {
      Alert.alert('Não foi possivel dar ok na sala, tente novamente');
    }
  }

  async function handleSubmit() {
    if (punter !== null) {
      if (punter[0].start === true) {
        updateRoomOwnerStart();
      } else {
        Alert.alert('O outro jogador ainda não está pronto');
      }
    }
  }

  async function loadRoomInformation() {
    try {
      const response = await api.get(`room-information?id=${data.id}`);

      setInformation(response.data);

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
    if (!loadingCanceled) {
      socket.on(data.id, (inf) => {
        setPunter(null);
        setPunter(inf);
      });
    }
  }, []);

  return (
    <ScrollView style={{ flex: 1 }}>
      {!loading ? (
        <Container>
          <ContainerInfoRoom>
            <Name>Nome da sala: {data.name}</Name>
            <Value>Aposta: {data.gamesvalues.value} moedas</Value>
          </ContainerInfoRoom>

          <Line top={20} />

          <Title>Jogadores: </Title>

          <ContainerPlayers>
            <Player>
              <Nickname>
                {information[0].player_owner &&
                  information[0].player_owner.nickname}
              </Nickname>

              <Status>Pronto!</Status>
            </Player>

            <Line />

            <Player>
              {punter !== null && (
                <>
                  <Nickname>
                    {punter[0].player_punter &&
                      punter[0].player_punter.nickname}
                  </Nickname>
                  <Status>
                    {punter[0].start ? 'PRONTO' : 'Em espera...'}{' '}
                  </Status>
                </>
              )}
            </Player>
          </ContainerPlayers>

          <Button
            mode="contained"
            onPress={handleSubmit}
            color="#002441"
            loading={loading}
            style={{ marginTop: 40 }}
          >
            JOGAR
          </Button>

          <Button
            mode="contained"
            onPress={askCanceled}
            color="#000"
            loading={loadingCanceled}
            style={{ marginTop: 40 }}
          >
            CANCELAR SALA
          </Button>
        </Container>
      ) : (
        <ActivityIndicator color="#000" size="large" />
      )}
    </ScrollView>
  );
};

export default RoomWaiting;
