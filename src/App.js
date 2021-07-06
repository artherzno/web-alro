import React, { createContext, useEffect } from 'react';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import Main from './pages/Main';
import Footer from './components/Footer';
import './App.scss';
import {  createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
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

// const AuthData = { port: 3800, hostname: '127.0.0.1' } ;
const AuthData = { port: 3800, production: 'https://spk.mirasoft.co.th', hostname: 'https://spkapi.mirasoft.co.th', portinvoice: 8055 } ;
// const hostname = window.location.hostname;
const hostname = 'https://spkapi.mirasoft.co.th';


function App() {

  useEffect(() => {console.warn('hi app')
    // Check Port
    // if(hostname !== 'localhost') {
    //   AuthData.hostname = hostname;
    // } 
    console.log(AuthData);
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
