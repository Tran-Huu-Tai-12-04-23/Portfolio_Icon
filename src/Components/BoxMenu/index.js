import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTextWidth,
  faLink,
  faBox,
  faTabletButton,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";

import styles from "./BoxMenu.module.scss";
import { Item, TipSuggest } from "~/Components";

function BoxMenu() {
  return (
    <div className={clsx(styles.wrapper)} id='menu_1'>
      <TipSuggest
        content='Text'
        position={"top"}
        styles={{
          width: "100%",
          height: "100%",
        }}
      >
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
      </TipSuggest>

      <TipSuggest
        content='Link'
        position={"top"}
        styles={{
          width: "100%",
          height: "100%",
        }}
      >
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
      </TipSuggest>
      <TipSuggest
        content='Link'
        position={"top"}
        styles={{
          width: "100%",
          height: "100%",
        }}
      >
        <Item
          resizable={false}
          id='item_image'
          type='img'
          draggable='true'
          className={clsx(styles.item_img)}
          icon
          stylesItem={{
            position: "unset",
            border: "none",
            backgroundColor: "var(--primary_color_component)",
          }}
        >
          <FontAwesomeIcon icon={faImage}></FontAwesomeIcon>
        </Item>
      </TipSuggest>
    </div>
  );
}

export default BoxMenu;
