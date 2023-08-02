// Import Component
import AlbumForm from "../AlbumForm/AlbumForm";

// Import Hooks
import { useState } from "react";

// Import images
import album_icon from "../../assets/Images/album_Icon.png";
import bin from "../../assets/Images/bin.png";
import add from "../../assets/Images/plus.png";
import cancel from "../../assets/Images/minus.png";

// Import css
import styles from "./AlbumsList.module.css";
import styles1 from "../ImagesList/ImagesList.module.css";

// Import loading Component from react-loader-spinner package
import { ThreeDots } from "react-loader-spinner";

// Main Component
function AlbumsList({
  addFormName,
  albums,
  setFolderName,
  isLoading,
  DeleteAlbum,
}) {
  // Hook...

  // below state decides whether to show AlbumForm or not
  const [showAlbumForm, setShowAlbumForm] = useState(false);

  return (
    <div className={styles.albums_container}>
      <h2>Your Albums</h2>
      {showAlbumForm ? (
        <>
          <AlbumForm addFormName={addFormName} />
          <img
            src={cancel}
            alt="Cancel"
            title="Cancel"
            id={styles1.cancel_img_btn}
            onClick={() => setShowAlbumForm(!showAlbumForm)}
          />
        </>
      ) : (
        <img
          src={add}
          alt="Add Folder"
          title="Add Folder"
          id={styles1.add_img_btn}
          onClick={() => setShowAlbumForm(!showAlbumForm)}
        />
      )}

      {isLoading ? (
        <div className={styles.no_folder}>
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
      ) : albums.length ? (
        <div className={styles.albums_list_container}>
          {albums.map((album, i) => {
            return (
              <div
                className={styles.album}
                key={i}
                onClick={() => {
                  setFolderName(album);
                }}
              >
                <div className={styles.album_icon_container}>
                  <img
                    src={album_icon}
                    alt="Album Icon"
                    id={styles.folder_img}
                  />
                </div>
                <h3 id={styles.folder_name}>{album}</h3>
                <img
                  src={bin}
                  alt=""
                  id={styles.bin_btn}
                  onClick={(e) => {
                    e.stopPropagation();
                    DeleteAlbum(album);
                  }}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div className={styles.no_folder}>Currently No Folder...</div>
      )}
    </div>
  );
}

// Export AlbumsList Component
export default AlbumsList;
