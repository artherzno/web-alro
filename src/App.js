import Main from './pages/Main';
import Footer from './components/Footer';
import './App.scss';
import { fade, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { mdiScale } from '@mdi/js';

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
      outline: 'transparent'
    },
    secondary: {
      main: '#da2828',
      outline: 'transparent'
    },
    green: {
      color: '#27AE60',
      fill: '#27AE60',
      outline: 'transparent'
    },
    common: {
      headerTable: "#F1F1F1"
    },
  },
  paletteCheck: {
    color: '#2284d0',
    '&$checked': {
      color: '#2284d0',
    },
  },
  iconGreen: {
    color: '#27AE60',
    fill: '#27AE60',
    width: '1em',
    height: '1em',
    display: 'inline-block',
    fontSize: '1.5rem',
    transition: 'fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    flexShrink: '0',
    userSelect: 'none',
  },
  iconRed: {
    color: '#da2828',
    fill: '#da2828',
    width: '1em',
    height: '1em',
    display: 'inline-block',
    fontSize: '1.5rem',
    transition: 'fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    flexShrink: '0',
    userSelect: 'none',
  },
  boxDashed: {
    border: '1px dashed #D9D9D9',
    padding: '40px',
    backgroundColor: '#FAFAFA',
    width: '100%',
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
  buttonNormal: {
    fontSize: '16px',
  },
  buttonFluid: {
    width: '100%',
    fontSize: '16px',
  },
  buttonRow: {
    margin: '35px 0',
  },
  buttonFluidOutlinePrimary: {
    backgroundColor: 'transparent',
    border: '1px solid #2284d0',
    color: '#2284d0',
    width: '100%',
  },
  buttonOutlinePrimary: {
    backgroundColor: 'transparent',
    border: '1px solid #2284d0',
    color: '#2284d0',
    minWidth: '190px',
  },
  buttonOutlineGrey: {
    backgroundColor: 'transparent',
    border: '1px solid #E2E2E2',
    color: '#262626',
    minWidth: '190px',
  },
  textbox: {
    width: '100%',
    fontSize: '16px',
  },
  inputfile: {
    display: 'none',
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
    fontSize: '16px',
    color: '#262626',
    transform: 'scale(1)',
  },
  boostrapInputLabelHeader: {
    fontSize: '18px',
    color: '#262626',
    transform: 'scale(1)',
  },
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
