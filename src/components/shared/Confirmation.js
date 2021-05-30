import React from 'react';
import { Button} from '../shared'
import T from 'prop-types';
import styled from "styled-components";

const SModalOverlay = styled.div`
  background-color: #999999;
  height: 100vh;
  left: 0;
  opacity: 0.5;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 500;
`;

const SModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  left: 0;
  outline: 0;
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  top: 25%;
  width: 100%;
  z-index: 1000;
`;

const SModal = styled.div`
  align-items: center;
  background: white;
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  margin: 1.875rem;
  max-width: 500px;
  position: relative;
  z-index: 100;
`;

const SHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 0.875rem 0.9rem 0.875rem 0.9rem;
`;

const STitle = styled.h4`
  margin-bottom: 0.3125rem;
`;

const SButton = styled.button`
  
  border-radius: 9999px;
  border-style: solid;
  border-width: 1px;
  border-color: rgb(100, 200, 30);
  color: #6D087C;
  cursor: pointer;
  font-weight: bold;
  /* padding: 0.5rem; */
  display: inline-block;
  font: inherit;
  min-height: 26px;
  justify-content: center;
  min-width: 72px;
  outline-style: none;
  margin: 4px;
  
`;

const SDescription = styled.span`
  color: #6D087C;
  text-align: center;
  font-size: small;
  padding: 1rem 0.9375rem 1rem 0.9375rem;
`;


function Confirmation({ message, onConfirm, ...props }) {
  const [confirmationVisible, setConfirmationVisible] = React.useState(false);

  const showConfirmation = () => setConfirmationVisible(true);
  const hideConfirmation = () => setConfirmationVisible(false);

  const handleClick = showConfirmation;
  const handleConfirmClick = () => {
    hideConfirmation();
    onConfirm();
  };
  const handleCancelClick = hideConfirmation;

  return (
    <>
      <Button onClick={handleClick} {...props} />
      {confirmationVisible && (
      <React.Fragment>
        <SModalOverlay />
          <SModalWrapper
            aria-modal={true}
            aria-hidden={true}
            tabIndex={-1}
            role="dialog"
          >
          <SModal>
            <SHeader>
              <STitle>Confirmación Usuario</STitle>
            </SHeader>
            <SDescription>
              {message}
            </SDescription>    
            <SButton onClick={handleConfirmClick}>Ok</SButton>
            <SButton onClick={handleCancelClick}>Cancel</SButton>
          </SModal>
       </SModalWrapper>    
      </React.Fragment>
    )}
    </>
  );
}

Confirmation.propTypes = {
  confirmation: T.node,
  onConfirm: T.func.isRequired,
};

Confirmation.defaultProps = {
  confirmation: null,
};

export default Confirmation;