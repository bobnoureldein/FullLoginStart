import React, {useState, useEffect, useContext, useRef} from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen-hooks';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {LocalizationContext} from '../../components/translations';

const login = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [orientation, setOrientation] = React.useState('portrait');
  const {width, height} = Dimensions.get('window');

  const emailInput = useRef(null);
  const passwordInput = useRef(null);
  const newHP = orientation === 'portrait' ? hp : wp;
  const {translations, initializeAppLanguage} = useContext(LocalizationContext);
  const insets = useSafeAreaInsets();
  initializeAppLanguage();

  useEffect(() => {
    lor(setOrientation);
    return () => {
      rol();
    };
  }, []);

  const formik = useFormik({
    initialValues: {email: '', password: ''},
    onSubmit: (values, actions) => handleLogin(values, actions),
    validationSchema: yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().min(6).required(),
    }),
  });

  function handleLogin(values, actions) {
    console.log('values ', values);
    setLoading(true);
    navigation.navigate('Home', {screen: 'settings'}, setLoading(false));
    actions.resetForm();
  }

  const styles = StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: '#fff',
    },
    firstLayer: {
      width: wp('100%'),
      height: newHP('26%'),
      alignItems: 'center',
      justifyContent: 'center',
    },
    secondThirdLayer: {
      width: wp('100%'),
      height: newHP('37%'),
      alignItems: 'center',
    },
    inputSubmitView: {
      width: wp('80%'),
      height: newHP('6%'),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 12,
      marginTop: 12,
      borderRadius: height * 0.03,
      elevation: 4,
    },
    icon: {
      fontSize: 20,
      color: '#D3D3D3',
    },
    textInput: {
      textAlign: 'center',
      fontSize: newHP('2%'),
      minWidth: wp('60%'),
    },
    submitText: {
      color: '#fff',
      fontSize: newHP('2%'),
    },
  });

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.main}>
      <View
        style={[
          styles.firstLayer,
          {paddingTop: insets.top, paddingBottom: insets.bottom},
        ]}>
        <Image
          style={{height: 120, width: width}}
          source={require('../../assets/images/logo.png')}
          resizeMode="contain"
        />
      </View>
      <React.Fragment>
        <View style={styles.secondThirdLayer}>
          <Text style={{fontSize: newHP('5%')}}>
            {translations['login.welcome']}
          </Text>
          <Text style={{fontSize: newHP('2.5%')}}>
            {translations['login.loginAccount']}
          </Text>
          <View
            style={[
              styles.inputSubmitView,
              {backgroundColor: '#f6f6f6', marginTop: 36},
            ]}>
            <Icon name="user" style={styles.icon} />
            <TextInput
              value={formik.values.email}
              disabled={loading}
              placeholder={translations['login.email']}
              style={styles.textInput}
              onChangeText={formik.handleChange('email')}
              onBlur={() => formik.setFieldTouched('email')}
              ref={emailInput}
              maxLength={48}
            />
            <View style={{width: 24}} />
          </View>
          {formik.touched.email && formik.errors.email && (
            <Text style={{fontSize: newHP('1.7%'), color: 'red'}}>
              {formik.errors.email}
            </Text>
          )}
          <View style={[styles.inputSubmitView, {backgroundColor: '#f6f6f6'}]}>
            <Icon name="lock" style={styles.icon} />
            <TextInput
              value={formik.values.password}
              disabled={loading}
              placeholder={translations['login.password']}
              style={styles.textInput}
              onChangeText={formik.handleChange('password')}
              onBlur={() => formik.setFieldTouched('password')}
              secureTextEntry={true}
              ref={passwordInput}
              maxLength={48}
            />
            <View style={{width: 24}} />
          </View>
          {formik.touched.password && formik.errors.password && (
            <Text style={{fontSize: newHP('1.7%'), color: 'red'}}>
              {formik.errors.password}
            </Text>
          )}
          <TouchableOpacity
            disabled={loading}
            style={{
              paddingVertical: 8,
              marginHorizontal: width * 0.1,
              alignSelf: 'flex-end',
            }}
            hitSlop={{top: 12, bottom: 12, left: 8, right: 8}}>
            <Text
              style={{
                color: 'rgba(0,0,0,.8)',
                fontSize: newHP('1.6%'),
              }}>
              {translations['login.forgotPassword']}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.secondThirdLayer}>
          <TouchableOpacity
            disabled={loading}
            style={[
              styles.inputSubmitView,
              {backgroundColor: '#E84545', justifyContent: 'center'},
            ]}
            onPress={formik.handleSubmit}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.submitText}>{translations['login']}</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            disabled={loading}
            style={[styles.inputSubmitView, {backgroundColor: '#4267B2'}]}
            onPress={() => navigation.navigate('Home', {screen: 'settings'})}>
            <View style={{width: 40}}>
              <Icon name="facebook" style={styles.icon} />
            </View>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.submitText}>
                {translations['login.facebook']}
              </Text>
            )}
            <View style={{width: 40}} />
          </TouchableOpacity>
          <View
            style={{
              flexDirection:
                translations._language == 'ar' ? 'row-reverse' : 'row',
              marginTop: 24,
            }}>
            <Text style={{fontSize: newHP('2%')}}>
              {translations['login.doNotHaveAcc']}
            </Text>
            <TouchableOpacity
              disabled={loading}
              onPress={() => navigation.navigate('signup')}
              hitSlop={{top: 12, bottom: 12, left: 8, right: 8}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: '#E84545',
                  fontSize: newHP('2%'),
                }}>
                {' '}
                {translations['signUp']}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </React.Fragment>
    </ScrollView>
  );
};

export default login;
