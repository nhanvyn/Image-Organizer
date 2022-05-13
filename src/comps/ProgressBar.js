import React, { useEffect, useState } from 'react'
import useStorageHook from '../hooks/useStorageHook'

const ProgressBar = ({ file, setFile }) => {
  const { url, progress } = useStorageHook(file);
  console.log("Progress: ", progress, "URL:", url);

  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url, setFile])

  return (
    <div class="container">
      <div className='progress-bar' style={{ width: progress + '%' }}></div>
    </div>
  )

}

export default ProgressBar;