import React from 'react';
import {Provider} from 'react-redux';
import AppNavigation from './src/navigation/AppNavigation';
import rootStore from './src/redux-manager/root-store';

const App = () => {
  return (
    <Provider store={rootStore}>
      <AppNavigation />
    </Provider>
  );
};

export default App;
