import React, { useState } from 'react'
import Modal from './Modal';



const UploadButton = () => {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(prev => !prev);
  };
  return (
    <div className="BtContainer">
      <button onClick={openModal}>New Photo</button>
      <Modal showModal={showModal} setShowModal={setShowModal}> </Modal>
    </div>
  )
}

export default UploadButton