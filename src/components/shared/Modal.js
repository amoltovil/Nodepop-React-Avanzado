import * as React from "react";
import { createPortal } from "react-dom";

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
  padding: 1.875rem 0.9375rem 1.875rem 0.9375rem;
`;

const STitle = styled.h5`
  margin-bottom: 0.3125rem;
`;

const SButton = styled.button`
  border-top: 1px solid #F0F0F0;
  color: #6D087C;
  cursor: pointer;
  font-weight: bold;
  padding: 0.9375rem;
  width: 100%;
`;

const SDescription = styled.span`
  color: #C1C1C1;
  text-align: center;
`;

const Modal = ({ isVisible, hideModal, message, onConfirm }) => {
  
  return isVisible
  ? createPortal(
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
              <SDescription>
              {message}
              </SDescription>
          </SHeader>
           <SButton onClick={onConfirm}>
              Confirm
            </SButton>
            <SButton onClick={hideModal}>
              Cancel
            </SButton>
          </SModal>
        </SModalWrapper>
      </React.Fragment>,
      document.body,
    )
  : null;

};
export default Modal;

// import React, { createRef, useState} from 'react';
// import { Modal, Button } from 'antd';


// const WindowModal = ({ message, onConfirm, show}) => {
//     const [isModalVisible, setIsModalVisible] = useState(false);

//     const showModal = () => {
//         setIsModalVisible(true);
//       };
    
//     const handleOk = () => {
//         onConfirm();
//         setIsModalVisible(false);
//       };
    
//       const handleCancel = () => {
//         setIsModalVisible(false);
//       };
    
//       return (
//         <>
//           {/* <Button type="primary" onClick={showModal}>
//             Open Modal
//           </Button> */}
//               <Modal show={setIsModalVisible} title="Confirmación por el usuario"
//                   visible={isModalVisible}
//                   onOk={handleOk}
//                   onCancel={handleCancel}>
//                   <p>{message}</p>
//           </Modal>
//         </>
//       );
//     };
 
// export default WindowModal;