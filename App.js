import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {StatusBar, Platform, StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from './src/navigation/indexNavigation';
import {Provider} from 'react-redux';
import {LocalizationProvider} from './src/components/translations';
import store from './src/redux/store';

const isIOS = Platform.OS === 'ios';

const App = () => {
  useEffect(() => {
    console.log(`test`);
  });

  return (
    <>
      <Provider store={store}>
        <StatusBar barStyle="dark-content" translucent={true} />
        <SafeAreaProvider>
          <LocalizationProvider>
            <Navigation />
          </LocalizationProvider>
        </SafeAreaProvider>
      </Provider>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
