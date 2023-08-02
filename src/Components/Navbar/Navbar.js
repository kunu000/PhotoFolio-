// import css
import styles from "./Navbar.module.css";

// import Navbar icon
import photo from "../../assets/Images/Photofolio_icon3.png";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div>
        <img src={photo} alt="Photofolio_icon" id={styles.photofolio_img}/>
        <h2 className={styles.navbar_title}>PhotoFolio</h2>
      </div>
    </nav>
  );
}

export default Navbar;
