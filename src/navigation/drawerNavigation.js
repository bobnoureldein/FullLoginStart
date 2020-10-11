import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Profile from '../screens/profile/profile';

const Drawer = createDrawerNavigator();

const navigationOptions = () => ({
  headerShown: false,
});

export function DrawerNavigation() {
  return (
    <Drawer.Navigator
      screenOptions={navigationOptions}
      initialRouteName="profile">
      <Drawer.Screen
        name="profile"
        component={Profile}
        options={{
          drawerLabel: 'Profile',
          drawerIcon: (config) => (
            <Icon type="FontAwesome" name="user" color="#488aff" size={20} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
