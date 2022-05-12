import React from 'react'
import useStorageHook from '../hooks/useStorageHook'

const ProgressBar = ({ file, setFile }) => {
  const { url, progress } = useStorageHook(file);
  console.log(progress, url);

  return (
    <div className='progress-bar'>loading</div>
  )

}

export default ProgressBar;