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

let AuthData = { port: 3800, hostname: '', portinvoice: 8055, spkapi: '' } ;
const hostname = window.location.hostname;

// Check Endpoint
if(hostname !== 'localhost') {
  console.log('API - PRODUCTION', hostname)
  AuthData.hostname = 'https://loanfund.alro.go.th/nodeapi';
  localStorage.setItem('hostname', 'https://loanfund.alro.go.th/nodeapi')// p.hanz
  localStorage.setItem('spkapi', 'https://loanfund.alro.go.th/spkapi')// p.benz
  localStorage.setItem('siteprint', 'https://loanfund.alro.go.th/api') // j.som
  localStorage.setItem('siteimage', 'https://loanfund.alro.go.th/') // image
} else {
  console.log('API - IP', hostname)
  AuthData.hostname ='http://147.50.143.84:5441/nodeapi' // p.hanz
  localStorage.setItem('hostname', 'http://147.50.143.84:5441/nodeapi') // p.hanz
  AuthData.spkapi ='http://147.50.143.84:3800' // k.benz
  localStorage.setItem('spkapi', 'http://147.50.143.84:3800') // k.benz
  localStorage.setItem('siteprint', 'http://147.50.143.84/api') // j.som
  localStorage.setItem('siteimage', 'http://147.50.143.84/') // image

}
console.warn('hi app')


function App() {
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
