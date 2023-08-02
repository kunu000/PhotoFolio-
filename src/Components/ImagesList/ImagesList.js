// Import Components
import ImagesForm from "../ImagesForm/ImagesForm";
import Carousel from "../Carousel/Carousel";

// Import images
import previous from "../../assets/Images/previous.png";
import bin from "../../assets/Images/bin.png";
import edit from "../../assets/Images/edit.png";
import add from "../../assets/Images/plus.png";
import cancel from "../../assets/Images/minus.png";
import downloadIcon from "../../assets/Images/download.png";
// Import css
import styles from "./ImagesList.module.css";
import styles1 from "../AlbumForm/AlbumForm.module.css";

// Import Hooks
import { useReducer, useState, useEffect } from "react";

// Import firebase
import { onSnapshot, setDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

// Import react-tostify package for toast notifications
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import loading Component from react-loader-spinner package
import { ThreeDots } from "react-loader-spinner";

// Main Components
function ImagesList({
  folderName,
  setFolderName,
  setShouldUpdateImageDetails,
  shouldUpdateImageDetails,
}) {
  // Hooks...
  // below state decides whether to show ImagesForm component or not
  const [showImagesForm, setShowImagesForm] = useState(false);

   // below state decides whether to show Carousel component or not
  const [showCarousel, setShowCarousel] = useState(null);

  // below state decides whether to show loading svg or not
  const [isLoading, setIsLoading] = useState(true);

  // below state keep track of images details
  const [imagesDetail, dispatch] = useReducer(reducer, []);

  // useEffect Hook to fetch data form server when app mount
  useEffect(() => {
    onSnapshot(doc(db, "albums", folderName), (doc) => {
      try {
        dispatch({
          type: "Fetch_Data",
          payload: { data: doc.data().imagesInfo, setIsLoading: setIsLoading },
        });
      } catch (error) {}
    });
  }, []);

  // Function to add image to ImagesList Component
  const addImage = (data) => {
    let add = true;
    async function setData() {
      for (let i = 0; i < imagesDetail.length; i++) {
        if (imagesDetail[i].imgTitle === data.imgTitle) {
          add = false;
          Notification("File Name already exist", true);
          break;
        }
      }
      if (add) {
        await setDoc(doc(db, "albums", folderName), {
          imagesInfo: [data,...imagesDetail],
        });
      }
    }
    setData();
    if (add) {
      dispatch({ type: "Add_Image", payload: { data } });
    }
  };

  // Function to Delete Image form ImagesList Component
  const DeleteImage = (index) => {
    let data = [...imagesDetail];
    data.splice(index, 1);

    const updateData = async () => {
      const albumsRef = doc(db, "albums", folderName);
      await updateDoc(albumsRef, {
        imagesInfo: data,
      });
    };
    updateData();
    Notification("Image deleted");
  };

  // Function to Edit image
  const handleEdit = (img) => {
    if (!showImagesForm) {
      setShowImagesForm(true);
    }
    let data = [...imagesDetail];
    let index = data.indexOf(img);

    setShouldUpdateImageDetails({ imgData: img, id: folderName, data, index });
  };

  // Function to handle error in images (this code runs when image link is invalid)
  function handleImageError(value) {
    let index = imagesDetail.indexOf(value);
    let data = [...imagesDetail];
    data.splice(index, 1);

    const updateData = async () => {
      const albumsRef = doc(db, "albums", folderName);

      await updateDoc(albumsRef, {
        imagesInfo: data,
      });
    };
    updateData();
    Notification(`${value.imgTitle} image link changes or become invalid`, true);
  }

  return (
    <>
      <div className={styles.ImagesList}>
        {showImagesForm ? (
          <img
            src={cancel}
            alt="Cancel"
            title="Cancel"
            id={styles.cancel_img_btn}
            onClick={() => {
              setShowImagesForm(!showImagesForm);
              setShouldUpdateImageDetails(null);
            }}
          />
        ) : (
          <img
            src={add}
            alt="Add Image"
            title="Add Image"
            id={styles.add_img_btn}
            onClick={() => setShowImagesForm(!showImagesForm)}
          />
        )}
        <div className={styles.header}>
          <img
            src={previous}
            alt="previous"
            title="Previous"
            id={styles.previous_btn}
            onClick={() => {
              setFolderName(null);
              setShouldUpdateImageDetails(null);
            }}
          />
          <h2 id={styles.images_list_title}>Images in {folderName} Album</h2>
        </div>
        {showImagesForm ? (
          <ImagesForm
            addImage={addImage}
            shouldUpdateImageDetails={shouldUpdateImageDetails}
            setShouldUpdateImageDetails={setShouldUpdateImageDetails}
          />
        ) : null}

        {isLoading ? (
          <div className={styles.no_image}>
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="#51c28e"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          </div>
        ) : imagesDetail.length ? (
          <div className={styles.images_list_container}>
            {imagesDetail.map((img, i) => (
              <div className={styles.image_folder} key={i}>
                <img
                  src={img.imgUrl}
                  alt="Image"
                  onError={() => handleImageError(img)}
                  onClick={() => setShowCarousel(i)}
                />
                <h3>{img.imgTitle}</h3>
                <img
                  src={bin}
                  alt="delete"
                  id={styles.bin_btn}
                  onClick={(e) => {
                    e.stopPropagation();
                    DeleteImage(i);
                  }}
                />
                <img
                  src={edit}
                  alt="edit"
                  id={styles.edit_btn}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(img);
                  }}
                />
                <a
                  href={img.imgUrl}
                  download
                  onClick={(e) => {
                    e.stopPropagation();
                    downloadImage(e, img.imgTitle, img.imgUrl);
                  }}
                  id={styles.download_btn}
                >
                  <img src={downloadIcon} alt="" />
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.no_image}>No image found...</div>
        )}
        {showCarousel === null ? null : (
          <Carousel
            imagesDetail={imagesDetail}
            i={showCarousel}
            setShowCarousel={setShowCarousel}
          />
        )}
      </div>
    </>
  );
}

// Reducer function for useReducer Hook
function reducer(state, action) {
  const { payload } = action;
  switch (action.type) {
    case "Add_Image": {
      Notification("Image added successfully", false);
      return [...state, payload.data];
    }
    case "Fetch_Data": {
      payload.setIsLoading(false);
      return payload.data;
    }
    case "Update_Data":
      return payload.data;
    default:
      return state;
  }
}

// Function to download image;
function downloadImage(e, imgTitle, imgUrl) {
  e.preventDefault();
  fetch(imgUrl, {
    method: "GET",
    headers: {},
  })
    .then((response) => {
      response.arrayBuffer().then(function (buffer) {
        const url = window.URL.createObjectURL(new Blob([buffer]));
        const link = document.createElement("a");
        link.href = url;

        link.setAttribute("download", `${imgTitle}.png`);
        document.body.appendChild(link);
        link.click();
      });
    })
    .catch((err) => {
      Notification("Image has been blocked by CORS policy", true);
    });
}

// Function for toast notifications
function Notification(value, isError = false) {
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

// Export ImagesList Component
export default ImagesList;
