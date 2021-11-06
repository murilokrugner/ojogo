import React, {useState} from 'react';
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

const RoomWaiting = ({route, navigation}) => {
  const [canceled, setCanceled] = useState(true);

  useBackHandler(() => {
    if (canceled) {
        return true;
    }
    return false;
  });

  const [loading, setLoading] = useState(false);
  const [loadingCanceled, setLoadingCanceled] = useState(false);

  const data = route.params.data;

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

  return (
    <ScrollView style={{flex: 1}}>
      <Container>
        <ContainerInfoRoom>
          <Name>Nome da sala: {data.name}</Name>
          <Value>Aposta: {data.value} moedas</Value>
        </ContainerInfoRoom>

        <Line top={20} />

        <Title>Jogadores: </Title>

        <ContainerPlayers>
          <Player>
            <Nickname>Miathuzin$2227</Nickname>
            <Status>Pronto!</Status>
          </Player>

          <Line />

          <Player>
            <Nickname>Rafs$1611</Nickname>
            <Status>Aguardando...</Status>
          </Player>
        </ContainerPlayers>

        <Button mode="contained" onPress={handleSubmit} color="#002441" loading={loading} style={{marginTop: 40}}>
          JOGAR
        </Button>

        <Button mode="contained" onPress={askCanceled} color="#000" loading={loadingCanceled} style={{marginTop: 40}}>
          CANCELAR SALA
        </Button>
      </Container>
    </ScrollView>
  );
}

export default RoomWaiting;
