
import React, { useEffect } from 'react';
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
  const [searchTerm, setSearchTerm] = useState('');
  const [distinctTerms, setDistinctTerms] = useState([]); 
  const openModal = () => {
    setShowModal(prev => !prev);
  };
  
  useEffect(() => {
    if (distinctTerms){
      console.log("distinct term received in app.js=  " +distinctTerms);
    }
  },[distinctTerms])
  return (
    <div>

      <Navbar 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}
        distinctTerms={distinctTerms}
        setDistinctTerm={setDistinctTerms}
        />

    
      <div className="BtContainer">
        <button onClick={openModal}> New Photo </button>
      </div>

      
      {/* <ImageLayout /> */}
      <Modal 
        showModal={showModal} 
        setShowModal={setShowModal} 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        distinctTerms={distinctTerms}
        setDistinctTerms={setDistinctTerms}/>
    </div>
  );
}

export default App;
