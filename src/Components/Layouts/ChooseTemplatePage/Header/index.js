import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose, faSearch } from "@fortawesome/free-solid-svg-icons";
import styles from "./Header.module.scss";

function Header() {
  return (
    <div className={clsx(styles.wrapper)}>
      {/* menu in here  */}
      <FontAwesomeIcon
        className={clsx(styles.icon_menu)}
        icon={faBars}
      ></FontAwesomeIcon>
      <div className={clsx(styles.wrapper_input)}>
        <FontAwesomeIcon
          className={clsx(styles.icon)}
          icon={faSearch}
        ></FontAwesomeIcon>
        <input className={clsx(styles.input)} placeholder='Search' />
        <FontAwesomeIcon
          className={clsx(styles.icon_close)}
          icon={faClose}
        ></FontAwesomeIcon>
      </div>
      <img
        className={clsx(styles.icon__university)}
        src='https://www.google.com/u/0/ac/images/logo.gif?uid=113248074350656852211&service=google_gsuite'
      />
    </div>
  );
}

export default Header;
