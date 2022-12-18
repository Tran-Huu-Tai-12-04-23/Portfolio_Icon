import { useEffect, useState } from "react";
import { useDragDropManager, useDrop } from "react-dnd";

import clsx from "clsx";
import styles from "./Overlay.module.scss";
import Item from "./Item";

function Overlay() {
  const id = Array.from(Array(190).keys());
  let top = 0;
  let left = 0;
  return (
    <>
      {id.map((id) => {
        left += 8.33333333333;
        // console.log(`top: ${top} : left ${left}`);
        // console.log(`id : ${id}`);
        if (left > 100) {
          top += 60;
          left = 0;
        }

        return (
          <Item
            top={`${top - 60}px`}
            left={`${left - 8.33333333333}%`}
            key={id}
          ></Item>
        );
      })}
    </>
  );
}

export default Overlay;
