import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const theme = createTheme({
  palette: {
    primary: {
      main: '#EFBD26',
    },
    secondary: {
      main: '#455A64',
    },
    text: {
      primary: '#00000',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
    },
  },
});

const Root = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
}

ReactDOM.render(<Root />, document.getElementById("root"));
