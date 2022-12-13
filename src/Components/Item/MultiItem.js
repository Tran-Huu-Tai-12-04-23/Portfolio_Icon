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
  setAlignCenter,
  setBorderSize,
  setUppercase,
} from "~/Store/reducer/actions";
import { ContextItemsIngrid } from "~/Store/Context";

function MultiItem({ stylesItem, id, top, children, inGrid, isMulti }) {
  const [items, setItems] = useContext(ContextItemsIngrid);
  const [heightWrapperContent, setHeightWrapperContent] = useState(200);
  const [topWrapperContent, setTopWrapperContent] = useState(top);
  const [state, dispatch] = useContext(ContextReducer);
  const [showEditorComponent, setEditorComponent] = useContext(
    ContextShowEditorComponent
  );

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "MULTI_ITEM",
      item: { id, top, inGrid, isMulti, items },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [id, top, inGrid, isMulti]
  );

  const handleSelectItemToEdit = (e) => {
    e.stopPropagation();
    loadStyleComponentInInitState(e.target);
    dispatch(setIdItemSelected(e.target.id));
    setEditorComponent(!showEditorComponent);
  };
  const loadStyleComponentInInitState = (item) => {
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

  const mouseDown = (e) => {
    e.stopPropagation();
    e.preventDefault();
    let prevY = e.clientY;
    let changeY;
    let heightChange;
    const mouseMove = (e) => {
      // setHeightWrapperContent((prev) => {
      //   return prev + e.clientY - prev;
      // });
      console.log("checl" + e.clientY);
      setTopWrapperContent(e.clientY);
    };

    const mouseUp = (e) => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", mouseUp);
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);
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
      }}
    >
      <span
        className={clsx(styles.add_height_top)}
        onMouseDown={mouseDown}
      ></span>
      <span
        onMouseDown={mouseDown}
        className={clsx(styles.add_height_bottom)}
      ></span>
      {children}
    </div>
  );
}

export default MultiItem;
