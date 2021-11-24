import React from 'react';

import { Container, TitleScreen, ButtonImage, ImageProfile } from './styles';

import {useNavigation} from '@react-navigation/native';

const ProfileHeader = ({title, image, screen}) => {
  const navigation = useNavigation();

  return (
    <Container>
      <TitleScreen>{title}</TitleScreen>

      <ButtonImage onPress={() => {navigation.navigate(screen)}}>
        <ImageProfile source={image} />
      </ButtonImage>
    </Container>
  );
}

export default ProfileHeader;
