import { ThemeProvider } from '@shopify/restyle';
import React, { useState } from 'react';
import { Switch } from 'react-native';
import {Provider} from 'react-redux';
import {lightTheme, theme} from 'utils/themes/theme';
import AppNavigation from './src/navigation/AppNavigation';
import rootStore from './src/redux-manager/root-store';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <Provider store={rootStore}>
      <ThemeProvider theme={darkMode ? theme : lightTheme}>
        <Switch
          value={darkMode}
          onValueChange={value => {
            setDarkMode(value);
          }}
          style={{marginTop: 50}}
        />
        <AppNavigation />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
