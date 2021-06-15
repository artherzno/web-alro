import React, { createContext } from 'react';
import Main from './pages/Main';
import Footer from './components/Footer';
import './App.scss';
import {  createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { mdiScale } from '@mdi/js';
import { thTH } from '@material-ui/core/locale';

const AuthContext = createContext();

const theme = createTheme({
  typography: {
    fontFamily: [
      'Kanit',
      'sans-serif'
    ]
  },
  palette: {
    primary: {
      main: '#2284d0',
      outline: 'transparent'
    },
    secondary: {
      main: '#da2828',
      outline: 'transparent'
    },
    yellow: {
      main: '#ffff00'
    },
    common: {
      headerTable: "#F1F1F1"
    },
  },
}, thTH)

const AuthData = { port: 3800, password: '1234'}

function App() {
  return (
  <AuthContext.Provider value={AuthData}>
    <ThemeProvider theme={theme}>
      <div className="App">
        <Main />
        <Footer />
      </div>
    </ThemeProvider>
  </AuthContext.Provider>
  );
}

export { AuthContext }
export default App;
