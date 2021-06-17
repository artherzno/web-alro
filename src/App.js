import React, { createContext, useEffect } from 'react';
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

const AuthData = { port: 5441, hostname: '147.50.143.84'} ;
const hostname = window.location.hostname;


function App() {

  useEffect(() => {
    // Check Port
    if(hostname !== 'localhost') {
      console.log(':5441')
      AuthData.port = 5441;
      AuthData.hostname = '147.50.143.84';
    } else {
      console.log(':3800')
      AuthData.port = 3800;
      AuthData.hostname = '127.0.0.1';
    }
    console.log(AuthData);
  }, [])

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
