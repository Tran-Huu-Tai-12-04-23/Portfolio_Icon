import { useState, useContext } from "react";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faPalette,
} from "@fortawesome/free-solid-svg-icons";

import { GoTextSize } from "react-icons/go";
import { BiFontFamily, BiColorFill } from "react-icons/bi";
import { AiOutlineBorder, AiOutlineFontColors } from "react-icons/ai";
import { FcFullTrash } from "react-icons/fc";

import styles from "./EditorComponent.module.scss";
import { colors, fontFamilys } from "./datas";
import { ContextReducer } from "~/Store/Context";
import {
  setBackgroundColor,
  setColor,
  setFontSize,
} from "~/Store/reducer/actions";

function EditorComponent({ style }) {
  const [state, dispatch] = useContext(ContextReducer);

  const renderOptionColors = () => {
    return colors.map((color, index) => {
      return (
        <li
          key={index}
          onClick={(e) => {
            dispatch(setColor(color));
          }}
          data-color={color}
          style={{
            backgroundColor: color,
          }}
        ></li>
      );
    });
  };

  const renderFontSize = () => {
    const numberFontSize = Array.from(Array(41).keys());
    return numberFontSize.map((size, index) => {
      return (
        <li
          key={index}
          onClick={(e) => {
            dispatch(setFontSize(`${size}px`));
          }}
          data-font-size={size}
        >
          {size}
        </li>
      );
    });
  };

  const renderFontFamily = () => {
    return fontFamilys.map((fontFamily, index) => {
      return (
        <li key={index} data-font-family={fontFamily + ", sans-serif"}>
          {fontFamily}
        </li>
      );
    });
  };

  const renderOptionBorderColors = () => {
    return colors.map((color, index) => {
      return (
        <li
          key={index}
          data-border-color={color}
          style={{
            backgroundColor: color,
          }}
        ></li>
      );
    });
  };

  const renderOptionBackGroundColor = () => {
    return colors.map((color, index) => {
      return (
        <li
          onClick={(e) => {
            dispatch(setBackgroundColor(color));
          }}
          key={index}
          data-background-color={color}
          style={{
            backgroundColor: color,
          }}
        ></li>
      );
    });
  };

  return (
    <div
      className={clsx(styles.wrapper)}
      style={{
        display: style.display,
      }}
    >
      <div className={clsx(styles.icon, styles.icon_background_color)}>
        <BiColorFill></BiColorFill>
        <FontAwesomeIcon
          className={clsx(styles.icon__arrow_down)}
          icon={faChevronDown}
        ></FontAwesomeIcon>
        <ul
          className={clsx(styles.background_color_options)}
          id='background_color_options'
        >
          {renderOptionBackGroundColor()}
        </ul>
      </div>
      <div className={clsx(styles.icon, styles.icon_color)}>
        <AiOutlineFontColors></AiOutlineFontColors>
        <FontAwesomeIcon
          className={clsx(styles.icon__arrow_down)}
          icon={faChevronDown}
        ></FontAwesomeIcon>
        <ul className={clsx(styles.color_options)} id='color_options'>
          {renderOptionColors()}
        </ul>
      </div>
      <div className={clsx(styles.icon, styles.icon_border_color)}>
        <AiOutlineBorder></AiOutlineBorder>
        <FontAwesomeIcon
          className={clsx(styles.icon__arrow_down)}
          icon={faChevronDown}
        ></FontAwesomeIcon>
        <ul
          className={clsx(styles.border_color_options)}
          id='border_color_options'
        >
          {renderOptionBorderColors()}
        </ul>
      </div>

      <div className={clsx(styles.icon, styles.icon_font_size)}>
        <GoTextSize></GoTextSize>
        <FontAwesomeIcon
          className={clsx(styles.icon__arrow_down)}
          icon={faChevronDown}
        ></FontAwesomeIcon>
        <ul className={clsx(styles.font_size_options)} id='font_size_options'>
          {renderFontSize()}
        </ul>
      </div>
      <div className={clsx(styles.icon, styles.icon_font_style)}>
        <BiFontFamily></BiFontFamily>
        <FontAwesomeIcon
          className={clsx(styles.icon__arrow_down)}
          icon={faChevronDown}
        ></FontAwesomeIcon>
        <ul className={clsx(styles.font_style_options)} id='font_style_options'>
          {renderFontFamily()}
        </ul>
      </div>
      <FcFullTrash
        onClick={() => {
          const itemRemove = document.getElementById(state.id_item_slected);
          if (itemRemove) itemRemove.parentElement.remove();
        }}
        className={clsx(styles.icon_trash)}
      ></FcFullTrash>
    </div>
  );
}

export default EditorComponent;
