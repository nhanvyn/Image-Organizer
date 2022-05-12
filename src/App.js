
import './App.css';
import React from 'react';
import Navbar from './comps/Navbar';
import UploadForm from './comps/UploadForm';





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
      <UploadForm />
    </div>
  );
}

export default App;
