import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { Home } from './components/Home';
import { Login } from './components/Login';
import { SignUp } from './components/SignUp';
import { Me } from './components/Me';
import { Movies, MovieForm, MovieDetail } from './components/Movies';
import isAuthenticated from './isAuthenticated';


const Logout = () => {
  localStorage.removeItem('netflixToken');
  return <Redirect to='/login' />
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route { ...rest } render = {
    props => (
      isAuthenticated() ? <Component { ...props } /> : <Redirect to="/login" />
    )
  }>
  </Route>
)

export default [
  <Route exact path='/' component={Home} key={1} />,
  <Route exact path='/login' component={Login} key={2} />,
  <Route exact path='/signup' component={SignUp} key={3} />,
  <PrivateRoute exact path='/me' component={Me} key={4} />,
  <PrivateRoute exact path='/logout' component={Logout} key={5} />,
  <PrivateRoute exact path='/movies' component={Movies} key={6} />,
  <PrivateRoute exact path='/movies/add' component={MovieForm} key={7} />,
  <PrivateRoute exact path='/movie/:id' component={MovieDetail} key={8} />
]
