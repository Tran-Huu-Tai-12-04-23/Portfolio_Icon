import clsx from "clsx";
import { useEffect, useState } from "react";

import styles from "./Grid.module.scss";

function Grid(props) {
  const drop = (e) => {
    const item_id = e.dataTransfer.getData("item_id");
    const item = document.getElementById(item_id);
    if (item) {
      console.log(item.offsetParent);
      item.style.opacity = "1";
      const newItem = item.cloneNode(true);
      e.target.appendChild(newItem);
      console.log(e.target);
    }
  };

  const dragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className={clsx(styles.wrapper)}
      id={props.id}
      onDrop={drop}
      onDragOver={dragOver}
    >
      {props.children}
    </div>
  );
}

export default Grid;
