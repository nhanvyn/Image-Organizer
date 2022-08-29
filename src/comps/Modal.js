import React, { useRef, useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import styled from 'styled-components'


export const ModalCloseButton = styled(MdClose)



export const Modal = ({ showModal, setShowModal }) => {

  const [imageArr, setImageArr] = useState([]);
  const [tagArr, setTagArr] = useState([]);

  const modalRef = useRef();
  const closeModal = e => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  }

  const onSelectFile = (e) => {
    const selectedFiles = e.target.files;
    const arr = Array.from(selectedFiles)
    const urlArray = arr.map((file) => {
      return URL.createObjectURL(file);
    })
    setImageArr((prevState) => [...prevState, ...urlArray])
  }

  const Delete = (image) => {
    setImageArr(imageArr.filter((e) => e !== image));

    URL.revokeObjectURL(image);
    image.target.value = null;
  }
  const DeleteAll = () => {
    setImageArr([])
  }

  const handleKeyDown = (e) => {
    if (e.key !== 'Enter')
      return;
    else {
      setTagArr((prev) => [...prev, e.target.value]);
      
    }

  }


  return (
    <> {showModal ? (
      <div className='MdContainer'>
        <div className='MdBackground' onClick={closeModal} ref={modalRef}>
          <div className='ModalWrapper'>

            <div className='ModalContent'>
              <h1> Choose up to 5 images </h1>

              <form className='modalForm'>
                <label>
                  <input type="file" multiple onChange={onSelectFile} />
                  <span>Add Photo</span>
                </label>
              </form>

              <div className='clearBtContainer' onClick={DeleteAll}>
                <button>
                  Clear
                </button>
              </div>

              <div className='modal-image-layout'>
                {imageArr && imageArr.map((image, index) => {
                  return (

                    <div className='modal-image-wrap'>
                      <img src={image} height="200" alt="uploaded pic" />
                      <button onClick={() => Delete(image)}>X</button>

                      <div className="tags-input-container">

                        {
                          tagArr && tagArr.map((tag, index) => {
                            
                            return (
                              <div className='tag-item'>
                                <span className='text'>{tag}</span>
                                <span className='close'>x</span>
                              </div>
                            )
                          })
                        }
                        <input className="tag-input" onKeyDown={handleKeyDown} type="text" placeholder="Add a tag"></input>
                      </div>


                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </div>
      </div>

    ) : null}
    </>
  )
};
export default Modal