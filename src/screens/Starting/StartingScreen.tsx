import {CommonActions, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {DEFAULT_HEADERS} from 'apisauce';
import {
  AuthenticationScreenName,
  CategoriesScreenName,
  StackParamList,
} from 'navigation/ScreenProps';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {UserProfile} from 'redux-manager/user/slice';
import {SAVED_USER_PROFILE} from 'utils/helpers/constants';
import storage from 'utils/helpers/storage';
import {api} from 'utils/services/apis';

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
        navigation.dispatch(
          CommonActions.reset({
            routes: [{name: CategoriesScreenName}],
          }),
        );
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

  return <View />;
};

export default StartingScreen;
