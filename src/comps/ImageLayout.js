import React, { useEffect } from 'react'
import useFirestoreHook from '../hooks/useFirestoreHook'


const ImageLayout = ({ searchTerm, setSearchTerm, distinctTerms, setDistinctTerms }) => {
  const { docs } = useFirestoreHook('images');
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

  }, [docs])

  useEffect(() => {

  }, [])

  useEffect(() => {
    if (searchTerm) {
      console.log("IL term = " + searchTerm)
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

      {docs.map((doc, id) => {
        // check if any of the doc.hashtag[i] match searchTerm
        return (
          <div className='img-wrap' key={id}>
            <div className='main-image'>
              <img src={doc.downloadURL} alt="uploaded pic" />
            </div>

            <div className="tagBtContainer">

              {doc.hashtags && doc.hashtags.map((tag, i) => {
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