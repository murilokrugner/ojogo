import React, {useState, useEffect} from 'react';
import { Alert } from 'react-native';

import { Container, TitleScreen, ButtonImage, ContainerUser, ImageProfile, Balance } from './styles';

import {useNavigation} from '@react-navigation/native';

import { useSelector } from 'react-redux';

import api from '../../services/api';

import { useIsFocused } from '@react-navigation/native';

const ProfileHeader = ({title, image, screen}) => {
  const isFocused = useIsFocused();

  const user = useSelector((state) => state.user.profile);
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(0);

  const navigation = useNavigation();

  async function loadBalance() {
    setLoading(true);
    try {
      const response = await api.get(`wallet?id=${user.id}`);

      setBalance(response.data.balance);

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user || isFocused) {
      loadBalance();
    }
  }, [user, isFocused]);

  return (
    <Container>
      <TitleScreen>{title}</TitleScreen>

      <ContainerUser>
        {!loading && (
          <Balance>Saldo de : {balance} moedas </Balance>
        )}

        <ButtonImage onPress={() => {navigation.navigate(screen)}}>
          <ImageProfile source={image} />
        </ButtonImage>
      </ContainerUser>
    </Container>
  );
}

export default ProfileHeader;
