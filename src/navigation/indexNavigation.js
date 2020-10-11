import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Auth} from './authNavigation';
import {Application} from './homeNavigation';
import {DrawerNavigation} from './drawerNavigation';

import AsyncStorage from '@react-native-community/async-storage';

const Stack = createStackNavigator();

const navigationOptions = () => ({
  headerShown: false,
});

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={navigationOptions}
        initialRouteName="Auth">
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="Home" component={Application} />
        <Stack.Screen name="Drawer" component={DrawerNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
