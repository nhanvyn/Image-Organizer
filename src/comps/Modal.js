
import React, { useRef, useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import styled from 'styled-components'
import ProgressBar from './ProgressBar';
import ImageLayout from './ImageLayout';
import * as mobilenet from '@tensorflow-models/mobilenet'
import '@tensorflow/tfjs-backend-webgl'
export const ModalCloseButton = styled(MdClose)


export const Modal = ({ showModal, setShowModal, searchTerm, setSearchTerm, distinctTerms, setDistinctTerms }) => {

  const [imageArr, setImageArr] = useState([]);
  const [tagArr, setTagArr] = useState([]);
  const inputRef = useRef();
  const [showProgress, setShowProgress] = useState(false);
  const modalRef = useRef();
  const imageRef = useRef([]);
  const [isModelLoading, setIsModelLoading] = useState(false)
  const [model, setModel] = useState(null)

  const getRandom = (min, max) => {
    let step1 = max - min + 1;
    let step2 = Math.random() * step1;
    let result = Math.floor(step2) + min;
    return result;
  }
  const loadModel = async () => {
    setIsModelLoading(true)
    try {
      const model = await mobilenet.load()
      setModel(model)
      setIsModelLoading(false)
    } catch (error) {
      console.log("Mobilenet error: " + error)
      setIsModelLoading(false)
    }
  }

  useEffect(() => {
    loadModel()
  }, [])

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

  const GenerateTag = async (i, e) => {
    const results = await model.classify(imageRef.current[i])
    const options = [...results[0].className.toString().toLowerCase().split(","), ...results[1].className.toString().toLowerCase().split(","), ...results[2].className.toString().toLowerCase().split(",")]

    let random_i = getRandom(0, options.length - 1)
    console.log(options)
    var value = options[random_i]
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
        <ImageLayout
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          distinctTerms={distinctTerms}
          setDistinctTerms={setDistinctTerms} />
      }

      {showModal ? (
        <div className='MdContainer'>
          <div className='MdBackground' onClick={closeModal} ref={modalRef}>
            <div className='ModalWrapper'>

              <div className='ModalContent'>

                <h1> {isModelLoading ? 'Model loading...' : 'TSmobilenet is loaded, choose up to 5 images'} </h1>

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
                        <img src={image.url} height="200" alt="uploaded pic" ref={el => imageRef.current[i] = el} />
                        <button className='removeBt' onClick={() => Delete(image, i)}>X</button>

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
                        <div className='suggestContainer'>
                          <button onClick={(e) => GenerateTag(i, e)}>Generate tag with AI</button>

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