import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose, faSearch } from "@fortawesome/free-solid-svg-icons";
import styles from "./HeaderHome.module.scss";
import logo_tdtu from "~/assets/img/icon__tdtu.png";
import logoHuutai from "~/assets/img/logoHuutai.png";

function Header() {
  return (
    <div className={clsx(styles.wrapper)}>
      {/* menu in here  */}
      <img
        src={logoHuutai}
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
        }}
      ></img>
      {/* <div className={clsx(styles.wrapper_input)}>
        <FontAwesomeIcon
          className={clsx(styles.icon)}
          icon={faSearch}
        ></FontAwesomeIcon>
        <input className={clsx(styles.input)} placeholder='Search' />
        <FontAwesomeIcon
          className={clsx(styles.icon_close)}
          icon={faClose}
        ></FontAwesomeIcon>
      </div> */}
      <img
        className={clsx(styles.icon__university)}
        src={logo_tdtu}
        alt='tdtu'
      ></img>
    </div>
  );
}

export default Header;
