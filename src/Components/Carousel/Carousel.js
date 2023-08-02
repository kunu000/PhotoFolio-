// Import Hooks
import { useState } from "react";

// Import css
import styles from "./Carousel.module.css";

// Import images
import close from "../../assets/Images/close.png";
import left_arrow from "../../assets/Images/left-arrow.png";
import right_arrow from "../../assets/Images/right-arrow.png";

// Main Component
function Carousel({ imagesDetail, i, setShowCarousel }) {
  let [index, setIndex] = useState(i);

  // Function change image to previous
  function handlePrevious() {
    if (index > 0) {
      setIndex(index - 1);
    }
  }
  // Function change image to next
  function handleForward() {
    if (index < imagesDetail.length - 1) {
      setIndex(index + 1);
    }
  }
  return (
    <>
      <div className={styles.Carousel}>
        <img
          src={close}
          alt="Close"
          title="Close"
          id={styles.carousel_cancel_btn}
          onClick={() => setShowCarousel(null)}
        />
        <div className={styles.carousel_container}>
          <img
            src={left_arrow}
            alt="back"
            title="back"
            id={styles.carousel_left_btn}
            onClick={handlePrevious}
          />
          <div className={styles.carousel_img_container}>
            <img
              src={imagesDetail[index].imgUrl}
              alt={imagesDetail[index].imgTitle}
              title={imagesDetail[index].imgTitle}
              className={styles.carousel_img}
            />
          </div>
          <img
            src={right_arrow}
            alt="next"
            title="next"
            id={styles.carousel_right_btn}
            onClick={handleForward}
          />
        </div>
      </div>
    </>
  );
}

// Export Carousel Component
export default Carousel;
