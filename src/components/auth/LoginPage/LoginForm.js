import React from 'react';
import T from 'prop-types';

import Button from '../../shared/Button';
import FormField from '../../shared/FormField';
import useForm from '../../../hooks/useForm';

import './LoginForm.css';

function LoginForm({ onSubmit, isLoading }) {
  const [credentials, handleChange, handleSubmit] = useForm({
    email: '',
    password: '',
    rememberMe: false,
  });

  //   const handleUsernameChange = event => {
  //     const newCredentials = { ...credentials, username: event.target.value };
  //     setCredentials(newCredentials);
  //   };

  //   const handlePasswordChange = event => {
  //     const newCredentials = { ...credentials, password: event.target.value };
  //     setCredentials(newCredentials);
  //   };

 
  const handleFormSubmit = ev => {
    onSubmit(credentials);
  };

  //   const validatePassword = () => {
  //     return /abcd/.test(credentials.password);
  //   };

  const { email, password, rememberMe } = credentials;

  return (
    <form className="loginForm" onSubmit={handleSubmit(handleFormSubmit)}>
      <FormField
        type="text"
        name="email"
        label="Introduzca su email"
        className="loginForm-field"
        value={email}
        onChange={handleChange}
        autofocus
      />
      <FormField
        type="password"
        name="password"
        label="password"
        className="loginForm-field"
        value={password}
        onChange={handleChange}
      />
      <Button
        type="submit"
        className="loginForm-submit"
        variant="primary"
        disabled={isLoading || !email || !password}
      >
        Log in
      </Button>
      <br /> <br/>
      <FormField
        type="checkbox"
        name="rememberMe"
        label="Recordar Contraseña"
        className="loginForm-checkbox"
        checked={rememberMe}
        // onChange={handleChangeCheckbox}
        onChange={ handleChange}
      />
    </form>
  );
}

LoginForm.propTypes = {
  onSubmit: T.func.isRequired,
  isLoading: T.bool,
};

LoginForm.defaultProps = {
  isLoading: false,
};

export default LoginForm;
