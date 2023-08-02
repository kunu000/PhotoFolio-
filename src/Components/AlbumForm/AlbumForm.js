// Import Hooks
import { useRef } from "react";

// Import css
import styles from "./AlbumForm.module.css";

// Import react-tostify package for toast notifications
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Main Component
function AlbumForm({ addFormName }) {
  // input reference
  const inputRef = useRef();

  // Function to clearInput
  function clearInput() {
    inputRef.current.value = "";
  }

  return (
    <>
      <div className={styles.album_form}>
        <h2 className={styles.album_form_heading}>Create an Album</h2>
        <input
          type="text"
          placeholder="Album Name"
          maxLength={40}
          ref={inputRef}
          required
        />
        <div>
          <button
            id={styles.create_btn}
            onClick={() => {
              if (inputRef.current.value !== "") {
                addFormName(inputRef.current.value);
                inputRef.current.value = "";
              } else {
                Notification("The input field can't be empty!", true);
              }

              inputRef.current.focus();
            }}
          >
            Create
          </button>
          <button id={styles.clear_btn} onClick={clearInput}>
            Clear
          </button>
        </div>
      </div>
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

// Export AlbumForm Component
export default AlbumForm;
