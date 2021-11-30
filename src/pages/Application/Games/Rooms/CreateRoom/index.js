import React, {useEffect, useState} from 'react';
import { Alert } from 'react-native';

import { Container, ContainerPicker, TitlePicker } from './styles';

import { TextInput, Button } from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';

import api from '../../../../../services/api';

import {useSelector} from 'react-redux';

import {
  AdMobBanner,
} from 'react-native-admob'

const CreateRoom = ({navigation}) => {
  const user = useSelector(state => state.user.profile);

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');

  const [colorName, setColorName] = useState('#002441');

  const [selectedValue, setSelectedValue] = useState('5');

  const [balance, setBalance] = useState();

  function handleValidateForm() {
    if (name === '') {
      setColorName('#E31F0B');
      return; 
    } else {
      setColorName('#002441');
      verifyBalance();
    }
  };

  function verifyBalance() {
    if (balance < parseInt(selectedValue) || balance === 0) {
      Alert.alert('Você não possui saldo suficiente');
      return;
    } else {
      createNewRoom();
    }
  }

  async function createNewRoom() {
    try {
      setLoading(true);

      let value;

      if (selectedValue === '5') {
        value = 1;
      } else if (selectedValue === '10') {
        value = 2;
      } else if (selectedValue === '20') {
        value = 3;
      } else if (selectedValue === '50') {
        value = 4;
      } else if (selectedValue === '100') {
        value = 5;
      }

      const response = await api.post('rooms', {
        name: name.toUpperCase(),
        type: 1,
        player_id_owner: user.id,
        player_id_punter: null,
        player_id_winner: null,
        gamesvalues_id: value,
        finished: false
      });

      Alert.alert('Sala criada com sucesso!');

      const data = {
        id: response.data.id,
        name: name,
        gamesvalues: {
          value: selectedValue,
        }
      }

      handleSubmit(data);

    } catch (error) {
      Alert.alert('Não foi possível criar a sala, tente novamente mais tarde!');
      setLoading(false);

    }
  }

  async function loadBalance() {
    try {
      const response = await api.get(`wallet?id=${user.id}`);

      setBalance(response.data.balance);

    } catch (error) {
      Alert.alert('Erro ao carregar dados...');
    }
  }

  async function handleSubmit(data) {
    setLoading(false);

    navigation.navigate('RoomWaiting', {data});
  }

  useEffect(() => {
    loadBalance();
  }, []);

  return (
    <Container>

      <TextInput
          label="Nome da sala"
          value={name}
          onChangeText={text => setName(text)}
          mode={"outlined"}
          returnKeyType={'next'}
          theme={{
            colors: {
                placeholder: colorName, text: colorName, primary: colorName,
            }
        }}
      />

      <ContainerPicker>
        <TitlePicker>Valor da aposta: </TitlePicker>

        <Picker
          selectedValue={selectedValue}
          itemStyle={{color: '#000', fontSize: 14, fontWeight: 'bold', backgroundColor: '#fff'}}
          mode="dropdown"
          dropdownIconColor={'#000'}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedValue(itemValue)
          }>
          <Picker.Item label="5 moedas" value="5"  key="1" style={{color: '#000', backgroundColor: '#fff'}}/>
          <Picker.Item label="10 moedas" value="10" key="2" style={{color: '#000', backgroundColor: '#fff'}}/>
          <Picker.Item label="20 moedas" value="20" key="3" style={{color: '#000', backgroundColor: '#fff'}}/>
          <Picker.Item label="50 moedas" value="50" key="4" style={{color: '#000', backgroundColor: '#fff'}}/>
          <Picker.Item label="100 moedas" value="100" key="5" style={{color: '#000', backgroundColor: '#fff'}}/>
        </Picker>
      </ContainerPicker>

      <Button mode="contained" onPress={handleValidateForm} color="#002441" loading={loading}>
        Criar sala
      </Button>

      <AdMobBanner
        adSize="banner"
        adUnitID="ca-app-pub-4499612911905101/1108175371"
      />
    </Container>
  );
}

export default CreateRoom;
