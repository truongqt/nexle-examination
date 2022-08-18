import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useCalculator} from 'util/calculator';
import {Button} from 'components/Button';

const MyCalculator = () => {
  const {
    currentValue,
    pressNumber,
    pressOperator,
    pressClear,
    pressPosNeg,
    pressPercentage,
    pressEqual,
  } = useCalculator();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView>
        <Text style={styles.value}>
          {parseFloat(currentValue).toLocaleString()}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Button text="C" theme="secondary" onPress={() => pressClear()} />
          <Button text="+/-" theme="secondary" onPress={() => pressPosNeg()} />
          <Button
            text="%"
            theme="secondary"
            onPress={() => pressPercentage()}
          />
          <Button text="/" theme="accent" onPress={() => pressOperator('/')} />
        </View>

        <View style={{flexDirection: 'row'}}>
          <Button text="7" onPress={() => pressNumber('7')} />
          <Button text="8" onPress={() => pressNumber('8')} />
          <Button text="9" onPress={() => pressNumber('9')} />
          <Button text="x" theme="accent" onPress={() => pressOperator('*')} />
        </View>

        <View style={{flexDirection: 'row'}}>
          <Button text="4" onPress={() => pressNumber('4')} />
          <Button text="5" onPress={() => pressNumber('5')} />
          <Button text="6" onPress={() => pressNumber('6')} />
          <Button text="-" theme="accent" onPress={() => pressOperator('-')} />
        </View>

        <View style={{flexDirection: 'row'}}>
          <Button text="1" onPress={() => pressNumber('1')} />
          <Button text="2" onPress={() => pressNumber('2')} />
          <Button text="3" onPress={() => pressNumber('3')} />
          <Button text="+" theme="accent" onPress={() => pressOperator('+')} />
        </View>

        <View style={{flexDirection: 'row'}}>
          <Button text="0" size="double" onPress={() => pressNumber('0')} />
          <Button text="." onPress={() => pressNumber('.')} />
          <Button text="=" theme="accent" onPress={() => pressEqual()} />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default MyCalculator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202020',
    justifyContent: 'flex-end',
    // borderColor: 'red',
    // borderWidth: 2
  },
  value: {
    color: '#fff',
    fontSize: 40,
    textAlign: 'right',
    marginRight: 20,
    marginBottom: 10,
  },
});
