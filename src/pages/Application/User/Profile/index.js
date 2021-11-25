import React, {useState} from 'react';
import {Alert, ScrollView } from 'react-native';

import { Container, Title, ContainerDataPlayer, Text, ContainerForgotPassword } from './styles';

import {useSelector} from 'react-redux';

import { useDispatch } from 'react-redux';
import { signOut } from '../../../../store/modules/auth/actions';

import Line from '../../../../components/Line';

import {TextInput, Button} from 'react-native-paper'

import api from '../../../../services/api';

const Profile = () => {
  const user = useSelector((state) => state.user.profile);

  const dispatch = useDispatch();

  async function handleSignOut() {
    dispatch(signOut());
  }

  const [loadingPass, setLoadingPass] = useState(false);

  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [showOldPassword, setShowOldPassword] = useState(true);
  const [iconOldPassword, setIconOldPassword] = useState('eye');

  const [showPassword, setShowPassword] = useState(true);
  const [iconPassword, setIconPassword] = useState('eye');

  const [showNewPassword, setShowNewPassword] = useState(true);
  const [iconNewPassword, setIconNewPassword] = useState('eye');

  function toggleOldPassword() {
    setShowOldPassword(previousState => !previousState);

    if (showOldPassword === true) {
      setIconOldPassword('eye-off');
    } else {
      setIconOldPassword('eye');
    }
  }

  function togglePassword() {
    setShowPassword(previousState => !previousState);

    if (showPassword === true) {
      setIconPassword('eye-off');
    } else {
      setIconPassword('eye');
    }
  }

  function toggleNewPassword() {
    setShowNewPassword(previousState => !previousState);

    if (showNewPassword === true) {
      setIconNewPassword('eye-off');
    } else {
      setIconNewPassword('eye');
    }
  }

  function handleValidatePassword() {
    if (password !== newPassword) {
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

    alterPassword();

  }

  async function alterPassword() {
    setLoadingPass(true);
    try {
      await api.put('alter-password', {
        player: user.id,
        old_password: oldPassword,
        password_hash: newPassword,
      })
      setLoadingPass(false);

      Alert.alert('Senha alterada com sucesso!');

      setPassword('');
      setNewPassword('');
      setOldPassword('');

    } catch (error) {
      Alert.alert('Erro ao alterar sua senha, ou senha antiga inválida');
      setLoadingPass(false);
    }
  }

  return (
    <Container>
      <ScrollView style={{flex: 1}}>
        <Title>Dados: </Title>
        <ContainerDataPlayer>
          <Text>Nome: {user.name}</Text>
          <Text>Apelido: {user.nickname}</Text>
          <Text>E-mail: {user.email}</Text>
        </ContainerDataPlayer>

        <Line bottom={0} top={20} />

        <Title>Alterar senha: </Title>

        <ContainerForgotPassword>
            <TextInput
              label="Senha antiga"
              secureTextEntry={showOldPassword}
              right={
                <TextInput.Icon
                  name={iconOldPassword}
                  onPress={toggleOldPassword}
                />
              }
              value={oldPassword}
              onChangeText={text => setOldPassword(text)}
              theme={{
                colors: {
                    placeholder: '#002441', text: '#002441', primary: '#002441',
                }
              }}
            />
            <TextInput
              label="Nova senha"
              secureTextEntry={showPassword}
              right={
                <TextInput.Icon name={iconPassword} onPress={togglePassword} />
              }
              value={password}
              onChangeText={text => setPassword(text)}
              theme={{
                colors: {
                    placeholder: '#002441', text: '#002441', primary: '#002441',
                }
              }}
            />
            <TextInput
              label="Repetir senha"
              secureTextEntry={showNewPassword}
              right={
                <TextInput.Icon
                  name={iconNewPassword}
                  onPress={toggleNewPassword}
                />
              }
              value={newPassword}
              onChangeText={text => setNewPassword(text)}
              theme={{
                colors: {
                    placeholder: '#002441', text: '#002441', primary: '#002441',
                }
              }}
            />

            <Button icon="send" mode="contained" onPress={handleValidatePassword} color="#002441" loading={loadingPass}>
              Alterar Senha
            </Button>
        </ContainerForgotPassword>

        <Line bottom={0} top={20} />

        <ContainerForgotPassword>
          <Button icon="door" mode="contained" onPress={handleSignOut} color="#000">
                Sair
          </Button>
        </ContainerForgotPassword>
      </ScrollView>
    </Container>
  );
}

export default Profile;
