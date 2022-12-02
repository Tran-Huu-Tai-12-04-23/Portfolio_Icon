import {
  faArrowLeft,
  faArrowRight,
  faDownLeftAndUpRightToCenter,
  faUpRightAndDownLeftFromCenter,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { useState } from "react";

import styles from "./Input.module.scss";

function Input({ text }) {
  const initValueIput = "Enter text !!";
  const [textInput, setTextInput] = useState(initValueIput);
  const [border, setBoder] = useState(true);
  const [size, setSize] = useState({ x: 200 });

  const handler = (mouseDownEvent) => {
    const startSize = size;
    const startPosition = { x: mouseDownEvent.pageX };

    function onMouseMove(mouseMoveEvent) {
      setSize((currentSize) => ({
        x: startSize.x - startPosition.x + mouseMoveEvent.pageX,
      }));
    }
    function onMouseUp() {
      document.body.removeEventListener("mousemove", onMouseMove);
    }

    document.body.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseup", onMouseUp, { once: true });
  };
  const handleChangeValue = (e) => {
    setTextInput(e.target.value);
    if (textInput.trim() === "") {
      setTextInput(initValueIput);
    }
  };
  const handleChangeBorder = (e) => {
    if (e.target.value === "") {
      setTextInput(initValueIput);
    }
    if (e.target.value !== initValueIput && e.target.value !== "") {
      setBoder(!border);
    }
  };

  const classNames = clsx(
    styles.normal,
    { [styles.text]: text },
    {
      [styles.dotted]: border,
    }
  );

  return (
    <div
      style={{
        width: size.x,
      }}
      className={clsx(styles.wrapper)}
    >
      <FontAwesomeIcon
        className={clsx(styles.icon_left)}
        icon={faArrowLeft}
        onMouseDown={handler}
      ></FontAwesomeIcon>
      <FontAwesomeIcon
        className={clsx(styles.icon_right)}
        icon={faArrowRight}
        onMouseDown={handler}
      ></FontAwesomeIcon>
      <input
        value={textInput}
        className={classNames}
        onChange={(e) => handleChangeValue(e)}
        onBlur={(e) => handleChangeBorder(e)}
        type='text'
      ></input>
    </div>
  );
}

export default Input;
