import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AuthenticationScreen from '../screens/Authentication/AuthenticationScreen';
import {AuthenticationScreenName, StartingScreenName} from './ScreenProps';
import StartingScreen from '../screens/Starting/StartingScreen';

const Stack = createStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
        }}>
        <Stack.Screen name={StartingScreenName} component={StartingScreen} />
        <Stack.Screen
          name={AuthenticationScreenName}
          component={AuthenticationScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;

const styles = StyleSheet.create({});
