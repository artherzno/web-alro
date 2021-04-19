import Main from './pages/Main';
import Footer from './components/Footer';
import './App.scss';
import { fade, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme();
const themeGlobal = createMuiTheme({
  typography: {
    fontFamily: [
      'Kanit',
      'sans-serif'
    ]
  },
  palette: {
    primary: {
      main: '#2284d0',
    },
    secondary: {
      main: '#da2828',
    },
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: 'center',
  },
  headerTop: {
    textAlign: 'center',
    marginTop: '20px',
  },
  headerResult: {
    textAlign: 'left',
    marginTop: '20px',
  },
  h1: {
    fontSize: '24px',
  },
  h2: {
    fontSize: '20px',
  },
  buttonFluid: {
    width: '100%',
  },
  textbox: {
    width: '100%',
    fontSize: '16px',
  },
  tableNoResult: {
    backgroundColor: '#FAFAFA',
    border: '1px solid #D9D9D9',
    width: '100%',
    height: '20vh',
  },
  boostrapRoot: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  boostrapInput: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    width: '100%',
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
  boostrapInputLabel: {
    fontSize: '18px',
    color: '#262626',
  }
})

function App() {
  return (
    <ThemeProvider theme={themeGlobal}>
      <div className="App">
        <Main />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
