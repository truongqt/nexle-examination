import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import AuthenticationScreen from 'screens/Authentication/AuthenticationScreen';
import CategoriesScreen from 'screens/Categories/CategoriesScreen';
import {AuthenticationScreenName, CategoriesScreenName} from './ScreenProps';

const Stack = createStackNavigator();

const AppNavigation = () => {
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
    </>
  );
};

export default AppNavigation;

const styles = StyleSheet.create({});
