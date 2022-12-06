import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTextWidth,
  faLink,
  faBox,
  faTabletButton,
} from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";

import styles from "./BoxMenu.module.scss";
import { Item } from "~/Components";

function BoxMenu() {
  return (
    <div className={clsx(styles.wrapper)} id='menu_1'>
      <Item
        resizable={false}
        id='item_text'
        draggable='true'
        type='input'
        className={clsx(styles.item_text)}
        icon
        stylesItem={{
          position: "unset",
        }}
      >
        <FontAwesomeIcon icon={faTextWidth}></FontAwesomeIcon>
      </Item>
      <Item
        resizable={false}
        id='item_link'
        type='a'
        draggable='true'
        className={clsx(styles.item_link)}
        icon
        stylesItem={{
          position: "unset",
        }}
      >
        <FontAwesomeIcon icon={faLink}></FontAwesomeIcon>
      </Item>
    </div>
  );
}

export default BoxMenu;
