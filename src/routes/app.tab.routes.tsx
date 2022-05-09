import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Home } from '../screens/Home';
import { MyCars } from '../screens/MyCars';
import { AppStackRoutes } from './app.stack.routes';

import HomeSvg from '../assets/car.svg';
import CarSvg from '../assets/car.svg';
import PeopleSvg from '../assets/people.svg';
import { Platform } from 'react-native';
import theme from '../styles/theme';

const { Navigator, Screen } = createBottomTabNavigator();

const tabOptions = {
  header: () => null,
  headerShown: false,
  tabBarShowLabel: false,
  tabBarActiveTintColor: theme.colors.main,
  tabBarInactiveTintColor: theme.colors.text_detail,
  tabBarStyle: {
    paddingVertical: Platform.OS === 'ios' ? 20 : 0,
    height: 78,
    backgroundColor: theme.colors.background_primary,
  },
};

export function AppTabRoutes() {
  return (
    // @ts-ignore
    <Navigator>
      <Screen
        name="Home"
        component={AppStackRoutes}
        options={{
          ...tabOptions,
          tabBarIcon: ({ color }) => (
            <HomeSvg width={24} height={24} fill={color} />
          ),
        }}
      />
      <Screen
        name="MyCars"
        component={MyCars}
        options={{
          ...tabOptions,
          tabBarIcon: ({ color }) => (
            <CarSvg width={24} height={24} fill={color} />
          ),
        }}
      />
      <Screen
        name="Profile"
        component={Home}
        options={{
          ...tabOptions,
          tabBarIcon: ({ color }) => (
            <PeopleSvg width={24} height={24} fill={color} />
          ),
        }}
      />
    </Navigator>
  );
}
