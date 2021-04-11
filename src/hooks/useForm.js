import React from 'react';

const useForm = initialValue => {
  const [value, setValue] = React.useState(initialValue);

  const handleChange = event => {
  
    if (event.target.name === 'photo') {
      //console.log('entro en handleChange photo', event.target.files[0]);
      
      setValue(oldValue => ({
        ...oldValue,
        [event.target.name]: event.target.files[0],
      }))
    }
    else if (event.target.name === 'tags') {
      //console.log('entro en handleChange tags de use form');
      let target = event.target;
      let name = target.name;
      let value = Array.from(target.selectedOptions, option => option.value);
      
      //console.log('valor de tags', value);
      setValue(oldValue => ({
        ...oldValue,
        [event.target.name]: value,
      }));
    }
    else {
      //console.log('entro aqui tambien');
      setValue(oldValue => ({
        ...oldValue,
        [event.target.name]: event.target.value,
      }));
    }
  };

  const handleChangeCheckbox = event => {
    setValue(oldValue => ({
      ...oldValue,
      [event.target.name]: event.target.checked,
    }));
  };

  const handleSubmit = afterPreventDefault => {
    // Closure
    return ev => {
      ev.preventDefault();
      
      afterPreventDefault(ev);
    };
  };

  //console.log('return value', value);
  return [value, handleChange, handleSubmit, handleChangeCheckbox];
};

export default useForm;