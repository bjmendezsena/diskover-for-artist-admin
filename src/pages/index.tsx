import React, { useEffect } from 'react';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';

import Login from './login/';
import Dashboard from './dashboard';
import Register from './register/register';
import RecoverRequest from './recover/request';
import RecoverToken from './recover/token';

import { useSelector, useDispatch } from 'react-redux';
import { fetchMe } from '../redux/user/actions';
import { Spin } from 'antd';

import {
  getNotifications,
} from "../redux/payments/actions";

const loggedOutRoutes = ['/login', '/recover/request', '/recover/'];

const AppRouter = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { user, checkingSession } = useSelector((state: any) => state.user);

  useEffect(() => {
    dispatch(fetchMe());
  }, []);

  useEffect(() => {
    if (checkingSession === false) {
      const { pathname } = location;
      if (user) {
        // If user is logged in and outside dashboard, redirect in
        const redirect = loggedOutRoutes.some((route) =>
          pathname.startsWith(route)
        );
        if (redirect && location.pathname !== '/')
          history.push('/users/info');
      } else {
        // If user is logged out and inside dashboard, redirect out
        const redirect = loggedOutRoutes.every(
          (route) => !pathname.startsWith(route)
        );
        if (redirect && location.pathname !== '/login') history.push('/login');
      }
    }
  }, [location, checkingSession, history, user]);

  if (checkingSession) {
    const spinContainerStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
    };
    return (
      <div style={spinContainerStyle}>
        <Spin tip="Chargement..." />
      </div>
    );
  }
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/recover/request" component={RecoverRequest} />
      <Route exact path="/recover/:token" component={RecoverToken} />
      <Route path="/asd" component={Register} />
      <Route path="/" component={Dashboard} />
    </Switch>
  );
};

export default AppRouter;
