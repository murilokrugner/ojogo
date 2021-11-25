import React, {useState} from 'react';
import {ScrollView } from 'react-native';

import { Container, Title, ContainerDataPlayer, Text, ContainerForgotPassword } from './styles';

import {useSelector} from 'react-redux';

import { useDispatch } from 'react-redux';
import { signOut } from '../../../../store/modules/auth/actions';

import Line from '../../../../components/Line';

import {TextInput, Button} from 'react-native-paper'

const Profile = () => {
  const user = useSelector((state) => state.user.profile);

  const dispatch = useDispatch();

  async function handleSignOut() {
    dispatch(signOut());
  }

  const [loading, setLoading] = useState(false);

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

            <Button icon="send" mode="contained" onPress={() => {}} color="#002441" loading={loading}>
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
