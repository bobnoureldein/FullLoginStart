import React, { useState, useEffect, useContext, useRef } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen-hooks';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { LocalizationContext } from '../../components/translations'

const register = ({ navigation }) => {

  const { width, height } = Dimensions.get('window');
  const [loading, setLoading] = useState(false);
  const [orientation, setOrientation] = React.useState('portrait');
  const nameInput = useRef(null)
  const emailInput = useRef(null);
  const passwordInput = useRef(null);
  const rePasswordInput = useRef(null)
  const newHP = orientation === "portrait" ? hp : wp
  const { translations, initializeAppLanguage } = useContext(LocalizationContext);
  const insets = useSafeAreaInsets();
  initializeAppLanguage()

  useEffect(() => {
    lor(setOrientation);
    return () => {
      rol();
    };
  }, []);

  const formik = useFormik({
    initialValues: { name: '', email: '', password: '', rePassword: '' },
    onSubmit: (values, actions) => handleRegister(values, actions),
    validationSchema: yup.object().shape({
      name: yup
        .string()
        .required()
        .min(6)
        .max(48),
      email: yup
        .string()
        .email()
        .required(),
      password: yup
        .string()
        .min(6)
        .max(48)
        .required(),
      rePassword: yup
        .string()
        .min(6)
        .max(48)
        .required()
        .test('passwords-match', 'Passwords must match', function (value) {
          return this.parent.password === value;
        }),
    })
  })

  function handleRegister(values, actions) {
    console.log('values ', values)
    setLoading(true);
    navigation.navigate('Home', { screen: 'settings' }, setLoading(false))
    actions.resetForm()
  }

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
      height: newHP('45%'),
      alignItems: 'center',
    },
    thirdLayer: {
      width: wp('100%'),
      height: newHP('25%'),
      alignItems: 'center',
    },
    inputSubmitView: {
      width: wp('80%'),
      height: newHP('6%'),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 12,
      marginTop: 20,
      borderRadius: height * 0.03,
      elevation: 4,
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
    submitText: {
      color: '#fff',
      fontSize: newHP('2.2%')
    },
  });

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.main}>
      <View style={[styles.firstLayer, { paddingTop: insets.top, paddingBottom: insets.bottom },]}>
        <Text style={{ fontSize: newHP('5%') }}>{translations['signUp.create']}</Text>
        <Text style={{ fontSize: newHP('2.5%') }}>{translations['signUp.createNew']}</Text>
      </View>
      <React.Fragment>
        <View style={styles.secondLayer}>
          <View style={[styles.inputSubmitView, { backgroundColor: '#f6f6f6' }]}>
            <Icon name="user" style={styles.icon} />
            <TextInput
              value={formik.values.name}
              disabled={loading}
              placeholder={translations['signUp.name']}
              style={styles.textInput}
              onChangeText={formik.handleChange('name')}
              onBlur={() => formik.setFieldTouched('name')}
              secureTextEntry={true}
              ref={nameInput}
              maxLength={24}
            />
            <View style={{ width: 24 }} />
          </View>
          {formik.touched.name && formik.errors.name &&
            <Text style={{ fontSize: newHP('1.7%'), color: 'red' }}>{formik.errors.name}</Text>
          }
          <View style={[styles.inputSubmitView, { backgroundColor: '#f6f6f6' }]} >
            <Icon name="user" style={styles.icon} />
            <TextInput
              value={formik.values.email}
              disabled={loading}
              placeholder={translations['signUp.email']}
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
          <View style={[styles.inputSubmitView, { backgroundColor: '#f6f6f6' }]}>
            <Icon name="lock" style={styles.icon} />
            <TextInput
              value={formik.values.password}
              disabled={loading}
              placeholder={translations['signUp.password']}
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
          <View style={[styles.inputSubmitView, { backgroundColor: '#f6f6f6' }]}>
            <Icon name="lock" style={styles.icon} />
            <TextInput
              value={formik.values.rePassword}
              disabled={loading}
              placeholder={translations['signUp.rePassword']}
              style={styles.textInput}
              onChangeText={formik.handleChange('rePassword')}
              onBlur={() => formik.setFieldTouched('rePassword')}
              secureTextEntry={true}
              ref={rePasswordInput}
              maxLength={24}
            />
            <View style={{ width: 24 }} />
          </View>
          {formik.touched.rePassword && formik.errors.rePassword &&
            <Text style={{ fontSize: newHP('1.7%'), color: 'red' }}>{formik.errors.rePassword}</Text>
          }
        </View>

        <View style={styles.thirdLayer}>
          <TouchableOpacity
            disabled={loading}
            style={[styles.inputSubmitView, { backgroundColor: '#E84545', justifyContent: 'center' }]}
            onPress={formik.handleSubmit}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
                <Text style={styles.submitText}>{translations['login']}</Text>
              )}
          </TouchableOpacity>

          <View style={{ flexDirection: translations._language == 'ar' ? 'row-reverse' : 'row', marginTop: 24 }}>
            <Text style={{ fontSize: newHP('2%') }}>{translations['signUp.haveACC']}</Text>
            <TouchableOpacity
              disabled={loading}
              onPress={() => navigation.navigate('login')}
              hitSlop={{ top: 12, bottom: 12, left: 8, right: 8 }}>
              <Text style={{ fontWeight: 'bold', color: '#E84545', fontSize: newHP('2%') }}> {translations['login']}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </React.Fragment>
    </ScrollView >
  );
};

export default register;
