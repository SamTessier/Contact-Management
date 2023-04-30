import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

function Root() {
  return (
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);