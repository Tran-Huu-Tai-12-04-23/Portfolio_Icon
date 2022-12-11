import clsx from "clsx";
import { useDrag } from "react-dnd";
import { useState, useEffect, useContext } from "react";
import { ResizableBox as ReactResizableBox } from "react-resizable";
import { RiEdit2Fill } from "react-icons/ri";

import "./resizeable.css";
import styles from "./Item.module.scss";
import { Overlay, TipSuggest } from "~/Components";
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
  setUppercase,
} from "~/Store/reducer/actions";
import { ContextShowEditorComponent } from "~/Store/Context";
import { BiCloudSnow } from "react-icons/bi";

function Item({
  type,
  id,
  inGrid = false,
  isMutily = false,
  type1,
  type2,
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
      item: { id, left, top, inGrid, type, isMutily, type1, type2 },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [id, left, top, inGrid, isMutily]
  );

  const [value, setValue] = useState("Enter text !!!");
  const [linkItemTypeA, setLinkItemTypeA] = useState("");
  const [Type, setType] = useState("div");
  const [linkImg, setLinkImg] = useState("");
  const [state, dispatch] = useContext(ContextReducer);
  const [showModal, setShowModal] = useState(true);
  //use context get state show and hidden editor component
  const [showEditorComponent, setEditorComponent] = useContext(
    ContextShowEditorComponent
  );

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
    const height = e.target.parentElement.offsetHeight + 2;
    const changeHeight = e.target.scrollHeight;
    if (changeHeight > height) {
      e.target.parentElement.style.height = `${
        height + (changeHeight - height)
      }px`;
    }
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
    dispatch(setBorderSize(item.style.borderWidth));
    const upperCase = item.style.textTransform === "uppercase" ? true : false;
    dispatch(setUppercase(upperCase));
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

  const handleEditLink = (e) => {
    e.stopPropagation();
    setEditorComponent(true);
    setShowModal(!showModal);
    dispatch(
      setIdIemSlected(
        e.target.id ? e.target.id : e.target.parentElement.parentElement.id
      )
    );
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
      setType("a");
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
    if (type === "input" && !icon) {
      setType("textarea");
    }
    if (href && type === "a") {
      propsTypeLink.href = href;
      propsTypeLink.target = "_blank";
    }
  }, [linkImg]);

  //examaple
  //set style for component
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
      // set center text in component
      itemSlected.style.textAlign = state.align_center ? "center" : "";
      itemSlected.style.display = state.align_center ? "flex" : "";
      itemSlected.style.justifyContent = state.align_center ? "center" : "";
      //end
      itemSlected.style.borderWidth = state.border_size;
      itemSlected.style.textTransform = state.upper_case_letter
        ? "uppercase"
        : "";
    }
  }, [state]);

  //hanle hidden and show edit component when i click display
  useEffect(() => {
    const handleShowEditorComponent = () => {
      setEditorComponent(false);
    };
    window.addEventListener("click", handleShowEditorComponent);

    return () => {
      window.removeEventListener("click", handleShowEditorComponent);
    };
  }, []);

  // auto set height when text full width
  useEffect(() => {
    const itemSelected = document.getElementById(state.id_item_slected);
    if (itemSelected) {
      const height = itemSelected.parentElement.offsetHeight + 2;
      const changeHeight = itemSelected.scrollHeight;
      if (changeHeight > height) {
        itemSelected.parentElement.style.height = `${
          height + (changeHeight - height)
        }px`;
      }
    }
  }, [state]);

  return (
    <>
      {resizable ? (
        <ReactResizableBox
          width={width}
          height={height}
          style={{ ...stylesItem }}
        >
          <>
            <Type
              ref={drag}
              id={id}
              onClick={hanleSelectItemToEdit}
              className={classNamesItem}
              src={type === "img" ? linkImg : ""}
              value={type !== "img" ? value : undefined}
              onChange={type === "img" ? hanleShowInputImg : handleChangeValue}
              href={linkItemTypeA ? linkItemTypeA : ""}
              target={linkItemTypeA ? "_blank" : null}
              onBlur={handleBlurInput}
              style={{
                opacity: isDragging ? "0.5" : "1",
                textAlign: type === "button" ? "center" : "",
                backgroundColor: type === "a" ? "#1E90FF" : "#fff",
              }}
              type={type === "img" ? "file" : "text"}
              accept={type !== "img" ? null : "image/*"}
            >
              {linkItemTypeA ? linkItemTypeA : null}
            </Type>
            {type === "a" ? (
              <div
                id={id}
                className={clsx(styles.item_edit)}
                onClick={handleEditLink}
              >
                <TipSuggest content='Edit link '>
                  <RiEdit2Fill id={id}></RiEdit2Fill>
                </TipSuggest>
              </div>
            ) : undefined}
          </>
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
      {type === "a" && inGrid && showModal ? (
        <div className={clsx(styles.modal)}>
          <div className={clsx(styles.modal_enter_link)}>
            <h5>Enter link</h5>
            <input
              type='link'
              placeholder='Enter link .'
              onClick={(e) => {
                e.stopPropagation();
              }}
              value={linkItemTypeA}
              onChange={(e) => {
                setEditorComponent(true);
                setLinkItemTypeA(e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.which === 13) {
                  setShowModal(!showModal);
                }
              }}
            ></input>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowModal(!showModal);
              }}
            >
              Enter
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Item;
