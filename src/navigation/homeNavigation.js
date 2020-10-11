import React from 'react';
import { View, Image, Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderBackButton } from '@react-navigation/stack';
import Home from '../screens/home/home';
import Settings from '../screens/settings/settings'

const { width, height } = Dimensions.get('window');
const AppStack = createStackNavigator();

const navigationOptions = () => ({
  headerShown: false,
});

export function Application() {
  function LogoTitle() {
    return (
      <Image
        style={{ height: 50, width: width }}
        source={require('../assets/images/logo.png')}
        resizeMode="contain"
      />
    );
  }

  return (
    <AppStack.Navigator
      initialRouteName="home"
      screenOptions={navigationOptions}
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#E84545',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center',
      }}>

      <AppStack.Screen
        name="home"
        component={Home}
        options={{
          headerTitle: (props) => <LogoTitle {...props} />,
          // headerLeft: (props) => <View />,
          // headerRight: (props) => <Text>New</Text>,
        }}
      />
      <AppStack.Screen
        name="settings"
        component={Settings}
        options={{
          headerTitle: "Settings"
        }}
      />
    </AppStack.Navigator>
  );
}
