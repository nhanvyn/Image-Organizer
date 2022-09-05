import React, { useEffect, useState } from 'react'
import useFirestoreHook from '../hooks/useFirestoreHook'


const ImageLayout = ({ searchTerm, setSearchTerm, distinctTerms, setDistinctTerms }) => {
  const { docs } = useFirestoreHook('images');
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    const allTerm = []
    docs.map((doc, i) => (
      doc.hashtags.map((tag) => (
        allTerm.push(tag)
      ))
    ))

    // console.log(allTerm)
    const distinctArr = allTerm.filter(
      (term, i) => allTerm.indexOf(term) === i
    )
    console.log("distinctArr = " + distinctArr)
    setDistinctTerms(distinctArr)
    setPhotos(Array.from(docs))
  }, [docs])

  useEffect(() => {

  }, [])

  useEffect(() => {
    if (searchTerm) {
      console.log("IL term = " + searchTerm)
    }

    if (searchTerm !== '' && searchTerm !== "303: Set display to original docs") {
      let arr = Array.from(docs).filter((photo) => {
        var photoContainTerm = false;
        photo.hashtags.map((tag) => {
          if (tag === searchTerm) {
            console.log("Photo contain searchTerm!!")
            photoContainTerm = true
          }
        })
        return photoContainTerm;
      });

      console.log("After apply filter:" + arr)
      setPhotos(arr)
    }
    else {
      setPhotos(Array.from(docs))
    }

  }, [searchTerm, setSearchTerm])

  return (

    <div className='image-layout'>
      {/* {
        renderByTerm = (() => {
          var containSearchTerm = false
          docs.map((doc) => {
            doc.hashtags.map((htag) => {
              if (htag === searchTerm)
                containSearchTerm = true;
            })
          })
          return containSearchTerm;
        })
        
      } */}

      {photos.length > 0 && photos.map((photo, id) => {
        // check if any of the photo.hashtag[i] match searchTerm
        return (
          <div className='img-wrap' key={id}>
            <div className='main-image'>
              <img src={photo.downloadURL} alt="uploaded pic" />
            </div>

            <div className="tagBtContainer">

              {photo.hashtags && photo.hashtags.map((tag, i) => {
                return (<button key={i}>{tag}</button>)
              })
              }
            </div>
          </div>
        );
      })}

    </div>
  )
}

export default ImageLayout;