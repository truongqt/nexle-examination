import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {StackParamList, ThirdScreenName} from 'navigation/ScreenProps';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import CView from 'components/CView/CView';

let outsideSecondValue = 1;
const outsideSecondArray = [1, 2];
const outsideSecondObject = {
  a: 1,
  b: 2,
};

const SecondScreen = () => {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  const [first, setFirst] = useState(0);

  let insideSecondValue = 1;
  const insideSecondArray = [1, 2];
  const insideSecondObject = {
    d: 1,
    e: 2,
  };
  const secondValueRef = useRef(1);
  const secondArrayRef = useRef([1, 2]);
  const secondObjectRef = useRef({
    e1: 1,
    e2: 1,
  });

  useEffect(() => {
    console.log('is Mounted');

    return () => {
      console.log('unMounted');
    };
  }, []);

  const onPressGoBack = () => {
    navigation.goBack();
  };

  const onPressGoToThird = () => {
    navigation.navigate(ThirdScreenName);
  };

  const onPressChangeAll = () => {
    outsideSecondValue = 99999999;
    outsideSecondArray[0] = 99999999;
    outsideSecondArray[1] = 99999999;
    outsideSecondObject.a = 99999999;
    outsideSecondObject.b = 99999999;

    insideSecondValue = 99999999;
    insideSecondArray[0] = 99999999;
    insideSecondArray[1] = 99999999;
    insideSecondObject.d = 99999999;
    insideSecondObject.e = 99999999;
    secondValueRef.current = 99999999;
    secondArrayRef.current[0] = 99999999;
    secondArrayRef.current[1] = 99999999;
    secondObjectRef.current.e1 = 99999999;
    secondObjectRef.current.e2 = 99999999;
  };

  const onPressPrintAll = () => {
    console.log('outsideSecondValue: ', outsideSecondValue);
    console.log('outsideSecondArray: ', JSON.stringify(outsideSecondArray));
    console.log('outsideSecondObject: ', outsideSecondObject);

    console.log('insideSecondValue: ', insideSecondValue);
    console.log('insideSecondArray: ', JSON.stringify(insideSecondArray));
    console.log('insideSecondObject: ', JSON.stringify(insideSecondObject));

    console.log('secondValueRef: ', secondValueRef);
    console.log('secondArrayRef: ', JSON.stringify(secondArrayRef.current));
    console.log('secondObjectRef: ', JSON.stringify(secondObjectRef.current));
    console.log('---------------------------');
  };

  return (
    <CView p="xl" alignItems="center">
      <Button title="Go Back" onPress={onPressGoBack} />
      <Text>SecondScreen {first}</Text>
      <Button title="Go To Third" onPress={onPressGoToThird} />
      <Button title="Change all" onPress={onPressChangeAll} />
      <Button title="Print all" onPress={onPressPrintAll} />
      <Button
        title="set state"
        onPress={() => {
          setFirst(Math.random());
        }}
      />
    </CView>
  );
};

export default SecondScreen;

const styles = StyleSheet.create({});
