import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, BackHandler } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Ionicons } from '@expo/vector-icons';
import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
} from 'react-native-reanimated';

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

import Logo from '../../assets/logo.svg';

import { Container, Header, TotalCars, HeaderContent, CarList } from './styles';
import { Car } from '../../components/Car';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/types';
import api from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';
import { Loading } from '../../components/Loading';
import { useTheme } from 'styled-components/native';
import { LoadAnimation } from '../../components/LoadAnimation';

export function Home() {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const positionInY = useSharedValue(0);
  const positionInX = useSharedValue(0);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any) {
      ctx.positionX = positionInX.value;
      ctx.positionY = positionInY.value;
    },
    onActive(event, ctx: any) {
      positionInX.value = ctx.positionX + event.translationX;
      positionInY.value = ctx.positionY + event.translationY;
    },
    onEnd() {
      positionInX.value = withSpring(0);
      positionInY.value = withSpring(0);
    },
  });

  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: positionInX.value,
        },
        {
          translateY: positionInY.value,
        },
      ],
    };
  });

  const theme = useTheme();

  useEffect(() => {
    async function getCars() {
      try {
        const response = await api.get<CarDTO[]>('/cars');

        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getCars();
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });
  }, []);

  function handleCarDetailsClicked(car: CarDTO) {
    navigation.navigate('CarDetails', { id: 'CarDetails', car });
  }

  function handleOpenMyCars() {
    navigation.navigate('MyCars', { id: 'MyCars' });
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          {!loading && <TotalCars>Total de {cars.length} carros</TotalCars>}
        </HeaderContent>
      </Header>

      {loading ? (
        <LoadAnimation />
      ) : (
        <CarList
          data={cars}
          keyExtractor={(item: CarDTO) => item.id}
          renderItem={({ item }: { item: CarDTO }) => (
            <Car
              data={item as CarDTO}
              onPress={() => handleCarDetailsClicked(item)}
            />
          )}
        />
      )}

      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            myCarsButtonStyle,
            {
              position: 'absolute',
              bottom: 13,
              right: 22,
            },
          ]}
        >
          <ButtonAnimated
            onPress={handleOpenMyCars}
            style={[
              styles.button,
              {
                backgroundColor: theme.colors.main,
              },
            ]}
          >
            <Ionicons
              name="ios-car-sport-outline"
              size={32}
              color={theme.colors.shape}
            />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
