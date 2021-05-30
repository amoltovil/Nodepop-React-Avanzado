import React from 'react';
import { Redirect, Route } from 'react-router-dom';
//import { useAuthContext } from '../context';
//import { connect } from 'react-redux';
import { useSelector } from 'react-redux';
import { getIsLogged } from '../../../store/selectors';


//const PrivateRoute = ({ isLogged, ...props }) => { // con connect
  const PrivateRoute = ( props ) => {  // con useSelector
 // const { isLogged } = useAuthContext();
    //const isLogged = useSelector(state => getIsLogged(state));

    const isLogged = useSelector(getIsLogged);

  return isLogged ? (
    <Route {...props} />
  ) : (
    <Route>
      {({ location }) => (
        <Redirect to={{ pathname: '/login', state: { from: location } }} />
      )}
    </Route>
  );
};

//const mapStateToProps = (state) => ({ isLogged: getIsLogged(state) });

//export default connect(mapStateToProps)(PrivateRoute);
export default PrivateRoute;
