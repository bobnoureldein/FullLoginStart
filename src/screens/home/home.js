import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { useBackHandler } from '@react-native-community/hooks'
// import { useHeaderHeight } from '@react-navigation/stack';

const { width, height } = Dimensions.get('window');

const home = () => {
  // const headerHeight = useHeaderHeight();

  useBackHandler(() => {
    if (shouldBeHandledHere) {
      // handle it
      return true
    }
    // let the default thing happen
    return false
  })

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
