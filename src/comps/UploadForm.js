import React, { useState } from 'react'
import ProgressBar from './ProgressBar';



const UploadForm = () => {

  // const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  // const types = ['image/png', 'image/jpeg'];

  const changeHandler = (e) => {
    let selected = []
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i]
      newImage["id"] = Math.random();
      selected.push(newImage)
      setFiles((prevState) => [...prevState, newImage]);

    }

    console.log(selected);


    // if (selected && types.includes(selected.type)) {
    //   setFile(selected);
    //   setError('')
    // } else {
    //   setFile(null);
    //   setError('Please select an image file (png or jpeg)')
    // }
  }


  return (
    <form>
      <label>
        <input type="file" multiple onChange={changeHandler} />
        <span>Upload</span>
      </label>
      <div className="output">
        {error && <div className="error">{error}</div>}
        {files.length > 0 && <ProgressBar files={files} setFiles={setFiles} />}
      </div>
    </form>
  )
}
export default UploadForm