import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { Login } from './components/Login';
import { SignUp } from './components/SignUp';
import { Home } from './components/Home';
import { Movies, MovieForm } from './components/Movies';


const Logout = () => {
  localStorage.removeItem('netflixToken');
  return <Redirect to='/login' />
}

export default [
  <Route exact path='/login' component={Login} key={1} />,
  <Route exact path='/signup' component={SignUp} key={2} />,
  <Route exact path='/logout' component={Logout} key={3} />,
  <Route exact path='/' component={Home} key={4} />,
  <Route exact path='/movies' component={Movies} key={5} />,
  <Route exact path='/movies/add' component={MovieForm} key={6} />
]
