import React from 'react';

const useForm = initialValue => {
  const [value, setValue] = React.useState(initialValue);

  const handleChange = ev => {
    let value;
    switch (ev.target.type) {
      case 'checkbox':
        value = ev.target.checked;
        break;
      case 'file':
        value = ev.target.files[0];
        break;
      case 'select-multiple':
        value = Array.from(ev.target.selectedOptions, option => option.value);
        break;
      case 'number':
      default:
        value = ev.target.value;
        break;
    }
  
   setValue(oldValue => ({
    ...oldValue,
    [ev.target.name]: value, 
  }))
     
  }

  const handleSubmit = afterPreventDefault => {
    // Closure
    return ev => {
      ev.preventDefault();    
      afterPreventDefault(ev);
    };
  };

  return [value, handleChange, handleSubmit];
};

export default useForm;