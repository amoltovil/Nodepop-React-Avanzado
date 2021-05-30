import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { connect } from 'react-redux';
//import { useLocation } from 'react-router';
import LoginForm from './LoginForm';

import {
  loginAction,
  resetError,
} from '../../../store/actions';
import { getUi } from '../../../store/selectors';
import './LoginPage.css';

//function LoginPage({ onLogin }) { // con connect
function LoginPage() {

  const firstTime = React.useRef(true);
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(getUi);  // destructuring

 //const onLogin = () => dispatch(authLoginSuccess());
 //const resetError = React.useCallback(() => setError(), []);
 //const resetError = () => setError(null);
  
  React.useEffect(() => {
    if (firstTime) {
      // Do things only the first time
      firstTime.current = false;
    }
  });

  const handleSubmit = credentials => {
    dispatch(loginAction(credentials))
  };

  return (
    <div className="loginPage">
      <h1 className="loginPage-title">Log in to Nodepop</h1>
      {isLoading && 'Loading...'}
      <LoginForm isLoading={isLoading} onSubmit={handleSubmit} />
      {error && (
        <div onClick={()=> dispatch(resetError())} className="loginPage-error">
          {error.message}
        </div>
      )}
    </div>
  );
}

// const mapDispatchToProps = dispatch => ({
//   onLogin: () => dispatch(authLoginSuccess()),
// });

// export default connect(null, mapDispatchToProps)(LoginPage);

export default LoginPage;