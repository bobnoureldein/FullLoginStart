import React from 'react';
import {Text, StyleSheet} from 'react-native';

function AppText(props) {
  return <StandardText {...props} />;
}

function StandardText(props) {
  const styles = StyleSheet.create({
    mainText: {
      fontSize: 20,
    },
  });

  return (
    <Text style={[styles.mainText, props.textStyle]} {...props}>
      {props.children}
    </Text>
  );
}

export default AppText;
