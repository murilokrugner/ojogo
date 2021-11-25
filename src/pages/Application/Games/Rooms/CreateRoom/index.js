import React, {useState} from 'react';
import { Alert } from 'react-native';

import { Container, ContainerPicker, TitlePicker } from './styles';

import { TextInput, Button } from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';

import api from '../../../../../services/api';

import {useSelector} from 'react-redux';

const CreateRoom = ({navigation}) => {
  const user = useSelector(state => state.user.profile);

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');

  const [colorName, setColorName] = useState('#002441');

  const [selectedValue, setSelectedValue] = useState('5');

  function handleValidateForm() {
    if (name === '') {
      setColorName('#E31F0B');
      return; 
    } else {
      setColorName('#002441');
      createNewRoom();
    }
  };

  async function createNewRoom() {
    try {
      setLoading(true);

      const response = await api.post('rooms', {
        name: name.toUpperCase(),
        type: 1,
        player_id_owner: user.id,
        player_id_punter: null,
        player_id_winner: null,
        gamesvalues_id: 1,
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

  async function handleSubmit(data) {
    setLoading(false);

    navigation.navigate('RoomWaiting', {data});
  }

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
          <Picker.Item label="5 moedas" value="5"  key="5" style={{color: '#000', backgroundColor: '#fff'}}/>
          <Picker.Item label="10 moedas" value="10" key="10" style={{color: '#000', backgroundColor: '#fff'}}/>
          <Picker.Item label="20 moedas" value="20" key="20" style={{color: '#000', backgroundColor: '#fff'}}/>
          <Picker.Item label="50 moedas" value="50" key="50" style={{color: '#000', backgroundColor: '#fff'}}/>
          <Picker.Item label="100 moedas" value="100" key="100" style={{color: '#000', backgroundColor: '#fff'}}/>
        </Picker>
      </ContainerPicker>

      <Button mode="contained" onPress={handleValidateForm} color="#002441" loading={loading}>
        Criar sala
      </Button>
    </Container>
  );
}

export default CreateRoom;
