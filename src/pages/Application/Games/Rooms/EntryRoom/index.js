import React, {useEffect, useState} from 'react';
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

import NetInfo from '../../../../../functions/NetInfo';

const EntryRoom = ({route, navigation}) => {
  const [loading, setLoading] = useState(true);
  const [information, setInformation] = useState(false);
  const [loadingCanceled, setLoadingCanceled] = useState(false);
  const [canceled, setCanceled] = useState(true);
  const data = route.params;

  const [numberRequest, setNumberRequest] = useState(0);

  useBackHandler(() => {
    if (canceled) {
        return true;
    }
    return false;
  });

  async function handleSubmit() {};

  async function askCanceled() {
    Alert.alert(
      'Sair da sala',
      `Deseja realmente sair dessa sala?`,
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

      await api.delete(`entry-room?id=${data.id}`);

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
              <Nickname>{information[0].player_punter.nickname}</Nickname>
              <Status>Em espera...</Status>
            </Player>
          </ContainerPlayers>

          <Button mode="contained" onPress={handleSubmit} color="#002441" style={{marginTop: 40}}>
            JOGAR
          </Button>

          <Button mode="contained" onPress={askCanceled} color="#000" loading={loadingCanceled} style={{marginTop: 40}}>
            SAIR DA SALA
          </Button>
        </Container>
      )}

    </ScrollView>
  );
}

export default EntryRoom;
