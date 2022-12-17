import { useContext, useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import clsx from "clsx";

import styles from "./Item.module.scss";
import { ContextReducer, ContextShowEditorComponent } from "~/Store/Context";
import {
  setBackgroundColor,
  setBorderColor,
  setColor,
  setIdItemSelected,
  setFontSize,
  setBorderRadius,
  setFontFamily,
  setBorderStyle,
  setTextAlign,
  setBorderSize,
  setTextTransform,
  setFontWeight,
  setLineHeight,
} from "~/Store/reducer/actions";
import {
  ContextItemsIngrid,
  ShowOverlay,
  ContextItemsMultiIngrid,
} from "~/Store/Context";

function MultiItem({
  stylesItem,
  id,
  top,
  children,
  inGrid,
  isMulti,
  setHeightDisplayContent,
  styleDefault,
  styleDefaultChild,
}) {
  const [items, setItems] = useContext(ContextItemsIngrid);
  const [itemMulti, setItemMulti] = useContext(ContextItemsMultiIngrid);
  const [heightWrapperContent, setHeightWrapperContent] = useState(200);
  const [topWrapperContent, setTopWrapperContent] = useState(top);
  const [state, dispatch] = useContext(ContextReducer);
  const [showEditorComponent, setEditorComponent] = useContext(
    ContextShowEditorComponent
  );
  const showOverlayComponent = useContext(ShowOverlay);

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "MULTI_ITEM",
      item: {
        id,
        top,
        inGrid,
        isMulti,
        items,
        styleDefault,
        styleDefaultChild,
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [id, top, inGrid, isMulti]
  );

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
  // find item
  const findItem = (id) => {
    var item;
    items.forEach((element) => {
      if (element.id === id) {
        item = element;
      }
    });
    itemMulti.map((element) => {
      if (element.id === id) {
        item = element;
      }
    });
    return item;
  };
  const handleSelectItemToEdit = (e) => {
    e.stopPropagation();
    // console.log(e.target);
    // console.log(styleDefault);
    if (findItem(getId(e))) {
      loadStyleComponentInInitState(findItem(getId(e)));
    }
    dispatch(setIdItemSelected(e.target.id));
    setEditorComponent(true);
  };
  const loadStyleComponentInInitState = (item) => {
    if (item) {
      if (item.styleDefault) {
        dispatch(
          setColor(item.styleDefault.color ? item.styleDefault.color : "")
        );
        dispatch(
          setBackgroundColor(
            item.styleDefault.backgroundColor
              ? item.styleDefault.backgroundColor
              : ""
          )
        );
        dispatch(
          setFontSize(
            item.styleDefault.fontSize ? item.styleDefault.fontSize : ""
          )
        );
        dispatch(
          setFontFamily(
            item.styleDefault.fontFamily ? item.styleDefault.fontFamily : ""
          )
        );
        dispatch(
          setBorderRadius(
            item.styleDefault.borderRadius ? item.styleDefault.borderRadius : ""
          )
        );
        dispatch(
          setBorderStyle(
            item.styleDefault.borderStyle ? item.styleDefault.borderStyle : ""
          )
        );
        dispatch(
          setBorderColor(
            item.styleDefault.borderColor ? item.styleDefault.borderColor : ""
          )
        );
        dispatch(setFontWeight(item.styleDefault.fontWeight ? true : false));
        dispatch(setTextAlign(item.styleDefault.textAlign ? true : false));
        dispatch(
          setBorderSize(
            item.styleDefault.borderWidth ? item.styleDefault.borderWidth : ""
          )
        );
        dispatch(
          setTextTransform(item.styleDefault.textTransform ? true : false)
        );
        dispatch(
          setLineHeight(
            item.styleDefault.lineHeight ? item.styleDefault.lineHeight : ""
          )
        );
      }
    }
  };

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

  //set top again
  useEffect(() => {
    setTopWrapperContent(top);
  }, [top]);
  // get useState showOverlay
  let showOverlay, setShowOverlay;
  useEffect(() => {
    if (showOverlayComponent) {
      [showOverlay, setShowOverlay] = showOverlayComponent;
    }
  });

  const mouseDown = (e) => {
    e.preventDefault();
    setShowOverlay(true);
    const startHeight = heightWrapperContent;
    const startPosition = e.pageY;
    console.log(startHeight);
    function onMouseMove(e) {
      setHeightWrapperContent(startHeight - startPosition + e.pageY);
      if (setHeightDisplayContent) {
        setHeightDisplayContent(startHeight - startPosition + e.pageY);
      }
    }
    function onMouseUp() {
      setShowOverlay(false);
      document.body.removeEventListener("mousemove", onMouseMove);
      document.body.removeEventListener("mouseup", onMouseUp);
    }

    document.body.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div
      id={id}
      onClick={handleSelectItemToEdit}
      ref={drag}
      className={clsx(styles.wrapper_multi_items)}
      style={{
        ...stylesItem,
        height: heightWrapperContent,
        top: topWrapperContent,
        ...styleDefault,
      }}
    >
      <span
        onMouseDown={mouseDown}
        className={clsx(styles.add_height_bottom)}
      ></span>
      {children}
    </div>
  );
}

export default MultiItem;
