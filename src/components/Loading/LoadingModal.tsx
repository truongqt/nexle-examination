import {ActivityIndicator, Modal, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from 'assets';

const LoadingModal = () => {
  return (
    <Modal transparent visible={true}>
      <View
        style={{
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator size="small" color={colors.error.good} />
      </View>
    </Modal>
  );
};

export default LoadingModal;

const styles = StyleSheet.create({});
