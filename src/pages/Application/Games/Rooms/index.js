import React, {useEffect, useState} from 'react';
import { Alert, StyleSheet, FlatList, Button } from 'react-native';
import io from 'socket.io-client';
import { ContainerLoading, Container, ContainerRooms, TitleRoom, Value, Owner } from './styles';

import { FAB } from 'react-native-paper';

import LottieView from 'lottie-react-native';

import api from '../../../../services/api';

import loadingIcon from '../../../../assets/animations/loading.json';

import {useSelector} from 'react-redux';

import {useDispatch} from 'react-redux';
import {signOut} from '../../../../store/modules/auth/actions';

const Rooms = ({navigation}) => {
  let socket = io('http://192.168.2.125:3333');

  const dispatch = useDispatch();

  async function handleSignOut() {
    dispatch(signOut());
  }

  const user = useSelector(state => state.user.profile);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(false);

  socket.on('room', room => {
    setData(false);
    setData(room);
  });

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
      Alert.alert('Não foi possível carregar os dados, tente novamente mais tarde...')
      setLoading(false);

    }
  }

  async function entryRoom(item) {
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
            handleSubmit(item)
          }
        },
      ],
    )
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
      Alert.alert('Não foi possível entrar na sala, tente novamente mais tarde');
      return;
    }
  }

  useEffect(() => {
    loadRooms();
  }, []);

  return (
    <>
        {loading ? (
          <ContainerLoading>
            <LottieView source={loadingIcon} autoPlay loop={false} style={{width: 200, height: 200}} />
          </ContainerLoading>
        ): (
          <>
            {data === null ? (
              <>
                <TitleRoom>Nenhuma sala encontrada</TitleRoom>
              </>
            ) : (
              <Container>
                <FlatList
                  onEndReachedThreshold={0.01}
                  style={{flex: 1}}
                  data={data}
                  renderItem={({item}) => (
                    <ContainerRooms onPress={() => {entryRoom(item)}}>
                      <TitleRoom>
                        Sala: {item.name}
                      </TitleRoom>
                      <Value>
                        Valor da aposta: {item.gamesvalues.value} moedas
                      </Value>
                      <Owner>Dono da sala: {item.player_owner.nickname}</Owner>
                    </ContainerRooms>
                  )}
                  keyExtractor={item => item.id}
                />
                <Button title="SAIR" onPress={handleSignOut} />
              </Container>
            )}
          </>
        )}
      <FAB
          style={styles.fab}
          large
          icon="plus"
          color={'#00325a'}
          fabStyle={{
            backgroundColor: '#fff',
          }}
          onPress={() => {navigation.navigate('CreateRoom')}}
      />

    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 40,
  },
})

export default Rooms;
