import React from 'react';
//import T from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { LoginPage, PrivateRoute } from './components/auth';
import { AdvertsPage, NewAdvertPage, AdvertPage} from './components/adverts';
import { NotFoundPage } from './components/shared';

function App() {
 
  React.useEffect(() => {
 //   console.log(ref.current);
  }, []);

  //const handleLogin = () => {
    
    //setIsLogged(true);
    //store.dispatch(authLoginSuccess());
    
  //};

  //const handleLogout = () => setIsLogged(false);
  //const handleLogout = () => {
   // store.dispatch(authLogout());
  //}

  // const authValue = {
  //   isLogged: false, //store.getState().auth,
  //   onLogout: handleLogout,
  //   onLogin: handleLogin,
  // };

  return (
    <div className="App">
  
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
          {/* {routeProps => <AdvertPage ref={ref} {...routeProps} />} */}
             {routeProps => <AdvertPage {...routeProps} />}
          </PrivateRoute>
          <PrivateRoute exact path="/adverts">
            <AdvertsPage />
          </PrivateRoute>
          <PrivateRoute path="/404">
            <NotFoundPage />
          </PrivateRoute>
          <Route>
            <Redirect to="/404" />
          </Route>
        </Switch>
    </div>
  );
}

  // App.propTypes = {
  // //  isInitiallyLogged: T.bool.isRequired,
  // };

export default App;

