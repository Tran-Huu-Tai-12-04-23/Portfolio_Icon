import { useContext, useEffect } from "react";
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

function MultiItem({ stylesItem, id, top, children, inGrid, isMulti }) {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "MULTI_ITEM",
      item: { id, top, inGrid, isMulti },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [id, top, inGrid, isMulti]
  );

  const [state, dispatch] = useContext(ContextReducer);
  const [showEditorComponent, setEditorComponent] = useContext(
    ContextShowEditorComponent
  );

  const handleSelectItemToEdit = (e) => {
    e.stopPropagation();
    loadStyleComponentInInitState(e.target);
    dispatch(setIdItemSelected(e.target.id));
    handleEditorComponent(e);
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
  const handleEditorComponent = (e) => {
    e.stopPropagation();
    loadStyleComponentInInitState(e.target);
    dispatch(setIdItemSelected(e.target.id));
    setEditorComponent(!showEditorComponent);
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

  return (
    <div
      id={id}
      onClick={handleSelectItemToEdit}
      ref={drag}
      className={clsx(styles.wrapper_multi_items)}
      style={{
        ...stylesItem,
      }}
    >
      {children}
    </div>
  );
}

export default MultiItem;
