import React, {useContext} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {LocalizationContext} from '../../components/translations';

const Settings = () => {
  const insets = useSafeAreaInsets();
  const {
    translations,
    appLanguage,
    setAppLanguage,
    initializeAppLanguage,
  } = useContext(LocalizationContext); // 1
  initializeAppLanguage(); // 2

  return (
    <View
      style={[
        styles.container,
        {justifyContent: 'center', alignItems: 'center'},
      ]}>
      <Text h4 h4Style={styles.language}>
        {translations['settings.change_language']} {/* 3 */}
      </Text>
      {translations.getAvailableLanguages().map((currentLang, i) => (
        <TouchableOpacity
          key={i}
          onPress={() => {
            setAppLanguage(currentLang);
          }}
          style={{
            flexDirection: 'row',
            width: 40,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text style={{fontSize: newHP('2%')}}>{currentLang} </Text>
          </View>
          {appLanguage === currentLang ? (
            <Icon name="check" style={{color: 'green'}} />
          ) : (
            <View />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  language: {
    paddingTop: 10,
    textAlign: 'center',
  },
});

export default Settings;
