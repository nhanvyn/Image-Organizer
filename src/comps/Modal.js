import React, { useRef, useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import styled from 'styled-components'


export const ModalCloseButton = styled(MdClose)
export const Modal = ({ showModal, setShowModal }) => {

  
  return (
    <> {showModal ? (
      <div className='ModalWrapper'>
        <div className='ModalContent'>
          <h1> ImagePreview </h1>
        </div>
        <div className='ModalCloseButton'
          onClick={() => setShowModal(prev => !prev)}
        />
      </div>

    ) : null}
    </>
  )
};
export default Modal