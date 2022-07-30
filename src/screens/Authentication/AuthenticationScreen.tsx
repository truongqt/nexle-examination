import React from 'react';
import {Button, Image, StyleSheet, Text, TextInput, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {colors, fonts, images} from 'assets';
import {RootState} from 'redux-manager/root-reducer';
import {AppDispatch} from 'redux-manager/root-store';
import {
  signIn,
  SignInRequestPayload,
  signUp,
  SignUpRequestPayload,
} from 'redux-manager/user/thunk';
import {device, scale} from 'utils/helpers/device';
import storage from 'utils/helpers/storage';
import {SAVED_USER_PROFILE} from 'utils/helpers/constants';
import Layout from 'components/layout/Layout';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ImageBackground} from 'react-native';
import { useState } from 'react';
import { CheckBox } from 'react-native-elements';

const AuthenticationScreen = () => {

  const dispatch: AppDispatch = useDispatch();
  const {userProfile, isRequesting} = useSelector(
    (state: RootState) => state.user,
  );
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const signInData: SignInRequestPayload = {
    email: 'user1@gmail.com',
    password: '12345678',
  };

  const signUpData: SignUpRequestPayload = {
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'user1000@gmail.com',
    password: '12345678',
  };

  const onAuthenSuccess = async () => {
    await storage.save(SAVED_USER_PROFILE, userProfile);
  };

  const signInBtn = async () => {
    const res = await dispatch(signIn(signInData));
    console.log('signInBtn res: ', JSON.stringify(res.payload));
  };

  const signUpBtn = async () => {
    const res = await dispatch(signUp(signUpData));
    console.log('signUpBtn res: ', JSON.stringify(res.payload));
  };

  const readStorage = async () => {
    const savedUserProfile = await storage.load(SAVED_USER_PROFILE);
    console.log('readStorage: ', JSON.stringify(savedUserProfile));
  };

  const renderEmailInput = () => (
    <>
      <Text style={styles.titleTxt}>Your email</Text>
      <TextInput
        keyboardType="email-address"
        placeholder="Testmail@gmail.com"
        onChangeText={value => console.log('value: ', value)}
        style={styles.textInput}
      />
    </>
  );

  const renderPasswordInput = () => (
    <View style={{marginTop: scale(26)}}>
      <Text style={styles.titleTxt}>Your password</Text>
      <TextInput
        secureTextEntry
        onChangeText={value => console.log('value: ', value)}
        style={styles.textInput}
      />
    </View>
  );

  const renderCheckAge = () => (
    <View style={{marginTop: scale(49), backgroundColor: 'gold', height: 100, width: 100}}>

      <CheckBox
        // title="I agree to the Terms and Conditions and Privacy Policy"
        checked={isChecked}
        onPress={() => setIsChecked(!isChecked)}
        // checkedIcon='check'
        checkedColor={colors.white}
        containerStyle={{
          width: scale(23),
          height: scale(23),
          borderColor: colors.c6C66FF,
          borderRadius: scale(4),
          //   backgroundColor: 'white',
          // borderWidth: 1,
          // borderColor: 'red',
          //   padding: 0,
          //   marginLeft: 0,
          //   marginRight: scale(8),
          // minHeight: scale(28),
        }}
        // textStyle={{
        //   fontFamily: fonts.Poppins.regular,
        //   fontWeight: '400',
        //   fontStyle: 'normal',
        //   fontSize: scale(13),
        //   lineHeight: scale(19.5),
        //   letterSpacing: scale(-0.17),
        //   color: colors.PRIMARY,
        // }}
      />
    </View>
  );

  const renderImageBg = () => (
    <ImageBackground source={images.authen_bg} style={styles.imageBg}>
      <LinearGradient
        colors={[colors.authen_gradient.first, colors.authen_gradient.second]}
        locations={[0.0962, 0.5296]}
        angle={180}
        style={styles.linearGradient}>
        <View
          style={{
            borderColor: 'blue',
            height: 1000,
          }}>
          <Text style={styles.headerTxt}>Let’s get you started!</Text>
          {renderEmailInput()}
          {renderPasswordInput()}
          {/* {renderCheckAge()} */}
        </View>
      </LinearGradient>
    </ImageBackground>
  );

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{
        borderColor: 'gold',
        backgroundColor: colors.authen_gradient.second,
        ...StyleSheet.absoluteFillObject,
      }}>
      {renderImageBg()}
    </KeyboardAwareScrollView>
  );
};

export default AuthenticationScreen;

const styles = StyleSheet.create({
  linearGradient: {
    // width: '100%',
    // height: '100%',
    ...StyleSheet.absoluteFillObject,
  },
  imageBg: {
    width: '100%',
    height: scale(650),
    resizeMode: 'cover',
    // ...StyleSheet.absoluteFillObject,
    // borderColor: 'red',
    // backgroundColor: 'red'
    // borderWidth: 1
  },
  headerTxt: {
    fontFamily: fonts.Lato.regular,
    fontWeight: '400',
    fontSize: scale(22),
    lineHeight: scale(26.4),
    color: colors.white,
  },
  titleTxt: {
    fontFamily: fonts.Lato.regular,
    fontWeight: '400',
    fontSize: scale(12),
    lineHeight: scale(14.4),
    letterSpacing: scale(-0.3),
    color: colors.white_50_opacity,
  },
  textInput: {
    fontFamily: fonts.Lato.regular,
    fontWeight: '400',
    fontSize: scale(16),
    lineHeight: scale(19.2),
    letterSpacing: scale(-0.3),
    color: colors.white,
    borderBottomColor: colors.c647FFF,
    borderBottomWidth: 1,
    marginHorizontal: scale(24),
    marginTop: scale(15),
    paddingBottom: scale(12),
  },
  checkAgeTxt: {
    fontFamily: fonts.Lato.regular,
    fontWeight: '400',
    fontSize: scale(14),
    lineHeight: scale(16.8),
    color: colors.white,
  },
  byClickingSignUpTxt: {
    fontFamily: fonts.Lato.regular,
    fontWeight: '500',
    fontSize: scale(12),
    lineHeight: scale(19.44),
    color: colors.white_50_opacity,
  },
  termPrivacyTxt: {
    fontFamily: fonts.Lato.regular,
    fontWeight: '500',
    fontSize: scale(12),
    lineHeight: scale(19.44),
    color: colors.c647FFF,
  },
  signUpTxt: {
    fontFamily: fonts.Lato.regular,
    fontWeight: '500',
    fontSize: scale(16),
    lineHeight: scale(19.22),
    color: colors.white,
  },
});
