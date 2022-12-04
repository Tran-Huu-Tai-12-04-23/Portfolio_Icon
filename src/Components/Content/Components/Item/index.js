import clsx from "clsx";
import { useState, useEffect } from "react";

import styles from "./Item.module.scss";

function Item({
  type,
  id,
  draggable,
  size = { w: "100px", h: "50px" },
  text = "text",
  ...moreProps
}) {
  const [value, setValue] = useState("Enter text !!");

  const dragStart = (e) => {
    const target = e.target;
    e.dataTransfer.setData("item_id", target.id);
    setTimeout(() => {
      target.style.opacity = "0.7";
    }, 0);
  };

  const dragOver = (e) => {
    e.stopPropagation();
  };

  const handleValue = (e) => {
    if (e.target.value === " ") {
      setValue("Enter text !!");
    } else {
      setValue(e.target.value);
    }
  };
  const classNamesItem = clsx(
    styles.wrapper,
    styles.normal,
    {
      [styles.input]: type === "input",
    },
    {
      [styles.a]: type === "a",
    },
    {
      [styles.h1]: type === "h1",
    },
    {
      [styles.img]: type == "img",
    },
    {
      [styles.div]: type == "div",
    }
  );

  const styleItem = {
    width: size.w,
    height: size.h,
  };

  let Type = type;

  console.log("check " + Type);

  return (
    <Type
      id={id}
      onChange={handleValue}
      draggable={draggable}
      onDragOver={dragOver}
      onDragStart={dragStart}
      className={classNamesItem}
      styles={styleItem}
      value={value}
      {...moreProps}
    ></Type>
  );
}

export default Item;
