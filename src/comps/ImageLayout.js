import React, { useEffect } from 'react'
import useFirestoreHook from '../hooks/useFirestoreHook'


const ImageLayout = () => {
  const { docs } = useFirestoreHook('images');
  useEffect(() => {
  }, [docs])

  return (
    <div className='image-layout'>
      
      {docs.map(doc => (
        <div className='img-wrap' key={doc.id}>
          <img src={doc.downloadURL} alt="uploaded pic" />
        </div>
      ))}
    </div>
  )
}

export default ImageLayout;