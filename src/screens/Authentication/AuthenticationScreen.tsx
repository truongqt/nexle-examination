import CheckBox from '@react-native-community/checkbox';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {isRejected} from '@reduxjs/toolkit';
import {DEFAULT_HEADERS} from 'apisauce';
import {colors, fonts, images} from 'assets';
import HeaderButton from 'components/HeaderButton/HeaderButton';
import LoadingModal from 'components/Loading/LoadingModal';
import {useShowRequestStatus} from 'hooks/useShowRequestStatus';
import {CategoriesScreenName, StackParamList} from 'navigation/ScreenProps';
import React, {useState} from 'react';
import {
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {RequestError} from 'redux-manager/common-type';
import {RootState} from 'redux-manager/root-reducer';
import {AppDispatch} from 'redux-manager/root-store';
import {setRequestError, UserProfile} from 'redux-manager/user/slice';
import {
  // signIn,
  // SignInRequestPayload,
  signUp,
  SignUpRequestPayload,
} from 'redux-manager/user/thunk';
import {SAVED_USER_PROFILE} from 'utils/helpers/constants';
import {device, isIos, scale} from 'utils/helpers/device';
import {
  checkPasswordStrength,
  checkValidEmail,
  PasswordStrengths,
  ValidateEmail,
} from 'utils/helpers/functions';
import storage from 'utils/helpers/storage';
import {api} from 'utils/services/apis';

const AuthenticationScreen = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  const insets = useSafeAreaInsets();
  const {isRequesting, requestError} = useSelector(
    (state: RootState) => state.user,
  );
  useShowRequestStatus(!!isRequesting);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrengths>({
    strength: 'Short',
    color: colors.error.good,
    barWidth: '100%',
  });
  const [validEmail, setValidEmail] = useState<ValidateEmail>('Invalid email');

  const onAuthenSuccess = async (profile: UserProfile) => {
    api.setHeaders({
      ...DEFAULT_HEADERS,
      Authorization: 'Bearer ' + profile.token,
    });
    await storage.save(SAVED_USER_PROFILE, profile);
  };

  const onPressSignUpBtn = async () => {
    const signUpPayload: SignUpRequestPayload = {
      firstName: 'firstName',
      lastName: 'lastName',
      email,
      password,
    };
    const res = await dispatch(signUp(signUpPayload));
    if (!isRejected(res)) {
      onAuthenSuccess(res.payload as UserProfile);
      navigation.replace(CategoriesScreenName);
    }
  };

  // const onPressSignInBtn = async () => {
  //   const signInPayload: SignInRequestPayload = {
  //     email,
  //     password,
  //   };
  //   const res = await dispatch(signIn(signInPayload));
  //   if (!isRejected(res)) {
  //     onAuthenSuccess(res.payload as UserProfile);
  //     navigation.replace(CategoriesScreenName);
  //   }
  // };

  const onChangeTextEmailInput = (value: string) => {
    setEmail(value);
    const validEmailInput = checkValidEmail(value);
    setValidEmail(validEmailInput);
    !!requestError?.errors && dispatch(setRequestError({} as RequestError));
  };

  const onChangeTextPasswordInput = (value: string) => {
    const passStrength = checkPasswordStrength(value);
    setPasswordStrength(passStrength);
    setPassword(value);
    !!requestError?.errors && dispatch(setRequestError({} as RequestError));
  };

  const renderEmailInput = () => (
    <View style={styles.emailInputContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleTxt}>{!!email && `Your email`}</Text>
      </View>
      <TextInput
        keyboardType="email-address"
        placeholder="Your email"
        placeholderTextColor={colors.white_50_opacity}
        onChangeText={value => onChangeTextEmailInput(value.toString())}
        style={styles.emailInput}
      />
      <View style={styles.validationErrorContainer}>
        <Text style={styles.validationErrorTxt}>
          {requestError?.errors?.error?.includes('Email ') &&
            requestError?.errors?.error}
          {!!validEmail && email?.length > 0 && validEmail}
        </Text>
      </View>
    </View>
  );

  const renderPasswordInput = () => (
    <View style={styles.passwordInputContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleTxt}>{!!password && `Your password`}</Text>
      </View>
      <View>
        <TextInput
          maxLength={18}
          secureTextEntry={!showPassword}
          placeholder="Your password"
          placeholderTextColor={colors.white_50_opacity}
          onChangeText={value => onChangeTextPasswordInput(value.toString())}
          style={styles.passwordInput}
        />
        <TouchableOpacity
          onPress={() => {
            setShowPassword(!showPassword);
          }}
          style={styles.toggleShowPasswordBtn}>
          <Image
            source={images.toggle_show_password}
            style={styles.toggleShowPasswordImage}
          />
        </TouchableOpacity>
        <View
          style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            height: scale(1),
            backgroundColor: passwordStrength.color,
            width: passwordStrength.barWidth,
          }}
        />
      </View>
      <View style={styles.validationErrorContainer}>
        <Text
          style={[
            styles.validationErrorTxt,
            {
              color: requestError?.errors?.error?.includes(
                'Error: Wrong email/password',
              )
                ? colors.error.week
                : passwordStrength.color,
            },
          ]}>
          {requestError?.errors?.error?.includes('Error: Wrong email/password')
            ? requestError?.errors?.error
            : password?.length > 0 && passwordStrength.strength}
        </Text>
      </View>
    </View>
  );

  const renderCheckAge = () => (
    <View style={styles.checkAgeContainer}>
      <CheckBox
        value={isChecked}
        onValueChange={() => setIsChecked(!isChecked)}
        boxType="square"
        onCheckColor={colors.white}
        tintColor={colors.c6C66FF}
        onTintColor={colors.c6C66FF}
        onAnimationType="flat"
        offAnimationType="one-stroke"
        style={styles.checkBox}
      />
      <Pressable onPress={() => setIsChecked(!isChecked)}>
        <Text style={styles.checkAgeTxt}>I am over 16 years of age</Text>
      </Pressable>
    </View>
  );

  const renderAgreeWithTermPrivactyTxt = () => (
    <View style={styles.renderAgreeWithTermPrivactyContainer}>
      <Text style={[styles.agreeWithTermPrivactyTxt]}>
        {`By clicking Sign Up, you are indicating that you have read and agree to the `}
        <Text style={styles.termPrivacyTxt}>Terms of Service</Text>
        {` and `}
        <Text style={styles.termPrivacyTxt}>Privacy Policy</Text>
      </Text>
    </View>
  );

  const renderSignUpBtn = () => (
    <TouchableOpacity
      style={styles.bottomContainer}
      disabled={
        validEmail === 'Invalid email' ||
        passwordStrength?.strength === 'Short' ||
        !isChecked
      }
      onPress={onPressSignUpBtn}>
      <Text style={styles.signUpTxt}>Sign Up</Text>
      <Image source={images.sign_in} style={styles.signInImage} />
    </TouchableOpacity>
  );

  // const renderSignInBtn = () => (
  //   <TouchableOpacity
  //     style={styles.bottomContainer}
  //     disabled={
  //       validEmail === 'Invalid email' || passwordStrength?.strength === 'Short'
  //     }
  //     onPress={onPressSignInBtn}>
  //     <Text style={styles.signUpTxt}>Sign In</Text>
  //     <Image source={images.sign_in} style={styles.signInImage} />
  //   </TouchableOpacity>
  // );

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      style={styles.container}>
      <Image source={images.authen_bg} style={styles.imageBg} />
      <HeaderButton leftIcon={images.arrow_back} />
      <LinearGradient
        colors={[colors.authen_gradient.first, colors.authen_gradient.second]}
        locations={[0.0962, 0.5296]}
        angle={180}
        style={[
          styles.linearGradient,
          {
            paddingBottom: scale(24) + insets.bottom / 2,
          },
        ]}>
        <Text style={styles.headerTxt}>Let’s get you started!</Text>
        {renderEmailInput()}
        {renderPasswordInput()}
        {renderCheckAge()}
        {renderAgreeWithTermPrivactyTxt()}
        {renderSignUpBtn()}
        {/* {renderSignInBtn()} */}
      </LinearGradient>
    </KeyboardAwareScrollView>
  );
};

export default AuthenticationScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.authen_gradient.second,
    ...StyleSheet.absoluteFillObject,
  },
  linearGradient: {
    width: '100%',
    height: isIos()
      ? device.h
      : StatusBar.currentHeight
      ? device.h - StatusBar.currentHeight
      : 0,
    paddingHorizontal: scale(24),
    justifyContent: 'flex-end',
    ...StyleSheet.absoluteFillObject,
  },
  imageBg: {
    width: '100%',
    height: scale(650),
    resizeMode: 'contain',
  },
  headerTxt: {
    fontFamily: fonts.Lato.semiBold,
    fontWeight: '400',
    fontSize: scale(22),
    lineHeight: scale(26.4),
    color: colors.white,
  },
  titleContainer: {
    height: scale(14.4),
  },
  titleTxt: {
    fontFamily: fonts.Lato.regular,
    fontWeight: '400',
    fontSize: scale(12),
    lineHeight: scale(14.4),
    letterSpacing: scale(-0.3),
    color: colors.white_50_opacity,
  },
  emailInputContainer: {
    marginTop: scale(41),
  },
  passwordInputContainer: {
    marginTop: scale(18),
  },
  emailInput: {
    fontFamily: fonts.Lato.regular,
    fontWeight: '400',
    fontSize: scale(16),
    lineHeight: scale(19.2),
    letterSpacing: scale(-0.3),
    color: colors.white,
    borderBottomColor: colors.c647FFF,
    borderBottomWidth: scale(1),
    marginTop: scale(15),
    paddingBottom: scale(12),
  },
  passwordInput: {
    fontFamily: fonts.Lato.regular,
    fontWeight: '400',
    fontSize: scale(16),
    lineHeight: scale(19.2),
    letterSpacing: scale(-0.3),
    color: colors.white,
    borderBottomColor: colors.error.short,
    borderBottomWidth: scale(1),
    marginTop: scale(15),
    paddingBottom: scale(12),
  },
  toggleShowPasswordBtn: {
    position: 'absolute',
    bottom: isIos() ? 0 : scale(5),
    right: 0,
    paddingVertical: scale(15),
    paddingLeft: scale(10),
  },
  toggleShowPasswordImage: {
    width: scale(19),
    height: scale(10),
    resizeMode: 'contain',
  },
  checkAgeContainer: {
    marginTop: scale(35),
    flexDirection: 'row',
    alignItems: 'center',
  },
  validationErrorContainer: {
    height: scale(14.4),
    marginTop: scale(8),
  },
  validationErrorTxt: {
    fontFamily: fonts.Lato.light,
    fontWeight: '400',
    fontSize: scale(12),
    lineHeight: scale(14.4),
    letterSpacing: scale(-0.3),
    textAlign: 'right',
    color: colors.error.week,
  },
  checkBox: {
    width: scale(23),
    height: scale(23),
    marginRight: scale(8),
  },
  checkAgeTxt: {
    fontFamily: fonts.Lato.regular,
    fontWeight: '400',
    fontSize: scale(14),
    lineHeight: scale(16.8),
    color: colors.white,
  },
  renderAgreeWithTermPrivactyContainer: {
    marginTop: scale(29),
  },
  agreeWithTermPrivactyTxt: {
    fontFamily: fonts.Lato.regular,
    fontWeight: '500',
    fontSize: scale(12),
    lineHeight: scale(19.44),
    color: colors.white_50_opacity,
    alignSelf: 'center',
  },
  termPrivacyTxt: {
    fontFamily: fonts.Lato.regular,
    fontWeight: '500',
    fontSize: scale(12),
    lineHeight: scale(19.44),
    color: colors.c647FFF,
    alignSelf: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scale(30),
    alignItems: 'center',
  },
  signUpBtn: {
    paddingVertical: scale(15),
    paddingRight: scale(15),
  },
  signUpTxt: {
    fontFamily: fonts.Lato.semiBold,
    fontWeight: '500',
    fontSize: scale(16),
    lineHeight: scale(19.22),
    color: colors.white,
  },
  signInImage: {
    width: scale(54),
    height: scale(54),
    resizeMode: 'contain',
  },
});
