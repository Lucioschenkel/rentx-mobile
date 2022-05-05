import React, { useEffect } from 'react';

import BrandSvg from '../../assets/brand.svg';
import LogoSvg from '../../assets/logo.svg';

import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { Container } from './styles';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/types';

export function Splash() {
  const splashAnimation = useSharedValue(0);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  function startApp() {
    navigation.navigate('Home', { id: 'Home' });
  }

  useEffect(() => {
    splashAnimation.value = withTiming(
      50,
      {
        duration: 1000,
      },
      () => {
        'worklet';
        runOnJS(startApp)();
      }
    );
  }, []);

  const brandStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 50], [1, 0]),
      transform: [
        {
          translateX: interpolate(
            splashAnimation.value,
            [0, 50],
            [0, -90],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 25, 50], [0, 0.3, 1]),
      transform: [
        {
          translateX: interpolate(
            splashAnimation.value,
            [0, 50],
            [-90, 0],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  return (
    <Container>
      <Animated.View
        style={[
          brandStyle,
          {
            position: 'absolute',
          },
        ]}
      >
        <BrandSvg width={100} height={62.5} />
      </Animated.View>
      <Animated.View
        style={[
          logoStyle,
          {
            position: 'absolute',
          },
        ]}
      >
        <LogoSvg width={180} height={20} />
      </Animated.View>
    </Container>
  );
}
