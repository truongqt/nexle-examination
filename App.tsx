import React from 'react';
import {SafeAreaView} from 'react-native';
import {Provider} from 'react-redux';
import rootStore from './src/redux-manager/root-store';
import AuthenticationScreen from './src/screens/Authentication/AuthenticationScreen';

const App = () => {
  return (
    <Provider store={rootStore}>
      <SafeAreaView style={{flex: 1}}>
        <AuthenticationScreen />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
