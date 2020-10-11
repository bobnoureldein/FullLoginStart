import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/login/login';
import Register from '../screens/register/register';

const AuthStack  = createStackNavigator();

const navigationOptions = () => ({
  headerShown: false,
});

export function Auth() {
  return (
    <AuthStack.Navigator screenOptions={navigationOptions}>
      <AuthStack.Screen name="login" component={Login} />
      <AuthStack.Screen name="signup" component={Register} />
    </AuthStack.Navigator>
  );
}
