import { useState } from 'react';

const useModal = (initialState) => {
  const [isVisible, setIsVisible] = useState(initialState);
  
  function toggleModal() {
    setIsVisible(!isVisible);
  }
return {
    isVisible,
    toggleModal,
  }
};
export default useModal;