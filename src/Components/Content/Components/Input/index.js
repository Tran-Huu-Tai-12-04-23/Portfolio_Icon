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
  const classNames = clsx(styles.normal, { [styles.text]: text });

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
      <input className={classNames} type='text'></input>
    </div>
  );
}

export default Input;
