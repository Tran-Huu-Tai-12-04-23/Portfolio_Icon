import clsx from "clsx";
import { useDrag } from "react-dnd";
import { useState, useEffect, useContext, useRef } from "react";
import { ResizableBox as ReactResizableBox } from "react-resizable";
import { RiEdit2Fill } from "react-icons/ri";
import { IoIosAdd } from "react-icons/io";

import "./resizeable.css";
import styles from "./Item.module.scss";
import { TipSuggest } from "~/Components";
import {
  ContextReducer,
  ContextItemsIngrid,
  HeightHeading,
  ContextShowEditorComponent,
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
  icon = false,
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
  InfoIcon,
}) {
  const [items, setItems] = useContext(ContextItemsIngrid);
  const [value, setValue] = useState(valueItem ? valueItem : "Enter text !!!");
  const [linkItemTypeA, setLinkItemTypeA] = useState(href ? href.href : "");
  const [nameItemLink, setNameItemLink] = useState(href ? href.name : "");
  const [Type, setType] = useState("div");
  const [linkImg, setLinkImg] = useState(src ? src : "");
  const [state, dispatch] = useContext(ContextReducer);
  const [showModal, setShowModal] = useState(href ? false : true);
  const [showEditLinkIcon, setShowEditLinkIcon] = useState(false);
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
  const inputEditLinkIcon = useRef();
  const [linkIcon, setLinkIcon] = useState("");

  const classNamesItem = clsx(
    styles.wrapper,
    styles.text,
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
    },
    {
      [styles.icon_ingrid]: type === "icon" && inGrid,
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
        InfoIcon,
        icon,
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
    console.log(item);
    dispatch(setColor(item.style.color));
    dispatch(setBackgroundColor(item.style.backgroundColor));
    dispatch(setFontSize(item.style.fontSize ? item.style.fontSize : "14px"));
    dispatch(setFontFamily(item.style.fontFamily));
    dispatch(
      setBorderRadius(item.style.borderRadius ? item.style.borderRadius : "0px")
    );
    dispatch(setBorderStyle(item.style.borderStyle));
    dispatch(setBorderColor(item.style.borderColor));
    dispatch(setFontWeight(item.style.fontWeight ? true : false));
    const alignText = item.style.textAlign === "center" ? true : false;
    dispatch(setAlignCenter(alignText));
    dispatch(setBorderSize(item.style.borderWidth));
    const upperCase = item.style.textTransform === "uppercase" ? true : false;
    dispatch(setUppercase(upperCase));
    dispatch(
      setLineHeight(item.style.lineHeight ? item.style.lineHeight : "14px")
    );
  };

  const handleEditorComponent = (e) => {
    e.stopPropagation();
    loadStyleComponentInInitState(getParent(e));
    // dispatch(setIdItemSelected(e.target.id));
    setEditorComponent(true);
  };

  //get id if component multi layer
  const getId = (e) => {
    let item = e.target;
    while (item.parentNode) {
      if (item.id) {
        return item.id;
      }
      item = item.parentElement;
    }
  };
  //get element parent cho item
  const getParent = (e) => {
    let item = e.target;
    while (item.parentNode) {
      if (item.id) {
        return item;
      }
      item = item.parentElement;
    }
  };
  const handleSelectItemToEdit = (e) => {
    // e.preventDefault();
    e.stopPropagation();
    dispatch(setIdItemSelected(getId(e)));
    loadStyleComponentInInitState(getParent(e));
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
    if (type === "icon") {
      setType("div");
    }
  }, [linkImg]);

  //set style for component
  useEffect(() => {
    const itemSelected = document.getElementById(state.id_item_selected);
    if (itemSelected) {
      itemSelected.style.color = state.color;
      itemSelected.style.backgroundColor = state.background_color;
      itemSelected.style.fontSize = state.font_size;
      itemSelected.style.fontFamily = state.font_family;
      itemSelected.style.borderRadius = state.border_radius;
      itemSelected.style.borderStyle = state.border_style;
      itemSelected.style.borderColor = state.border_color;
      itemSelected.style.fontWeight = state.font_weight ? "bold" : "";
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

  // render item

  const renderItem = () => {
    if (resizable && type !== "icon") {
      return (
        <ReactResizableBox
          width={widthContents ? parseInt(widthContents) : parseInt(width)}
          height={type === "input" ? heightWrapperReSizeable : height}
          // onClick={handleSelectItemToEdit}
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
      );
    } else if (icon) {
      return (
        <Type
          onClick={resizable ? handleSelectItemToEdit : null}
          id={id}
          ref={drag}
          className={classNamesItem}
          style={{
            ...stylesItem,
            opacity: isDragging ? "0.5" : "1",
            opacity: opacity ? "0.4" : "1",
            // height: height,
            // width: width,
            width: isMulti ? "100%" : "40px",
            height: "40px",
            ...styleDefault,
          }}
          value={value}
          onChange={handleChangeValue}
          onBlur={handleBlurInput}
        >
          {children}
        </Type>
      );
    } else {
      return (
        <ReactResizableBox
          width={40}
          height={40}
          style={{
            ...stylesItem,
          }}
        >
          <>
            <a
              id={id}
              ref={draggable ? drag : null}
              onClick={handleSelectItemToEdit}
              className={classNamesItem}
              target='_blank'
              href={linkIcon ? linkIcon : null}
              styles={{
                ...styleDefault,
              }}
            >
              {InfoIcon ? InfoIcon.Component : null}
            </a>
            <div
              className={clsx(styles.item_edit)}
              onClick={(e) => {
                e.stopPropagation();
                inputEditLinkIcon.current.focus();
                setShowEditLinkIcon(true);
                if (inputEditLinkIcon) {
                  setEditorComponent(true);
                }
              }}
            >
              <TipSuggest content='Add link '>
                <RiEdit2Fill id={id}></RiEdit2Fill>
              </TipSuggest>
            </div>
            <div
              className={clsx(styles.enter_link_icon)}
              style={{
                display: showEditLinkIcon ? "flex" : "none",
              }}
            >
              <input
                placeholder="After adding,you can't edit the item's style"
                ref={inputEditLinkIcon}
                onChange={(e) => {
                  setLinkIcon(e.target.value);
                  e.stopPropagation();
                }}
                value={linkIcon}
                onKeyPress={(e) => {
                  if (e.which === 13) {
                    e.stopPropagation();
                    setShowEditLinkIcon(false);
                    setLinkIcon(e.target.value);
                  }
                }}
                onBlur={(e) => {
                  e.stopPropagation();
                  setShowEditLinkIcon(false);
                  setLinkIcon(e.target.value);
                }}
              ></input>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowEditLinkIcon(false);
                }}
              >
                Enter
              </button>
            </div>
          </>
        </ReactResizableBox>
      );
    }
  };

  return (
    <>
      {renderItem()}
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
