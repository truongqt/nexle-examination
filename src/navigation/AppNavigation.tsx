import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoadingModal from 'components/Loading/LoadingModal';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from 'redux-manager/root-reducer';
import AuthenticationScreen from 'screens/Authentication/AuthenticationScreen';
import CategoriesScreen from 'screens/Categories/CategoriesScreen';
import {AuthenticationScreenName, CategoriesScreenName} from './ScreenProps';

const Stack = createStackNavigator();

const AppNavigation = () => {
  const {showRequestStatus} = useSelector((state: RootState) => state.ui);
  const [showLoadingModal, setShowLoadingModal] = useState(false);

  useEffect(() => {
    setShowLoadingModal(!!showRequestStatus);
    return () => {
      setShowLoadingModal(false);
    };
  }, [showRequestStatus]);

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
          }}>
          {/* <Stack.Screen name={StartingScreenName} component={StartingScreen} /> */}
          <Stack.Screen
            name={AuthenticationScreenName}
            component={AuthenticationScreen}
          />
          <Stack.Screen
            name={CategoriesScreenName}
            component={CategoriesScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
      {showLoadingModal ? <LoadingModal /> : null}
    </>
  );
};

export default AppNavigation;

const styles = StyleSheet.create({});
