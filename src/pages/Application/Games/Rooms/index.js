import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, FlatList, Button } from 'react-native';
import io from 'socket.io-client';
import {
  ContainerLoading,
  Container,
  ContainerRooms,
  TitleRoom,
  Value,
  Owner,
  ContainerAds
} from './styles';

import { FAB } from 'react-native-paper';

import LottieView from 'lottie-react-native';

import api from '../../../../services/api';

import loadingIcon from '../../../../assets/animations/loading.json';

import { useSelector } from 'react-redux';

let socket = io('http://knowledgesoftware.kinghost.net:21022');

import { useIsFocused } from '@react-navigation/native';

import {
  AdMobBanner,
} from 'react-native-admob'

const Rooms = ({ navigation }) => {
  const isFocused = useIsFocused();

  const user = useSelector((state) => state.user.profile);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(false);

  const [balance, setBalance] = useState();

  async function loadBalance() {
    try {
      const response = await api.get(`wallet?id=${user.id}`);

      setBalance(response.data.balance);

    } catch (error) {
    }
  }

  async function loadRooms() {
    try {
      const response = await api.get('rooms');

      if (response.data.length === 0) {
        setData(null);
      } else {
        setData(response.data);
      }

      setLoading(false);
    } catch (error) {
      Alert.alert(
        'Não foi possível carregar os dados, tente novamente mais tarde...'
      );
      setLoading(false);
    }
  }

  async function entryRoom(item) {
    if (balance < item.gamesvalues.value || balance === 0) {
      Alert.alert('Você não possui saldo suficiente');
      return;
    }

    Alert.alert(
      'Entrar na sala?',
      `${item.player_owner.nickname} valendo ${item.gamesvalues.value} moedas?`,
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
            handleSubmit(item);
          },
        },
      ]
    );
  }

  async function deleteRooms() {
    await api.delete(`delete-room?player=${user.id}`);
  }

  async function handleSubmit(item) {
    try {
      await api.put('entry-room', {
        player: user.id,
        id_room: item.id,
      });

      navigation.navigate('EntryRoom', item);

      Alert.alert('Você entrou na sala');
    } catch (error) {
      Alert.alert(
        'Não foi possível entrar na sala, tente novamente mais tarde'
      );
      return;
    }
  }

  useEffect(() => {
    socket.on('room', (room) => {
      setLoading(true);
      setData(false);
      setData(room);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    loadRooms();
    if (user) {
      loadBalance();
      deleteRooms();
    }
  }, [user, isFocused]);

  return (
    <>
      {loading ? (
        <ContainerLoading>
          <LottieView
            source={loadingIcon}
            autoPlay
            loop={false}
            style={{ width: 200, height: 200 }}
          />
        </ContainerLoading>
      ) : (
        <>
          {data === null || data === undefined || data.length === 0 ? (
            <>
              <TitleRoom>Nenhuma sala encontrada</TitleRoom>
            </>
          ) : (
            <Container>
              <FlatList
                onEndReachedThreshold={0.01}
                style={{ flex: 1 }}
                data={data}
                renderItem={({ item }) => (
                  <ContainerRooms
                    onPress={() => {
                      entryRoom(item);
                    }}
                  >
                    <TitleRoom>Sala: {item.name}</TitleRoom>
                    <Value>
                      Valor da aposta: {item.gamesvalues.value} moedas
                    </Value>
                    <Owner>Dono da sala: {item.player_owner.nickname}</Owner>
                  </ContainerRooms>
                )}
                keyExtractor={(item) => item.id}
              />    
                <ContainerAds>
                  <AdMobBanner
                      adSize="banner"
                      adUnitID="ca-app-pub-4499612911905101/1108175371"
                    />
                </ContainerAds>          
            </Container>
          )}
        </>
      )}
      <FAB
        style={styles.fab}
        large
        icon="plus"
        color={'#fff'}
        fabStyle={{
          backgroundColor: '#fff',
        }}
        onPress={() => {
          navigation.navigate('CreateRoom');
        }}
      />        
      
    </>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 70,
    backgroundColor: '#00325a',
  },
});

export default Rooms;
