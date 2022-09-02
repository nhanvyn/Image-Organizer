import React, { useEffect } from 'react'
import useFirestoreHook from '../hooks/useFirestoreHook'


const ImageLayout = () => {
  const { docs } = useFirestoreHook('images');
  useEffect(() => {
  }, [docs])

  const tags = ['dog', 'car', 'sunshine', 'sky', 'kvo', 'ven']

  return (
    <div className='image-layout'>

      {docs.map((doc, id) => (
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
      ))}

      {/* <div className='img-wrap'>
        <div className='main-image'>
          <img src={'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Zm9jdXN8ZW58MHx8MHx8&w=1000&q=80'} alt="uploaded pic" />
        </div>

        <div className="tagBtContainer">
          <button>{tags[0]}</button>
          <button>{tags[1]}</button>
          <button>{tags[2]}</button>
          <button>{tags[3]}</button>
          <button>{tags[4]}</button>
          <button>{tags[5]}</button>
          <button>{tags[1]}</button>
          <button>{tags[2]}</button>
          <button>{tags[3]}</button>
          <button>{tags[4]}</button>
          <button>{tags[5]}</button>
          <button>{tags[1]}</button>
         
        
        </div>
      </div> */}





    </div>
  )
}

export default ImageLayout;