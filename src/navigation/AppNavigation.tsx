import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoadingModal from 'components/Loading/LoadingModal';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from 'redux-manager/root-reducer';
import AuthenticationScreen from 'screens/Authentication/AuthenticationScreen';
import CategoriesScreen from 'screens/Categories/CategoriesScreen';
import FirstScreen from 'screens/TestScreen/FirstScreen';
import SecondScreen from 'screens/TestScreen/SecondScreen';
import ThirdScreen from 'screens/TestScreen/ThirdScreen';
// import StartingScreen from 'screens/Starting/StartingScreen';
import {AuthenticationScreenName, CategoriesScreenName, FirstScreenName, SecondScreenName, StartingScreenName, ThirdScreenName} from './ScreenProps';

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
          {/* <Stack.Screen
            name={AuthenticationScreenName}
            component={AuthenticationScreen}
          />
          <Stack.Screen
            name={CategoriesScreenName}
            component={CategoriesScreen}
          /> */}
          <Stack.Screen name={FirstScreenName} component={FirstScreen} />
          <Stack.Screen name={SecondScreenName} component={SecondScreen} />
          <Stack.Screen name={ThirdScreenName} component={ThirdScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      {showLoadingModal ? <LoadingModal /> : null}
    </>
  );
};

export default AppNavigation;

const styles = StyleSheet.create({});
