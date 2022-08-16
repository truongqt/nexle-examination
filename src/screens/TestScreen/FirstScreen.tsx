import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { SecondScreenName, StackParamList } from 'navigation/ScreenProps'
import { StackNavigationProp } from '@react-navigation/stack'
import CView from 'components/CView/CView'
import CText from 'components/CText/CText'
import MyToast from 'components/CustomModule/ToastExp'

import { SignInRequestPayload } from 'mobx/UserStore'

const FirstScreen = () => {
    const navigation = useNavigation<StackNavigationProp<StackParamList>>();

    const onPressGoToSecond = () => {
        navigation.navigate(SecondScreenName);  
    }

    const onPressSignInBtn = () => {
      const SignInRequestPayload: SignInRequestPayload = {
        email: 'User2@gmail.com',
        password: 'User2@gmail.com',
      };
    }

    const onPressShowShortToast = () => {
      MyToast.show('Short', MyToast.SHORT);
    };

    const onPressShowLongToast = () => {
      MyToast.show('Long', 2222);
    }

  return (
    <CView 
    p='xl'
    alignItems='center'
    style={{
        backgroundColor : 'gold'
    }}
    >
      <CText 
      variant='default'
      >FirstScreen</CText>
        <Button 
        title='Go To Second'
        onPress={onPressGoToSecond}
        />
        <Button 
        title='Sign In'
        onPress={onPressSignInBtn}
        />
        <Button 
        title='Show Long Toast'
        onPress={onPressShowLongToast}
        />
        <Button 
        title='Show Short Toast'
        onPress={onPressShowShortToast}
        />
    </CView>
  )
}

export default FirstScreen

const styles = StyleSheet.create({})