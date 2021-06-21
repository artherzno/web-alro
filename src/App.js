import React, { createContext, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import Main from './pages/Main';
import Footer from './components/Footer';
import './App.scss';
import {  createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { mdiScale } from '@mdi/js';
import { thTH } from '@material-ui/core/locale';

import Cookies from 'js-cookie'

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

const AuthData = { port: 3800, hostname: '147.50.143.84' } ;
const hostname = window.location.hostname;


function App() {

  useEffect(() => {console.warn('hi app')
    // Check Port
    if(hostname !== 'localhost') {
      AuthData.hostname = hostname;
    } 
    console.warn('Cookie', document.cookie)
    console.log(AuthData);
    console.log('process.env',process.env)
    console.log('process.env.REACT_APP_API_HOST',process.env.REACT_APP_API_HOST)
  }, [])

  return (
  <AuthContext.Provider value={AuthData}>
    <ThemeProvider theme={theme}>
      <div className="App">

      <Router>
        <Main />
        <Footer />
      
        </Router>
      </div>
    </ThemeProvider>
  </AuthContext.Provider>
  );
}

export { AuthContext }
export default App;
