import React, {useState} from 'react';
import { Alert, ScrollView } from 'react-native';

import { Container } from './styles';

import { TextInput, Button } from 'react-native-paper';
import TextInputMask from 'react-native-text-input-mask';

import { cpf } from 'cpf-cnpj-validator';

import api from '../../../services/api';

const SignUp = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [document, setDocument] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const [colorName, setColorName] = useState('#002441');
  const [colorNickname, setColorNickname] = useState('#002441');
  const [colorEmail, setColorEmail] = useState('#002441');
  const [colorPass, setColorPass] = useState('#002441');
  const [colorPass2, setColorPass2] = useState('#002441');
  const [colorDocument, setColorDocument] = useState('#002441');

  function validDocument() {
    if (cpf.isValid(document) === true) {
      handleValidateForm();
    } else {
        Alert.alert('Documento inválido');
        return;
    }
  }

  function handleValidateForm() {
    name === '' ? setColorName('#E31F0B') : setColorName('#002441');
    nickname === '' ? setColorNickname('#E31F0B') : setColorNickname('#002441');
    email === '' ?  setColorEmail('#E31F0B'): setColorEmail('#002441');
    password === '' ?  setColorPass('#E31F0B') : setColorPass('#002441');
    confirmPass === '' ?  setColorPass2('#E31F0B') : setColorPass2('#002441');

    handleValidSchema();
  }

  function handleValidSchema() {
    if
    (
      name !== ''
      && nickname !== ''
      && email !== ''
      && document !== ''
      && password !== ''
      && confirmPass !== ''
    )
    {
      handleValidatePassword();
    }
  }

  function handleValidatePassword() {
    if (password !== confirmPass) {
      Alert.alert('As senhas não coincidem');
      return;
    }

    if (password !== '' && password.length < 8) {
      Alert.alert('Senha muito curta, digite uma senha de no minimo 8 caracteres');
      return;
    }

    validHardPassword();
  }

  function validHardPassword() {
    if (/[A-Z]/.test(password) === false) {
      Alert.alert('Digite pelo menos uma letra maiscula');
      return;
    }

    if (/[0-9]/.test(password) === false) {
      Alert.alert('Digite pelo menos um número');
      return;
    }

    if (/\W|_/.test(password) === false) {
      Alert.alert('Digite pelo menos um caracter especial');
      return;
    }

    validateEmail(email);
  }

  function validateEmail(email) {
    var emailPattern =  /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;

    if (emailPattern.test(email) === false) {
      Alert.alert('Email inválido');
      return;
    } else {
      handleSubmit();
    }
  }

  async function handleSubmit() {
    try {
      setLoading(true);

      const response = await api.post('players', {
        name,
        nickname,
        email,
        document,
        password_hash: password,
      });

      setLoading(false);

      Alert.alert('Conta criada com sucesso! Faça login');
      navigation.goBack();

    } catch (error) {
      if (error.response.status === 400) {
        Alert.alert('Já existe uma conta com os dados informados');
      } else {
        Alert.alert('Não foi possíve criar a conta, tente novamente mais tarde');
      }
      setLoading(false);
    }
  }

  return (
    <ScrollView style={{flex: 1}}>
      <Container>
        <TextInput
              label="Nome"
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
            <TextInput
              label="Apelido"
              value={nickname}
              onChangeText={text => setNickname(text)}
              mode={"outlined"}
              returnKeyType={'next'}
              theme={{
                colors: {
                    placeholder: colorNickname, text: colorNickname, primary: colorNickname,
                }
            }}
            />
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
                    placeholder: colorEmail, text: colorEmail, primary: colorEmail,
                }
            }}
            />
            <TextInput
                  label="CPF"
                  value={document}
                  keyboardType={'number-pad'}
                  onChangeText={text => setDocument(text)}
                  mode={"outlined"}
                  render={props =>
                      <TextInputMask
                        {...props}
                        mask={'[000].[000].[000]-[00]'}
                      />
                    }
                  theme={{
                  colors: {
                      placeholder: colorDocument, text: colorDocument, primary: colorDocument,
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
                    placeholder: colorPass, text: colorPass, primary: colorPass,
                }
            }}
            />
            <TextInput
              label="Confirmar Senha"
              value={confirmPass}
              onChangeText={text => setConfirmPass(text)}
              mode={"outlined"}
              secureTextEntry={true}
              returnKeyType={'send'}
              theme={{
                colors: {
                    placeholder: colorPass2, text: colorPass2, primary: colorPass2,
                }
            }}
            />

              <Button mode="contained" onPress={validDocument} color="#002441" loading={loading}>
                  Criar conta
              </Button>
      </Container>
    </ScrollView>
  );
}

export default SignUp;
