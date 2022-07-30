import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux-manager/root-reducer';
import {AppDispatch} from '../../redux-manager/root-store';
import {
  signIn,
  SignInRequestPayload,
  signUp,
  SignUpRequestPayload,
} from '../../redux-manager/user/thunk';
import {SAVED_USER_PROFILE} from '../../utils/helpers/constants';
import storage from '../../utils/helpers/storage';

const AuthenticationScreen = () => {
  const dispatch: AppDispatch = useDispatch();
  const {userProfile, isRequesting} = useSelector(
    (state: RootState) => state.user,
  );

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

  return (
    <View>
      <Text>AuthenticationScreen</Text>
      <Button title="Sign In" onPress={signInBtn} />
      <Button title="Sign Up" onPress={signUpBtn} />
      <Button title="Read Storage" onPress={readStorage} />
      <Text>isRequesting: {!!isRequesting ? 'Loading' : 'Done'}</Text>
      <Text>email: {userProfile?.email}</Text>
      <Text>email: {userProfile?.displayName}</Text>
      <Text>email: {userProfile?.firstName}</Text>
      <Text>email: {userProfile?.lastName}</Text>
      <Text>email: {userProfile?.token}</Text>
    </View>
  );
};

export default AuthenticationScreen;

const styles = StyleSheet.create({});
