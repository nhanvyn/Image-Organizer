import { useState, useEffect } from 'react'
import { fbStorage, fbFireStore, timeStamp } from '../firebase/config'
import { collection, addDoc } from "firebase/firestore"




const useStorageHook = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const fbStorageRef = fbStorage.ref(file.name)
    const firestoreCollection = fbFireStore.collection('images');
    fbStorageRef.put(file).on('state_changed',
      (snapshot) => {
        let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(percentage);
      }, (err) => {
        setError(err);
      }, async () => {
        const url = await fbStorageRef.getDownloadURL();
        const timeCreated = timeStamp
        firestoreCollection.add({ url, timeCreated })
        setUrl(url);
      })
  }, [file]);
  return { progress, url, error }
}


export default useStorageHook;