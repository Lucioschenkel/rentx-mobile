import React from 'react';

import LottieView from 'lottie-react-native';

import loadingCarAnimation from '../../assets/car_loading_animation.json';

import { Container } from './styles';

export function LoadAnimation() {
  return (
    <Container>
      <LottieView
        source={loadingCarAnimation}
        style={{
          height: 200,
        }}
        resizeMode="contain"
        autoPlay
        loop
      />
    </Container>
  );
}
