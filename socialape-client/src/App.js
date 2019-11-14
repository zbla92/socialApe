import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

// Components
import Navbar from './components/Navbar';

// Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const theme = createMuiTheme({
    palette: {
      primary: {
        light: '#9bc0ff',
        main: '#82b1ff',
        dark: '#5b7bb2',
        contrastText: '#fff'
      },
      secondary: {
        light: "#ffb199",
        main: '#ff9e80',
        dark: '#b26e59',
        contrastText: '#fff'
      }
    },
    spreadThis: {
      form:{
        textAlign: 'center',
      },
      image: {
          margin: '20px auto 20px auto'
      },
      pageTitle: {
          margin: '10px auto 10px auto'
      },
      textField: {
          margin: '10px auto 10px auto'
      },
      button:{
          marginTop: '20px',
          position: "relative"
      },
      customError:{
          color: 'red',
          fontSize: '0.8rem'
      },
      progress:{
          position: 'absolute',
      }
    }
})

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Navbar/>
          <div className="container">
            <Switch>
              <Route exact path='/' component={home} />
              <Route exact path='/login' component={login} />
              <Route exact path='/signup' component={signup} />
            </Switch>
          </div>
        </Router>
      </div>
    </MuiThemeProvider>
  );
}

export default App;