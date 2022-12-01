import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose, faSearch } from "@fortawesome/free-solid-svg-icons";
import styles from "./HeaderHome.module.scss";
import logo_tdtu from "~/assets/img/icon__tdtu.png";

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
        src={logo_tdtu}
        alt='tdtu'
      ></img>
    </div>
  );
}

export default Header;
