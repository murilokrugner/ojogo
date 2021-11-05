import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { Container, ContainerRooms, TitleRoom, Value, Owner } from './styles';

import { FAB } from 'react-native-paper';

const Rooms = ({navigation}) => {
  return (
    <>
      <ScrollView style={{flex: 1}}>
        <Container>
          <ContainerRooms>
            <TitleRoom>
              Sala: Venha apostar 5 moedas nessa rodada :)
            </TitleRoom>
            <Value>
              Valor da aposta: 5 moedas - taxa de 20%
            </Value>
            <Owner>Dono da sala: Matheuzin$2564</Owner>
          </ContainerRooms>
        </Container>
      </ScrollView>
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
