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
  setIdIemSlected,
  setFontSize,
  setBorderRadius,
  setFontFamily,
  setBorderStyle,
  setAlignCenter,
  setBorderSize,
} from "~/Store/reducer/actions";
import { ContextShowEditorComponent } from "~/Store/Context";
import { BiCloudSnow } from "react-icons/bi";

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
    if (type === "button") {
      setType("input");
      setValue("Enter name button!!");
    }

    if (icon) {
      setType("div");
    }
    if (linkImg) {
      setType("img");
    }
    if (href && type === "a" && isLink) {
      propsTypeLink.href = href;
      propsTypeLink.target = "_blank";
    }
  }, [linkImg]);

  const [state, dispatch] = useContext(ContextReducer);
  //examaple

  useEffect(() => {
    const itemSlected = document.getElementById(state.id_item_slected);
    if (itemSlected) {
      itemSlected.style.color = state.color;
      itemSlected.style.backgroundColor = state.background_color;
      itemSlected.style.fontSize = state.font_size;
      itemSlected.style.fontFamily = state.font_family;
      itemSlected.style.borderRadius = state.border_radius;
      itemSlected.style.borderStyle = state.border_style;
      itemSlected.style.borderColor = state.border_color;
      itemSlected.style.fontWeight = state.font_weight ? "bold" : "400";
      itemSlected.style.textAlign = state.align_center ? "center" : "";
      console.log(state.border_size);
      itemSlected.style.borderWidth = state.border_size;
    }
    console.log(state);
  }, [state]);

  //use context get state show and hidden editor component
  const [showEditorComponent, setEditorComponent] = useContext(
    ContextShowEditorComponent
  );

  const loadStyleComponentInInitstate = (item) => {
    dispatch(setColor(item.style.color));
    dispatch(setBackgroundColor(item.style.backgroundColor));
    dispatch(setFontSize(item.style.fontSize));
    dispatch(setFontFamily(item.style.fontFamily));
    dispatch(setBorderRadius(item.style.borderRadius));
    dispatch(setBorderStyle(item.style.borderStyle));
    dispatch(setBorderColor(item.style.borderColor));
    dispatch(setBorderColor(item.style.fontWeight));
    const alignText = item.style.textAlign === "center" ? true : false;
    dispatch(setAlignCenter(alignText));
    console.log(item.style.borderWidth);
    dispatch(setBorderSize(item.style.borderWidth));
  };

  const hanleEditorComponent = (e) => {
    e.stopPropagation();
    loadStyleComponentInInitstate(e.target);
    dispatch(setIdIemSlected(e.target.id));
    setEditorComponent(!showEditorComponent);
  };

  const hanleSelectItemToEdit = (e) => {
    e.stopPropagation();
    loadStyleComponentInInitstate(e.target);
    dispatch(setIdIemSlected(e.target.id));
    hanleEditorComponent(e);
  };

  useEffect(() => {
    const handleShowEditorComponent = () => {
      setEditorComponent(false);
    };
    window.addEventListener("click", handleShowEditorComponent);

    return () => {
      window.removeEventListener("click", handleShowEditorComponent);
    };
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
            onClick={hanleSelectItemToEdit}
            className={classNamesItem}
            src={type === "img" ? linkImg : ""}
            value={type !== "img" ? value : undefined}
            onChange={type === "img" ? hanleShowInputImg : handleChangeValue}
            onBlur={handleBlurInput}
            style={{
              opacity: isDragging ? "0.5" : "1",
              textAlign: type === "button" ? "center" : "",
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
