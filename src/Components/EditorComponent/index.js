import { useCallback, useEffect } from "react";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faPalette,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./EditorComponent.module.scss";

function EditorComponent() {
  const colors = [
    "#000",
    "#fff",
    "#FF0000",
    "#FF00CC",
    "#00FF00",
    "#FF66FF",
    "#FF9900",
    "#33CCFF",
  ];

  useEffect(() => {
    renderColorOptions();
    renderFontSize();
  }, []);

  const renderColorOptions = () => {
    const colorOptions = document.getElementById("color_options");
    const listsItems = colorOptions.querySelectorAll("li");
    var index = 0;
    for (var it of listsItems) {
      it.style.backgroundColor = colors[index];
      it.setAttribute("data-color", colors[index]);
      index++;
    }
  };

  const renderFontSize = () => {
    const item = document.getElementById("font_size_options");
    const listItems = item.querySelectorAll("li");
    var index = 2;
    for (var it of listItems) {
      it.textContent = index;
      it.setAttribute("data-font-size", index);
      index += 4;
    }
  };

  return (
    <div className={clsx(styles.wrapper)}>
      <div className={clsx(styles.icon, styles.icon_color)}>
        <FontAwesomeIcon icon={faPalette}></FontAwesomeIcon>
        <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>
        <ul className={clsx(styles.color_options)} id='color_options'>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div className={clsx(styles.icon, styles.icon_font_size)}>
        <input type='text'></input>
        <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>
        <ul className={clsx(styles.font_size_options)} id='font_size_options'>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  );
}

export default EditorComponent;
