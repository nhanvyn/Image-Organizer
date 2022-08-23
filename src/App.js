
import React from 'react';
import Navbar from './comps/Navbar';
import UploadForm from './comps/UploadForm';
import ImageLayout from './comps/ImageLayout';
import UploadButton from './comps/UploadButton';



function App() {
  // const [data, setData] = React.useState(null);

  // React.useEffect(() => {
  //   fetch("/api")
  //     .then((res) => res.json())
  //     .then((data) => setData(data.message));
  //   console.log(data)
  // }, []);

  return (
    <div>
      <Navbar />
      <UploadForm></UploadForm>

      <ImageLayout />
    </div>
  );
}

export default App;
