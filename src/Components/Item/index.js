import clsx from "clsx";
import { useDrag } from "react-dnd";
import { useState, useEffect, useContext, useRef } from "react";
import { ResizableBox as ReactResizableBox } from "react-resizable";
import { RiContactsBookLine, RiEdit2Fill } from "react-icons/ri";

import "./resizeable.css";
import styles from "./Item.module.scss";
import { Overlay, TipSuggest } from "~/Components";
import {
  ContextReducer,
  ContextItemsIngrid,
  HeightHeading,
  ContextShowEditorComponent,
  ShowOverlay,
  ElementContentPortfolio,
} from "~/Store/Context";
import {
  setBackgroundColor,
  setBorderColor,
  setColor,
  setIdItemSelected,
  setFontSize,
  setBorderRadius,
  setFontFamily,
  setBorderStyle,
  setAlignCenter,
  setBorderSize,
  setUppercase,
  setLineHeight,
  setFontWeight,
} from "~/Store/reducer/actions";
import { constantActions } from "~/Constants";

function Item({
  type,
  id,
  inGrid = false,
  isMulti = false,
  type1,
  type2,
  type3,
  type4,
  numberComponents,
  stylesItem,
  fontSize = "14px",
  heading = false,
  icon,
  width = 200,
  height = 50,
  resizable = true,
  draggable = true,
  position = "absolute",
  opacity = false,
  styleDefault = {},
  src,
  href,
  valueItem,
  center = false,
  children,
}) {
  console.log(styleDefault);
  const [items, setItems] = useContext(ContextItemsIngrid);
  const [value, setValue] = useState(valueItem ? valueItem : "Enter text !!!");
  const [linkItemTypeA, setLinkItemTypeA] = useState(href ? href.href : "");
  const [nameItemLink, setNameItemLink] = useState(href ? href.name : "");
  const [Type, setType] = useState("div");
  const [linkImg, setLinkImg] = useState(src ? src : "");
  const [state, dispatch] = useContext(ContextReducer);
  const [showModal, setShowModal] = useState(href ? false : true);
  //use context get state show and hidden editor component
  const [showEditorComponent, setEditorComponent] = useContext(
    ContextShowEditorComponent
  );
  const data = useContext(HeightHeading);
  const elementContentPortfolio = useContext(ElementContentPortfolio);
  const [widthContents, setWidthContents] = useState(width);
  const [heightWrapperReSizeable, setHeightWrapperReSizeable] =
    useState(height);
  const [scrollHeight, setScrollHeight] = useState(0);

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

  var left = stylesItem ? stylesItem.left : 0;
  var top = stylesItem ? stylesItem.top : 0;

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: inGrid ? "ITEM_IN_GRID" : "Item",
      item: {
        id,
        left,
        top,
        inGrid,
        type,
        isMulti,
        type1,
        type2,
        type3,
        type4,
        numberComponents,
        items,
        valueItem,
        center,
        href,
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [id, left, top, inGrid, isMulti]
  );

  let heightHeadingText, setHeightHeadingText;
  const handleChangeValue = (e) => {
    setValue(e.target.value);
    console.log(e.target.scrollHeight);
    console.log(e.target.offsetHeight);
    if (e.target.scrollHeight > e.target.offsetHeight) {
      e.target.style.height = e.target.scrollHeight + "px";
    }
    setHeightWrapperReSizeable(e.target.offsetHeight);
    if (data) {
      [heightHeadingText, setHeightHeadingText] = data;
      setHeightHeadingText(e.target.scrollHeight);
    }
  };

  const handleBlurInput = (e) => {
    if (e.target.value === "") {
      setValue("Enter text !!!");
    }
  };

  const handleShowInputImg = (e) => {
    setValue(e.target.value);
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

  const loadStyleComponentInInitState = (item) => {
    dispatch(setColor(item.style.color));
    dispatch(setBackgroundColor(item.style.backgroundColor));
    dispatch(setFontSize(item.style.fontSize));
    dispatch(setFontFamily(item.style.fontFamily));
    dispatch(setBorderRadius(item.style.borderRadius));
    dispatch(setBorderStyle(item.style.borderStyle));
    dispatch(setBorderColor(item.style.borderColor));
    dispatch(setFontWeight(item.style.fontWeight));
    const alignText = item.style.textAlign === "center" ? true : false;
    dispatch(setAlignCenter(alignText));
    dispatch(setBorderSize(item.style.borderWidth));
    const upperCase = item.style.textTransform === "uppercase" ? true : false;
    dispatch(setUppercase(upperCase));
    dispatch(setLineHeight(item.style.lineHeight));
  };

  const handleEditorComponent = (e) => {
    e.stopPropagation();
    loadStyleComponentInInitState(e.target);
    dispatch(setIdItemSelected(e.target.id));
    setEditorComponent(!showEditorComponent);
  };

  const handleSelectItemToEdit = (e) => {
    e.stopPropagation();
    loadStyleComponentInInitState(e.target);
    dispatch(setIdItemSelected(e.target.id));
    handleEditorComponent(e);
  };

  const handleEditLink = (e) => {
    e.stopPropagation();
    setEditorComponent(true);
    setShowModal(!showModal);
    dispatch(
      setIdItemSelected(
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
    setType(icon ? "div" : type);
    setType(type === "button" ? "input" : type);
    if (type === "img") {
      setType(src ? "img" : "input");
      propsTypeLink.type = "file";
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
    if (heading) {
      setValue("Enter title");
    }
  }, [linkImg]);

  //set style for component
  useEffect(() => {
    const itemSelected = document.getElementById(state.id_item_selected);
    if (itemSelected) {
      console.log(state.font_weight);
      itemSelected.style.color = state.color;
      itemSelected.style.backgroundColor = state.background_color;
      itemSelected.style.fontSize = state.font_size;
      itemSelected.style.fontFamily = state.font_family;
      itemSelected.style.borderRadius = state.border_radius;
      itemSelected.style.borderStyle = state.border_style;
      itemSelected.style.borderColor = state.border_color;
      itemSelected.style.fontWeight = state.font_weight ? "bold" : "400";
      // set center text in component
      itemSelected.style.textAlign = state.align_center ? "center" : "";
      itemSelected.style.display = state.align_center ? "flex" : "";
      itemSelected.style.justifyContent = state.align_center ? "center" : "";
      //end
      itemSelected.style.borderWidth = state.border_size;
      itemSelected.style.textTransform = state.upper_case_letter
        ? "uppercase"
        : "";
      itemSelected.style.lineHeight = state.line_height;
    }
  }, [state]);

  //handle hidden and show edit component when i click display
  useEffect(() => {
    const handleShowEditorComponent = () => {
      setEditorComponent(false);
    };
    window.addEventListener("click", handleShowEditorComponent);
    dispatch(setIdItemSelected(""));
    return () => {
      window.removeEventListener("click", handleShowEditorComponent);
    };
  }, []);

  let contentPortfolio, setShowTrash, widthContent;
  //get width wrapper content
  useEffect(() => {
    if (elementContentPortfolio) {
      [contentPortfolio, setShowTrash, widthContent] = elementContentPortfolio;
      setScrollHeight(contentPortfolio.current.scrollTop);
    }
  }, [elementContentPortfolio]);
  useEffect(() => {
    if (elementContentPortfolio && width === "100%") {
      [contentPortfolio, setShowTrash, widthContent] = elementContentPortfolio;
      setWidthContents(widthContent);
    }
  });
  return (
    <>
      {resizable ? (
        <ReactResizableBox
          width={widthContents ? parseInt(widthContents) : parseInt(width)}
          height={type === "input" ? heightWrapperReSizeable : height}
          style={{
            ...stylesItem,
            transform: center ? "translateX(-50%)" : "none",
            minHeight: 42,
          }}
        >
          <>
            <Type
              id={id}
              ref={draggable ? drag : null}
              onClick={handleSelectItemToEdit}
              className={classNamesItem}
              cols={50}
              src={type === "img" ? linkImg : null}
              value={type !== "img" ? value : undefined}
              onChange={
                type === "input" ? handleChangeValue : handleShowInputImg
              }
              href={linkItemTypeA ? linkItemTypeA : ""}
              target={linkItemTypeA ? "_blank" : null}
              onBlur={handleBlurInput}
              style={{
                opacity: isDragging ? "0.5" : "1",
                textAlign: type === "button" ? "center" : "",
                backgroundColor: type === "a" ? "#1E90FF" : "#fff",
                fontSize: fontSize,
                padding: type !== "img" ? "12px 0" : "",
                position: position,
                lineHeight: heading ? "24px" : "16px",
                opacity: isDragging ? "0.5" : "1",
                opacity: opacity ? "0.4" : "1",
                ...styleDefault,
              }}
              type={type === "img" ? "file" : "text"}
              accept={type !== "img" ? null : "image/*"}
            >
              {nameItemLink ? nameItemLink : null}
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
            onClick={resizable ? handleSelectItemToEdit : null}
            id={id}
            ref={drag}
            className={classNamesItem}
            style={{
              ...stylesItem,
              opacity: isDragging ? "0.5" : "1",
              opacity: opacity ? "0.4" : "1",
              height: height,
              width: width,
              ...styleDefault,
            }}
            value={value}
            onChange={handleChangeValue}
            onBlur={handleBlurInput}
          >
            {children}
          </Type>
        </>
      )}
      {type === "a" && inGrid && showModal ? (
        <div
          className={clsx(styles.modal)}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div
            className={clsx(styles.modal_enter_link)}
            style={{
              top: `${300 + scrollHeight}px`,
            }}
          >
            <h5>Add link</h5>
            <span>Name</span>
            <input
              type='link'
              placeholder='Name'
              onClick={(e) => {
                e.stopPropagation();
              }}
              value={nameItemLink}
              onChange={(e) => {
                setEditorComponent(true);
                setNameItemLink(e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.which === 13) {
                  setShowModal(!showModal);
                }
              }}
            ></input>
            <span>Link</span>
            <input
              type='link'
              placeholder='Link .'
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
