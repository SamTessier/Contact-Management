import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();
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

const root = document.getElementById('root');

if (root !== null) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
}
