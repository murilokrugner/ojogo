import React, {useState, useEffect} from 'react';
import { Alert, ScrollView } from 'react-native';

import { Container,
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

import {useBackHandler} from '@react-native-community/hooks';

import api from '../../../../../services/api';

import io from 'socket.io-client';

const RoomWaiting = ({route, navigation}) => {
  let socket = io('http://192.168.2.100:3333');

  const [canceled, setCanceled] = useState(true);
  const [information, setInformation] = useState(false);

  useBackHandler(() => {
    if (canceled) {
        return true;
    }
    return false;
  });

  const [loading, setLoading] = useState(true);
  const [loadingCanceled, setLoadingCanceled] = useState(false);

  const data = route.params.data;

  socket.on('join', function(inf) {
		socket.join(data.id);

    setLoading(true);
    setInformation(false);
    setInformation(inf);
    setLoading(false);

	});


  async function askCanceled() {
    Alert.alert(
      'Cancelar sala',
      `Deseja realmente cancelar essa sala?`,
      [
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
            handleCanceled()
          }
        },
      ],
    )
  }

  async function handleCanceled() {
    try {
      setLoadingCanceled(true);

      await api.delete(`rooms?id=${data.id}`);

      Alert.alert('Sala cancelada com sucesso!');
      navigation.goBack();
      navigation.goBack();

      setLoadingCanceled(false);
      setCanceled(false);

    } catch (error) {
      Alert.alert('Não foi possível cancelar a sala, tente novamente mais tarde');
      setLoadingCanceled(false);

    }
  }

  async function handleSubmit() {
    navigation.navigate('RockPaperScissors');
  }

  async function loadRoomInformation() {
    try {
      const response = await api.get(`room-information?id=${data.id}`);

      setInformation(response.data);

      console.log(response.data)

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

  return (
    <ScrollView style={{flex: 1}}>
      {!loading && (
        <Container>
        <ContainerInfoRoom>
          <Name>Nome da sala: {data.name}</Name>
          <Value>Aposta: {data.value} moedas</Value>
        </ContainerInfoRoom>

        <Line top={20} />

        <Title>Jogadores: </Title>

        <ContainerPlayers>
            <Player>
              <Nickname>{information[0].player_owner && information[0].player_owner.nickname}</Nickname>
              <Status>Pronto!</Status>
            </Player>

            <Line />

            <Player>
              <Nickname>{information[0].player_punter && information[0].player_punter.nickname}</Nickname>
              <Status>{information[0].player_punter ? 'Em espera...' : 'Aguarde um jogador entrar na sala...'} </Status>
            </Player>
          </ContainerPlayers>

        <Button mode="contained" onPress={handleSubmit} color="#002441" loading={loading} style={{marginTop: 40}}>
          JOGAR
        </Button>

        <Button mode="contained" onPress={askCanceled} color="#000" loading={loadingCanceled} style={{marginTop: 40}}>
          CANCELAR SALA
        </Button>
      </Container>
      )}
    </ScrollView>
  );
}

export default RoomWaiting;
