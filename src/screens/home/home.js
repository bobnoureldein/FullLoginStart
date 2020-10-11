import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { useHeaderHeight } from '@react-navigation/stack';

const { width, height } = Dimensions.get('window');

const home = () => {
  const headerHeight = useHeaderHeight();
  return (
    <View style={[styles.main, { height: height - headerHeight }]}>
      <Text>Hello Malak & Malek</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default home;
