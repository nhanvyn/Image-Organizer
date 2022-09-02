import React, { useRef, useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import styled from 'styled-components'
import ProgressBar from './ProgressBar';
import ImageLayout from './ImageLayout';
export const ModalCloseButton = styled(MdClose)



export const Modal = ({ showModal, setShowModal }) => {

  const [imageArr, setImageArr] = useState([]);
  const [tagArr, setTagArr] = useState([]);
  const inputRef = useRef();
  const [showProgress, setShowProgress] = useState(false);
  const modalRef = useRef();

  const closeModal = e => {
    if (modalRef.current === e.target) {
      setShowModal(false);
      setImageArr([])
      setTagArr([])

    }
  }

  const onSelectFile = (e) => {
    const selectedFiles = e.target.files;
    const arr = Array.from(selectedFiles)
    const urlArray = arr.map((file) => {
      const newImage = file;
      newImage["id"] = Math.random();
      newImage["url"] = URL.createObjectURL(file)
      newImage["tags"] = [];
      return newImage;
    })
    setImageArr((prevState) => [...prevState, ...urlArray])

  }
  const Delete = (image, imageIndex) => {
    setImageArr(imageArr.filter((e) => e !== image));
    URL.revokeObjectURL(image);
    setTagArr(tagArr.filter(({ imageID, tagValue }) => {
      if (imageID === imageIndex) {
        return false;
      }
      return true;
    }))
    try {
      inputRef.current.value = '';
    }
    catch (e) { }
  }

  const DeleteAll = () => {
    setImageArr([])
  }

  const RemoveTag = (i, e, tagVal) => {
    // i is image index, tagVal is content of tag
    console.log("[tagIndex, value] = " + i + " , " + tagVal)
    // filter out the tags
    setTagArr(tagArr.filter(({ imageID, tagValue }) => {
      if (imageID === i) {
        if (tagVal === tagValue)
          return false;
      }
      return true;
    }))
  }

  const handleKeyDown = (i, e) => {
    if (e.key !== 'Enter' || e.target.value === '')
      return;
    else {
      // setTagArr((prev) => [...prev, e.target.value]);
      var value = e.target.value
      // prevent adding duplicates
      const duplicate = tagArr.find(({ imageID, tagValue }) => {
        return (imageID === i && tagValue === value)
      })
      if (duplicate === undefined) {
        setTagArr((prev) => [...prev, { 'imageID': i, 'tagValue': value }])
        // add tag into tag array of corresponding image

        const matchImage = imageArr.find((image, index) => {
          return index === i;
        })

        matchImage["tags"].push(value)
      }
      e.target.value = ''
    }

  }

  const SubmitImage = (e) => {
    if (imageArr.length > 0) {
      setShowModal(false);
      setShowProgress(true);
    }
  }


  return (
    <>
      {
        // rendering progress bar
        showProgress ?
          <div className="output">
            {imageArr.length > 0 &&
              <ProgressBar
                files={imageArr}
                setFiles={setImageArr}
                showProgress={showProgress}
                setShowProgress={setShowProgress}
              />}
          </div> : null

      }


      {
        // rendering image layout
        <ImageLayout />
      }

      {showModal ? (
        <div className='MdContainer'>
          <div className='MdBackground' onClick={closeModal} ref={modalRef}>
            <div className='ModalWrapper'>

              <div className='ModalContent'>
                <h1> Choose up to 5 images </h1>

                <form className='modalForm'>
                  <label>
                    <input type="file" multiple onChange={onSelectFile} ref={inputRef} />
                    <span>Add Photo</span>
                  </label>
                </form>

                <div className='clearBtContainer' onClick={DeleteAll}>
                  <button>
                    Clear
                  </button>
                </div>


                <div className='modal-image-layout'>
                  {imageArr && imageArr.map((image, i) => {
                    return (

                      <div className='modal-image-wrap' key={image.url}>
                        <img src={image.url} height="200" alt="uploaded pic" />
                        <button onClick={() => Delete(image, i)}>X</button>

                        <div className="tags-input-container">

                          {
                            tagArr && tagArr.map(({ imageID, tagValue }) => {


                              if (imageID !== i) return null;
                              return (
                                <div className='tag-item' key={tagValue}>
                                  <span className='text'>{tagValue}</span>
                                  <span className='close' onClick={(e) => RemoveTag(i, e, tagValue)}>x</span>
                                </div>
                              )
                            })
                          }
                          <input className="tag-input" onKeyDown={(e) => handleKeyDown(i, e)} type="text" placeholder="Add a tag"></input>
                        </div>

                      </div>
                    );
                  })}
                </div>
                <div className='submitBtContainer'>
                  <button onClick={() => SubmitImage()}>
                    Submit
                  </button>
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