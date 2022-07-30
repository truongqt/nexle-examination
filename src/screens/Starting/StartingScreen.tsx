import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {UserProfile} from '../../redux-manager/user/slice';
import storage from '../../utils/helpers/storage';
import {SAVED_USER_PROFILE} from '../../utils/helpers/constants';
import {api} from '../../utils/services/apis';
import {DEFAULT_HEADERS} from 'apisauce';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  AuthenticationScreenName,
  StackParamList,
} from '../../navigation/ScreenProps';

const StartingScreen = () => {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  useEffect(() => {
    const checkAccessToken = async () => {
      const userProfile: UserProfile = await storage.load(SAVED_USER_PROFILE);
      if (userProfile?.token) {
        api.setHeaders({
          ...DEFAULT_HEADERS,
          Authorization: 'Bearer ' + userProfile?.token,
        });
        //get User Info
      } else {
        navigation.dispatch(
          CommonActions.reset({
            routes: [{name: AuthenticationScreenName}],
          }),
        );
      }
    };

    checkAccessToken();
  }, []);

  const gotoSignIn = () => {
    navigation.navigate(AuthenticationScreenName);
  };

  return (
    <View>
      <Text>StartingScreen</Text>
      <Button title="Go to Sign In" onPress={gotoSignIn} />
    </View>
  );
};

export default StartingScreen;

const styles = StyleSheet.create({});
