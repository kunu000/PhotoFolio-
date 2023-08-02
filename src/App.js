// Import Components
import Navbar from "./Components/Navbar/Navbar";
import AlbumsList from "./Components/AlbumsList/AlbumsList";
import ImagesList from "./Components/ImagesList/ImagesList";

// Import Hooks
import { useEffect, useReducer, useState } from "react";

// Import firebase
import {
  collection,
  query,
  onSnapshot,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase";

// Import react-tostify package for toast notifications
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import css
import styles from "./Components/AlbumForm/AlbumForm.module.css";

// Main Component
function App() {
  // Hooks...
  //  below albums state keep track of which albums names
  const [albums, dispatch] = useReducer(reducer, { albumsNames: [] });

  // below folderName state keep track of which Folder (Album) is opened by the user
  let [folderName, setFolderName] = useState(null);

  // below state decides whether to show loading svg or not
  const [isLoading, setIsLoading] = useState(true);


  // below state decides whether to update Image details 
  const [shouldUpdateImageDetails, setShouldUpdateImageDetails] =
    useState(null);

  // Function for adding Folder(Albums) to AlbumsList Component
  const addFormName = (value) => {
    for (let x of albums.albumsNames) {
      if (x === value) {
        Notification("File name already exist",true);
        return;
      }
    }
    async function setData() {
      await setDoc(doc(db, "albums", value), { imagesInfo: [] });
    }
    setData();
    dispatch({ type: "Add_Albums_Name", payload: { value } });
  };

  // Function for deleting Folder(Albums) from AlbumsList Component
  const DeleteAlbum = (value) => {
    async function del() {
      await deleteDoc(doc(db, "albums", value));
    }
    del();
    Notification("Album deleted succesfully");
  };

  // useEffect hook for fetching Folders(Albums)
  useEffect(() => {
    const q = query(collection(db, "albums"));
    onSnapshot(q, (querySnapshot) => {
      const albums = [];
      querySnapshot.forEach((doc) => {
        albums.push(doc.id);
      });
      dispatch({
        type: "Fetch_Albums_Names",
        payload: { albums, setIsLoading },
      });
    });
  }, []);

  return (
    <>
      <Navbar />
      {folderName ? (
        <ImagesList
          setFolderName={setFolderName}
          folderName={folderName}
          setShouldUpdateImageDetails={setShouldUpdateImageDetails}
          shouldUpdateImageDetails={shouldUpdateImageDetails}
        />
      ) : (
        <AlbumsList
          addFormName={addFormName}
          albums={albums.albumsNames}
          setFolderName={setFolderName}
          isLoading={isLoading}
          DeleteAlbum={DeleteAlbum}
        />
      )}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </>
  );
}

// Function for toast notifications
function Notification(value, isError) {
  if (isError) {
    toast.error(value, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      className: styles.toast_notification,
    });
  } else {
    toast.success(value, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      className: styles.toast_notification,
    });
  }
}

// Function for useReducer hook
function reducer(state, action) {
  const { payload } = action;
  switch (action.type) {
    case "Add_Albums_Name": {
      Notification("Album added successfully", false);
      return { albumsNames: [payload.value, ...state.albumsNames] };
    }

    case "Fetch_Albums_Names": {
      payload.setIsLoading(false);
      return { albumsNames: payload.albums };
    }
    default:
      return state;
  }
}

// Export App Component
export default App;
