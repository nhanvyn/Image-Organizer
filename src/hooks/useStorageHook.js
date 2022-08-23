import { useState, useEffect, useRef } from 'react'
import { fbStorage, fbFireStore, timeStamp } from '../firebase/config'




const useStorageHook = (files, setFiles) => {

  const firstRenderRef = useRef(true);
  const [urls, setUrls] = useState([]);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);



  // const [name, setName] = useState(null);
  // const [tags, setTags] = useState(null); 

  // useEffect(() => {

  //   const firestoreCollection = fbFireStore.collection('images');
  //   const timeCreated = timeStamp
  //   console.log("add url with timeCreate to fb: ", currentUrl)
  //   if (currentUrl != null) {
  //     firestoreCollection.add({ timeCreated, currentUrl })
  //     setCurrentUrl(null)
  //   }


  // }, [urls, currentUrl])

  useEffect(() => {

    if (firstRenderRef.current){
      firstRenderRef.current = false;
      return;
    }
    const firestoreCollection = fbFireStore.collection('images');
    const promises = [];
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      const fbStorageRef = fbStorage.ref(file.name)
      const uploadTask = fbStorageRef.put(file);
      promises.push(uploadTask)
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgress(progress);
        },
        (error) => {
          setError(error);
        },
        async () => {
          await uploadTask
            .snapshot
            .ref
            .getDownloadURL()
            .then((downloadURL) => {
              const timeCreated = timeStamp
              console.log("Set URL to: " + downloadURL)
              firestoreCollection.add({ downloadURL, timeCreated })
              setUrls((prevState) => [...prevState, downloadURL]);
            });
        }
      );

    }
    Promise.all(promises)
      .then(() => {
        // alert("all images uploaded")
        
        setFiles([])
      });
  }, [files, setFiles]);

  return { progress, urls, error }
}


export default useStorageHook;