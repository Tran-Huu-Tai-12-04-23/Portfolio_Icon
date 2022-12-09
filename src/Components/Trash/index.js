import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useDrop, useDragDropManager } from "react-dnd";
import clsx from "clsx";
import { FcEmptyTrash } from "react-icons/fc";

import styles from "./Trash.module.scss";

function Trash({ id }) {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "ITEM_IN_GRID",
    drop(item, monitor) {
      if (item.inGrid) {
        const indexComponent = document.getElementById(item.id).parentElement;
        indexComponent.remove();
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <div
      id={id}
      ref={drop}
      style={{
        backgroundColor: isOver ? "red" : "#3366cc",
      }}
      className={clsx(styles.wrapper)}
    >
      <FcEmptyTrash
        style={{
          transition: "all 0.3s ease-in-out",
          fontSize: "80px",
          transform: isOver ? "scale(1.2)" : "",
          transform: isOver ? "translateY(20px)" : "",
        }}
      ></FcEmptyTrash>
    </div>
  );
}

export default Trash;
