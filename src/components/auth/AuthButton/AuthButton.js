import React from 'react';
import T from 'prop-types';
import { Link } from 'react-router-dom';
import { logout } from '../../../api/auth';
import { Confirmation } from '../../shared';
import { connect } from 'react-redux';
import { getIsLogged } from '../../../store/selectors';
import { authLogout } from '../../../store/actions';

const AuthButton = ({ className, isLogged, onLogout}) => {
  
  // const handleLogoutClick = () => {
  //   // Confirmación de logout  (anterior)
  //   const res = window.confirm("Confirme que desea salir de la aplicación Nodepop");
  //   if (res == true) {
  //     logout().then(onLogout);
  //   }
  // };

  const handleLogoutConfirm = async () => {
    await logout().then(onLogout);    
  };

  return isLogged ? (
    <Confirmation
      message="Confirme que desea salir de la aplicación Nodepop"
      onConfirm={handleLogoutConfirm}
    >
      Logout
    </Confirmation>
  ) : (
    <Link to="/login">Login</Link>
  );
};

AuthButton.propTypes = {
  className: T.string,
  isLogged: T.bool,
  onLogout: T.func.isRequired,
};

AuthButton.defaultProps = {
  isLogged: false,
};

// const ConnectedAuthButton = props => {
//   return (
//     <AuthContextConsumer>
//       {value => {
//         return (
//           <AuthButton
//             isLogged={value.isLogged}
//             onLogout={value.onLogout}
//             {...props}
//           />
//         );
//       }}
//     </AuthContextConsumer>
//   );
// };

// export default ConnectedAuthButton;

//const mapStateToProps = (state, ownProps) => console.log(ownProps) || { isLogged: getIsLogged(state) };
const mapStateToProps = (state, ownProps) => ({ isLogged: getIsLogged(state) });

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(authLogout()), 
});

// es lo mismo que lo de arriba, es un objecto donde si las acciones 
// const mapDispatchToProps = {
//   onLogout: authLogout,
// };

// const mapDispatchToProps = {
//   onLogout,
//}

//const mapDispatchToProps = authActions;

export default connect(mapStateToProps, mapDispatchToProps)(AuthButton);