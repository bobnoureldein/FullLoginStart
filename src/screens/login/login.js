import React, { useState, useEffect, useContext, useRef } from 'react';
import {
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen-hooks';
import { Formik, useFormik } from 'formik';
import * as yup from 'yup';
import { LocalizationContext } from '../../components/translations'

const { width, height } = Dimensions.get('window');

const login = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [orientation, setOrientation] = React.useState('portrait');

  useEffect(() => {
    lor(setOrientation);
    return () => {
      rol();
    };
  }, []);

  const emailInput = useRef(null);
  const passwordInput = useRef(null);
  const newHP = orientation === "portrait" ? hp : wp
  const { translations, initializeAppLanguage } = useContext(LocalizationContext);
  const insets = useSafeAreaInsets();
  initializeAppLanguage()


  handleOnChange = (x) => (value) => {
    switch (x) {
      case 'username':
        setUsername(value);
        console.log('username', username);
        break;
      case 'password':
        setPassword(value);
        console.log('password', password);
        break;
    }
  };

  function handleLogin(values, actions) {
    console.log('values ', values)
    setLoading(true);
    navigation.navigate('Home', { screen: 'settings' }, setLoading(false))
    actions.resetForm({
      values: {
        email: '',
        password: '',
      },
    })
  }

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    onSubmit: (values, actions) => handleLogin(values, actions),
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email()
        .required(),
      password: yup
        .string()
        .min(6)
        .required(),
    })

  })

  const styles = StyleSheet.create({
    main: {
      flex: 1,
      backgroundColor: '#fff',
    },
    firstLayer: {
      width: wp('100%'),
      height: newHP('30%'),
      alignItems: 'center',
      justifyContent: 'center',
    },
    secondLayer: {
      width: wp('100%'),
      height: newHP('36%'),
      alignItems: 'center',
    },
    thirdLayer: {
      width: wp('100%'),
      height: newHP('34%'),
      alignItems: 'center',
    },
    inputView: {
      width: wp('80%'),
      height: newHP('6%'),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 12,
      marginTop: 12,
      borderRadius: height * 0.03,
      elevation: 4,
      backgroundColor: '#f6f6f6',
    },
    icon: {
      fontSize: 20,
      color: '#D3D3D3',
    },
    textInput: {
      textAlign: 'center',
      fontSize: newHP('2.2%'),
      minWidth: wp('60%'),
    },
    submit: {
      width: wp('80%'),
      height: newHP('6%'),
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 8,
      marginTop: 12,
      borderRadius: height * 0.03,
      elevation: 4,
      backgroundColor: '#E84545',
    },
    facebookLogin: {
      width: wp('80%'),
      height: newHP('6%'),
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 12,
      marginTop: 12,
      borderRadius: height * 0.03,
      elevation: 4,
      backgroundColor: '#4267B2',
    },
    facebookIcon: {
      fontSize: 20,
      color: '#fff',
    },
    submitText: {
      color: '#fff',
      fontSize: newHP('2.2%')
    },
  });

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.main}>
      <View style={[styles.firstLayer, { paddingTop: insets.top, paddingBottom: insets.bottom },]}>
        <Image
          style={{ height: 120, width: width }}
          source={require('../../assets/images/logo.png')}
          resizeMode="contain"
        />
      </View>
      {/* <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={
          yup.object().shape({
            email: yup
              .string()
              .email()
              .required(),
            password: yup
              .string()
              .min(6)
              .required(),
          })}
        onSubmit={(values, actions) => handleLogin(values, actions)}
      >
        {({ values, handleChange, errors, setFieldTouched, touched, handleSubmit }) => ( */}
      <React.Fragment>
        <View style={styles.secondLayer}>
          <Text style={{ fontSize: newHP('5%') }}>Welcome Back</Text>
          <Text style={{ fontSize: newHP('2.5%') }}>Login to your account</Text>
          <View style={[styles.inputView, { marginTop: 36 }]}>
            <Icon name="user" style={styles.icon} />
            <TextInput
              value={formik.values.email}
              disabled={loading}
              placeholder="username"
              style={styles.textInput}
              onChangeText={formik.handleChange('email')}
              onBlur={() => formik.setFieldTouched('email')}
              ref={emailInput}
              maxLength={30}
            />
            <View style={{ width: 24 }} />
          </View>
          {formik.touched.email && formik.errors.email &&
            <Text style={{ fontSize: newHP('1.7%'), color: 'red' }}>{formik.errors.email}</Text>
          }
          <View style={styles.inputView}>
            <Icon name="lock" style={styles.icon} />
            <TextInput
              value={formik.values.password}
              disabled={loading}
              placeholder="password"
              style={styles.textInput}
              onChangeText={formik.handleChange('password')}
              onBlur={() => formik.setFieldTouched('password')}
              secureTextEntry={true}
              ref={passwordInput}
              maxLength={24}
            />
            <View style={{ width: 24 }} />
          </View>
          {formik.touched.password && formik.errors.password &&
            <Text style={{ fontSize: newHP('1.7%'), color: 'red' }}>{formik.errors.password}</Text>
          }
          <TouchableOpacity
            disabled={loading}
            style={{
              paddingVertical: 8,
              marginHorizontal: width * 0.1,
              alignSelf: 'flex-end',
            }}
            hitSlop={{ top: 12, bottom: 12, left: 8, right: 8 }}>
            <Text style={{ fontWeight: 'bold', color: '#E84545', fontSize: newHP('2%') }}>
              Forgot password?
                </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.thirdLayer}>
          <TouchableOpacity
            disabled={loading}
            style={styles.submit}
            onPress={formik.handleSubmit}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
                <Text style={styles.submitText}>{translations['login']}</Text>
              )}
          </TouchableOpacity>
          <TouchableOpacity
            disabled={loading}
            style={styles.facebookLogin}
            onPress={() => navigation.navigate('Home', { screen: 'home' })}>
            <View style={{ width: 40 }}>
              <Icon name="facebook" style={styles.facebookIcon} />
            </View>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
                <Text style={styles.submitText}>{translations['login.facebook']}</Text>
              )}
            <View style={{ width: 40 }} />
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', marginTop: 24 }}>
            <Text style={{ fontSize: newHP('2%') }}>Don't have an account?</Text>
            <TouchableOpacity
              disabled={loading}
              hitSlop={{ top: 12, bottom: 12, left: 8, right: 8 }}>
              <Text style={{ fontWeight: 'bold', color: '#E84545', fontSize: newHP('2%') }}> Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </React.Fragment>
      {/* )}
      </Formik> */}
    </ScrollView >
  );
};

export default login;
