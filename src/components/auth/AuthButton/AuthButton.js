import React, { useState } from 'react';
import T from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from '../../shared';
import { logout } from '../../../api/auth';
import { AuthContextConsumer } from '../context';
import Modal from './../../shared/Modal';
import useModal from './../../../hooks/useModal';

const AuthButton = ({ className, isLogged, onLogout }) => {
  const {isVisible, toggleModal} = useModal(true);  
//   return (
//     <div>
//       <button onClick={toggleModal}>
//         Show modal
//       </button>
//       <Modal isVisible={isVisible} hideModal={toggleModal} />
//     </div>
//   );
// };  

  // // Código para la ventana modal
  // const [active, setActive] = useState(true);

  // const toggle = () => {
  //   setActive(!active);
  // }

  const handleLogoutClick = () => {
    
    // Confirmación de logout  
    const res = window.confirm("Confirme que desea salir de la aplicación Nodepop");
     if (res == true) {
       logout().then(onLogout);
     }
    
    // return (
    //    <Modal
    //     isVisible={isVisible}
    //     hideModal={toggleModal}
    //     message = 'Confirme que desea salir de la aplicación Nodepop'
    //     onConfim={onConfirm}
    //   >
    
    //   </Modal>);
  
  };

  const props = isLogged
    ? { onClick: handleLogoutClick, children: 'Log out' }
    : {
        as: Link,
        to: '/login',
        children: 'Log in',
      };

  return <Button className={className} {...props} />;
};

AuthButton.propTypes = {
  className: T.string,
  isLogged: T.bool,
  onLogout: T.func.isRequired,
};

AuthButton.defaultProps = {
  isLogged: false,
};

const ConnectedAuthButton = props => {
  return (
    <AuthContextConsumer>
      {value => {
        return (
          <AuthButton
            isLogged={value.isLogged}
            onLogout={value.onLogout}
            {...props}
          />
        );
      }}
    </AuthContextConsumer>
  );
};

export default ConnectedAuthButton;