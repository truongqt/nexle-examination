import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {FirstScreenName, StackParamList} from 'navigation/ScreenProps';
import {StackNavigationProp} from '@react-navigation/stack';
import CView from 'components/CView/CView';

const ThirdScreen = () => {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  const onPressGoHome = () => {
    navigation.navigate(FirstScreenName);
  };

  const onPressGoBack = () => {
    navigation.goBack();
  };
  return (
    <CView p="xl" alignItems="center"
    
    >
      <Button title="Go Back" onPress={onPressGoBack} />

      <Text>ThirdScreen</Text>
      <Button title="Go Home" onPress={onPressGoHome} />
    </CView>
  );
};

export default ThirdScreen;

const styles = StyleSheet.create({});
