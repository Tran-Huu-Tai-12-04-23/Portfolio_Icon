import { useState } from "react";

import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import clsx from "clsx";
import styles from "./MenuUntil.module.scss";
import { BoxMenu } from "~/Components";

function MenuUntil({ state, valueState }) {
  const [show, setShow] = useState(true);
  const [showMenuUtil, setShowMenuUtil] = useState(true);

  const handleChangeMenu = () => {
    setShow(!show);
    setShowMenuUtil(!showMenuUtil);
    if (show === true) {
      state("0");
    } else {
      state("18%");
    }
  };

  return (
    <div
      style={{
        width: valueState,
      }}
      className={clsx(styles.wrapper, {
        [styles.translate_x]: !showMenuUtil,
      })}
    >
      <h1
        className={clsx(styles.title, {
          [styles.hidden]: !show,
        })}
      >
        Insert
      </h1>
      {/* //contenm */}
      <div className={clsx(styles.content)}>
        <BoxMenu></BoxMenu>
      </div>
      <div className={clsx(styles.nav_icon)} onClick={() => handleChangeMenu()}>
        <FontAwesomeIcon
          className={clsx(styles.btn_left_menu, {
            [styles.hidden]: show,
          })}
          icon={faArrowAltCircleLeft}
        ></FontAwesomeIcon>
        <FontAwesomeIcon
          className={clsx(styles.btn_right_menu, {
            [styles.hidden]: !show,
          })}
          icon={faArrowAltCircleRight}
        ></FontAwesomeIcon>
      </div>
    </div>
  );
}

export default MenuUntil;
