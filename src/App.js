
import React from 'react';
import Navbar from './comps/Navbar';
import UploadForm from './comps/UploadForm';
import ImageLayout from './comps/ImageLayout';
import UploadButton from './comps/UploadButton';
import { useState } from 'react'
import Modal from './comps/Modal';

function App() {
  // const [data, setData] = React.useState(null);

  // React.useEffect(() => {
  //   fetch("/api")
  //     .then((res) => res.json())
  //     .then((data) => setData(data.message));
  //   console.log(data)
  // }, []);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(prev => !prev);
  };


  return (
    <div>

      <Navbar />

      {/* <UploadForm></UploadForm> */}
      <div className="BtContainer">
        <button onClick={openModal}> New Photo </button>
      </div>


      {/* <ImageLayout /> */}
      <Modal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
}

export default App;
