import React, {useState} from 'react';
import { SafeAreaView, ScrollView } from 'react-native';

import { TextInput, Button } from 'react-native-paper';

import { Container, ContainerLogo, Logo, ButtonForgotPassword, TextForgotPassword } from './styles';

import { useDispatch, useSelector } from 'react-redux';
import { signInRequest } from '../../../store/modules/auth/actions';

import jogoImage from '../../../assets/jogo.png';

const SignIn = ({navigation}) => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit() {
    dispatch(signInRequest(email, password));
  }

  return (
    <SafeAreaView style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
        <Container>
          <ContainerLogo>
            <Logo source={jogoImage}/>
          </ContainerLogo>
          <TextInput
                  label="E-mail"
                  value={email}
                  onChangeText={text => setEmail(text)}
                  mode={"outlined"}
                  keyboardType={'email-address'}
                  returnKeyType={'next'}
                  autoCapitalize='none'
                  theme={{
                    colors: {
                        placeholder: '#002441', text: '#002441', primary: '#002441',
                    }
                }}
                />
                <TextInput
                  label="Senha"
                  value={password}
                  onChangeText={text => setPassword(text)}
                  secureTextEntry={true}
                  mode={"outlined"}
                  returnKeyType={'next'}
                  theme={{
                    colors: {
                        placeholder: '#002441', text: '#002441', primary: '#002441',
                    }
                  }}
                />
            <Button mode="contained" onPress={handleSubmit} color="#002441" loading={loading}>
              Entrar
            </Button>

            <Button mode="contained" onPress={() => {navigation.navigate('SignUp')}} color="#000" >
              Criar conta
            </Button>

            <ButtonForgotPassword onPress={() => {navigation.navigate('ForgotPassword')}}>
              <TextForgotPassword>Esqueci a senha :(</TextForgotPassword>
            </ButtonForgotPassword>

        </Container>
      </ScrollView>
    </SafeAreaView>
  );
}

export default SignIn;
