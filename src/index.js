import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './AuthContext';

const Root = () => {
  return (
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
}

ReactDOM.render(<Root />, document.getElementById("root"));