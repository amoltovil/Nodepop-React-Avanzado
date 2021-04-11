import React from 'react';
import T from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { LoginPage, PrivateRoute } from './components/auth';
import { AdvertsPage, NewAdvertPage, AdvertPage} from './components/adverts';
import { AuthContextProvider } from './components/auth/context';
import { NotFoundPage } from './components/shared';
function App({ isInitiallyLogged }) {
  const [isLogged, setIsLogged] = React.useState(isInitiallyLogged);

  const ref = React.useRef(null);

  React.useEffect(() => {
 //   console.log(ref.current);
  }, []);

  const handleLogin = () => {
    
    setIsLogged(true);
    
  };

  const handleLogout = () => setIsLogged(false);

  const authValue = {
    isLogged,
    onLogout: handleLogout,
    onLogin: handleLogin,
  };

  return (
    <div className="App">
      <AuthContextProvider value={authValue}>
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/">
            <Redirect to="/adverts" />
          </Route>
          <PrivateRoute exact path="/advert/new">
            <NewAdvertPage />
          </PrivateRoute>
          <PrivateRoute path="/advert/:advertId">
            {routeProps => <AdvertPage ref={ref} {...routeProps} />}
          </PrivateRoute>
          {/* <PrivateRoute exact path="/">
            <AdvertsPage />
          </PrivateRoute> */}
          <PrivateRoute exact path="/adverts">
            <AdvertsPage />
          </PrivateRoute>
          {/* <PrivateRoute path="/404">
            <div
              style={{
                textAlign: 'center',
                fontSize: 48,
                fontWeight: 'bold',
              }}
            >
              404 | Not found page
            </div>
          </PrivateRoute> */}
          <PrivateRoute path="/404">
            <NotFoundPage />
          </PrivateRoute>
          <Route>
            <Redirect to="/404" />
          </Route>
        </Switch>
        </AuthContextProvider>
    </div>
  );
}

  App.propTypes = {
    isInitiallyLogged: T.bool.isRequired,
  };

export default App;

