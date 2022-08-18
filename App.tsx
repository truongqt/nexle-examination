import {ThemeProvider} from '@shopify/restyle';
import React, {useState} from 'react';
import {Provider} from 'react-redux';
import {lightTheme, theme} from 'utils/themes/theme';
import AppNavigation from './src/navigation/AppNavigation';
import rootStore from './src/redux-manager/root-store';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Provider store={rootStore}>
      <ThemeProvider theme={darkMode ? theme : lightTheme}>
        <AppNavigation />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
