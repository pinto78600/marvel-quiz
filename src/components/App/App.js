import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import '../../App.css';
import ErrorPage from '../ErrorPage/ErrorPage';
import Header from '../Header/Header';
import Landing from '../Landing/Landing';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import Welcome from '../Welcome/Welcome';
import Footer from '../Footer/Footer';
import ForgetPassword from '../forgetPassword/ForgetPassword';
import { IconContext } from 'react-icons';


function App() {
  return (
    <Router>
      <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
        <Header />

        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/welcome" component={Welcome} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/forgetpassword" component={ForgetPassword} />
          <Route component={ErrorPage} />
        </Switch>

        <Footer />
      </IconContext.Provider>
    </Router>
  );
}

export default App;