import { useState, useEffect } from 'react'
import { fbFireStore } from '../firebase/config'

const useFireStoreHook = (collection_name) => {
  const [docs, setDocs] = useState([]);
  useEffect(() => {
    fbFireStore.collection(collection_name).orderBy("timeCreated", "asc")
      .onSnapshot(snapshot => {
        let arr = []
        snapshot.forEach((doc) => {
          var obj = { ...doc.data(), id: doc.id };
          //console.log("object created = ", obj);
          arr.push(obj);
          //setDocs((prev) => [...prev, obj])
        });
        setDocs(arr)
      });
  }, [collection_name])
  return { docs };
}

export default useFireStoreHook;