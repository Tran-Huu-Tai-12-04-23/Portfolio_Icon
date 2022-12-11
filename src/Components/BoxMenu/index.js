import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTextWidth,
  faLink,
  faBox,
  faTabletButton,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import { BsFillMenuButtonFill } from "react-icons/bs";
import { TfiText } from "react-icons/tfi";
import { BsBox, BsImage } from "react-icons/bs";
import { AiOutlineAlignLeft } from "react-icons/ai";

import styles from "./BoxMenu.module.scss";
import { Item, TipSuggest } from "~/Components";

function BoxMenu() {
  return (
    <div className={clsx(styles.wrapper)} id='menu_1'>
      <div className={clsx(styles.wrapper_single_component)}>
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
            <TfiText
              style={{
                fontSize: "18px",
              }}
            ></TfiText>
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
          content='Image'
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
        <TipSuggest
          content='Button'
          position={"top"}
          styles={{
            width: "100%",
            height: "100%",
          }}
        >
          <Item
            resizable={false}
            id='item_button'
            type='button'
            draggable='true'
            className={clsx(styles.item_button)}
            icon
            stylesItem={{
              position: "unset",
              border: "none",
              backgroundColor: "var(--primary_color_component)",
              textAlign: "center",
            }}
          >
            <BsFillMenuButtonFill></BsFillMenuButtonFill>
          </Item>
        </TipSuggest>
        <TipSuggest content='Box'>
          <Item
            resizable={false}
            id='item_div'
            type='div'
            draggable='true'
            className={clsx(styles.item_button)}
            icon
            stylesItem={{
              position: "unset",
              border: "none",
              backgroundColor: "var(--primary_color_component)",
              textAlign: "center",
            }}
          >
            <BsBox
              style={{
                fontWeight: 800,
                fontSize: 16,
              }}
            ></BsBox>
          </Item>
        </TipSuggest>
      </div>
      <div className={clsx(styles.mutily_items)}>
        <Item
          resizable={false}
          id='item_div'
          type1='img'
          type2='input'
          isMutily='true'
          draggable='true'
          className={clsx(styles.item_button)}
          icon
          stylesItem={{
            position: "unset",
            border: "none",
            backgroundColor: "var(--primary_color_component)",
            textAlign: "center",
          }}
        >
          <TipSuggest content='Layout about'>
            <div className={clsx(styles.wrapper_icon)}>
              <BsImage
                style={{
                  fontWeight: 800,
                  fontSize: 16,
                }}
              ></BsImage>
              <AiOutlineAlignLeft
                style={{
                  fontWeight: 800,
                  fontSize: 16,
                }}
              ></AiOutlineAlignLeft>
            </div>
          </TipSuggest>
        </Item>
      </div>
    </div>
  );
}

export default BoxMenu;
