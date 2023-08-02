// Import Hooks
import { useEffect, useRef } from "react";

// Import css
import styles from "./ImagesForm.module.css";
import styles1 from "../AlbumForm/AlbumForm.module.css";

// Import react-tostify package for toast notifications
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import firebase
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

// Main Component
function ImagesForm({
  addImage,
  shouldUpdateImageDetails,
  setShouldUpdateImageDetails,
}) {
  // Input references
  const inputRef1 = useRef();
  const inputRef2 = useRef();

  //  Function to submit the form
  function Submit() {
    let value1 = inputRef1.current.value;
    let value2 = inputRef2.current.value;

    if (inputRef1.current.value !== "") {
      checkURL(value2)
        .then(() => {
          if (shouldUpdateImageDetails) {
            // Code to update Image details (this code run when edit button is clicked)
            const { id, data, index } = shouldUpdateImageDetails;

            let value = [...data];
            value.splice(index, 1);

            for (let x of value) {
              if (x.imgTitle === value1) {
                Notification("Image with this name already exist", true);
                return;
              }
            }

            data.splice(index, 1, { imgTitle: value1, imgUrl: value2 });

            const updateData = async () => {
              const albumsRef = doc(db, "albums", id);
              await updateDoc(albumsRef, {
                imagesInfo: data,
              });
            };
            updateData();

            ClearInputs();
            setShouldUpdateImageDetails(null);
            Notification("Image edited successfully", false);
          } else {
            // Code for adding Image to ImageList Component
            addImage({ imgTitle: value1, imgUrl: value2 });
            ClearInputs();
          }
        })
        .catch((error) => {
          Notification("Invalid Url", true);
        });
    } else {
      Notification("Inputs should have some values", true);
    }
  }

  // Function to clear Inputs
  function ClearInputs() {
    inputRef1.current.value = "";
    inputRef2.current.value = "";

    inputRef1.current.focus();
  }

  // useEffect Hooks to add text to inputs when edit button is clicked
  useEffect(() => {
    if (shouldUpdateImageDetails) {
      inputRef1.current.value = shouldUpdateImageDetails.imgData.imgTitle;
      inputRef2.current.value = shouldUpdateImageDetails.imgData.imgUrl;
    }
  }, [shouldUpdateImageDetails]);

  // useEffect Hooks to move focus to Title input  when Component renders
  useEffect(() => {
    inputRef1.current.focus();
  });

  return (
    <>
      <div className={styles.images_form}>
        <h2 className={styles.images_form_heading}>Create an Album</h2>
        <input
          type="text"
          placeholder="Title"
          maxLength={30}
          ref={inputRef1}
          required
        />
        <input type="text" placeholder="Image URL" ref={inputRef2} required />
        <button id={styles.images_form_clear_btn} onClick={ClearInputs}>
          Clear
        </button>
        <button id={styles.images_form_add_btn} onClick={Submit}>
          {shouldUpdateImageDetails ? "Edit" : "Add"}
        </button>
      </div>
    </>
  );
}

// Function to check whether Url is valid or not (it resolve the promise when image url is working otherwise it reject the promise)
function checkURL(url) {
  const img = new Image();
  img.src = url;
  return new Promise((resolve, reject) => {
    img.onload = () => resolve(true);
    img.onerror = () => reject(false);
  });
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
      className: styles1.toast_notification,
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
      className: styles1.toast_notification,
    });
  }
}

// Export ImagesForm Component
export default ImagesForm;
