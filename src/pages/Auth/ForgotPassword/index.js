import React, {useState} from 'react';
import { Alert } from 'react-native';

import { Container } from './styles';

import { TextInput, Button } from 'react-native-paper';

import api from '../../../services/api';

const ForgotPassword = ({}) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    try {
        setLoading(true);

        await api.post('/request-forgot-password', {
            email: email,
        });

        setLoading(false);

        Alert.alert('Senha solicitada com sucesso! verifique seu e-mail');

    } catch (error) {
        Alert.alert('Erro, verifique se o e-mail digitado está correto ou tente novamente mais tarde');
        setLoading(false);
    }
  }

  return (
      <Container>
          <TextInput
            label="E-mail"
            value={email}
            onChangeText={text => setEmail(text)}
            mode={"outlined"}
            keyboardType={'email-address'}
            autoCapitalize={'none'}
            returnKeyType={'send'}
            theme={{
              colors: {
                  placeholder: '#002441', text: '#002441', primary: '#002441',
              }
          }}
          />

          <Button mode="contained" onPress={handleSubmit} color="#002441" loading={loading}>
            Solicitar nova senha
          </Button>

      </Container>
  );
}

export default ForgotPassword;
