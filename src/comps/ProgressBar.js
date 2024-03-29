import React, { useEffect } from 'react'
import useStorageHook from '../hooks/useStorageHook'

const ProgressBar = ({ files, setFiles, showProgress, setShowProgress }) => {
  const { urls, progress } = useStorageHook(files, setFiles, showProgress, setShowProgress);

  useEffect(() => {
    
  }, [urls, setFiles])

  return (
    <div className="container">
      <div className='progress-bar' style={{ width: progress + '%' }}></div>
    </div>
  )

}

export default ProgressBar;