import clsx from "clsx";
import { useDrag } from "react-dnd";
import { useState } from "react";

import styles from "./Item.module.scss";

function Item({
  type = "div",
  id,
  inGrid = false,
  stylesItem,
  icon,
  children,
}) {
  var left = stylesItem ? stylesItem.left : 0;
  var top = stylesItem ? stylesItem.top : 0;

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "Item",
      item: { id, left, top, inGrid, type },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top, inGrid]
  );
  const initialState = type === "input" ? true : false;
  const [allowChangeValue, setAllowChangeValue] = useState(initialState);
  const [value, setValue] = useState("Enter text !!!");

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
    },
    {
      [styles.icon]: icon,
    }
  );

  const handleChangeValue = (e) => {
    setValue(e.target.value);
  };
  const handleBlurInput = (e) => {
    if (e.target.value === "") {
      setValue("Enter text !!!");
    }
  };

  let Type = type;

  if (icon) {
    Type = "div";
  }

  return (
    <Type
      id={id}
      ref={drag}
      className={classNamesItem}
      style={{ ...stylesItem }}
      value={value}
      onChange={handleChangeValue}
      onBlur={handleBlurInput}
    >
      {children}
    </Type>
  );
}

export default Item;
