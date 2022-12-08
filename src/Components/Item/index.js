import clsx from "clsx";
import { useDrag } from "react-dnd";
import { useState, useEffect, useContext } from "react";
import { ResizableBox as ReactResizableBox } from "react-resizable";

import "./resizeable.css";
import styles from "./Item.module.scss";
import { Overlay } from "~/Components";
import { ContextReducer } from "~/Store/Context";
import {
  setBackgroundColor,
  setTop,
  setLeft,
  setBorderColor,
  setMargin,
  setPadding,
  setHeight,
  setWidth,
  setColor,
  setFont,
} from "~/Store/reducer/actions";

function Item({
  type,
  id,
  inGrid = false,
  stylesItem,
  icon,
  width = 200,
  height = 50,
  resizable = true,
  href = "huutai.com",
  children,
}) {
  var left = stylesItem ? stylesItem.left : 0;
  var top = stylesItem ? stylesItem.top : 0;

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: inGrid ? "ITEM_IN_GRID" : "Item",
      item: { id, left, top, inGrid, type },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [id, left, top, inGrid]
  );

  const [value, setValue] = useState("Enter text !!!");
  const [isLink, setIsLink] = useState(false);
  const [Type, setType] = useState("div");
  const [linkImg, setLinkImg] = useState("");

  const classNamesItem = clsx(
    styles.wrapper,
    styles.normal,
    styles.text,
    {
      [styles.input_text]: type === "input",
    },
    {
      [styles.link]: type === "a",
    },
    {
      [styles.heading]: type === "h1",
    },
    {
      [styles.input_file]: type === "img",
    },
    {
      [styles.box]: type === "div",
    },
    {
      [styles.icon]: icon,
    },
    {
      [styles.item_grid]: inGrid,
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

  const hanleShowInputImg = (e) => {
    const reader = new FileReader();
    var url;
    reader.onload = () => {
      if (reader.readyState === 2) {
        url = reader.result;
        setLinkImg(url);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const propsTypeLink = {
    href: null,
    target: null,
    onClick: null,
    type: "text",
  };

  useEffect(() => {
    if (type) {
      setType(type);
    }
    if (type === "a") {
      setType("input");
      setValue("Enter link!!");
    }
    if (type === "img") {
      setType("input");
      propsTypeLink.type = "file";
    }

    if (href && type === "a" && isLink) {
      propsTypeLink.href = href;
      propsTypeLink.target = "_blank";
    }
    if (icon) {
      setType("div");
    }
    if (linkImg) {
      setType("img");
    }
  }, [linkImg]);

  const [state, dispatch] = useContext(ContextReducer);
  //examaple
  useEffect(() => {
    dispatch(setColor("red"));
  }, []);

  return (
    <>
      {resizable ? (
        <ReactResizableBox
          width={width}
          height={height}
          style={{ ...stylesItem }}
        >
          <Type
            ref={drag}
            id={id}
            className={classNamesItem}
            src={type === "img" ? linkImg : ""}
            value={type !== "img" ? value : undefined}
            onChange={type === "img" ? hanleShowInputImg : handleChangeValue}
            onBlur={handleBlurInput}
            style={{
              backgroundColor: isDragging ? "rgba(255, 59, 92, 0.8)" : "#fff",
            }}
            type={type === "img" ? "file" : "text"}
            accept={type !== "img" ? null : "image/*"}
          ></Type>
        </ReactResizableBox>
      ) : (
        <>
          <Type
            id={id}
            ref={drag}
            className={classNamesItem}
            style={{ ...stylesItem, opacity: isDragging ? "0.5" : "1" }}
            value={value}
            onChange={handleChangeValue}
            onBlur={handleBlurInput}
          >
            {children}
          </Type>
        </>
      )}
    </>
  );
}

export default Item;
