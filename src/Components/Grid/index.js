import clsx from "clsx";
import { useState, useEffect, useContext } from "react";
import { useDrop, useDragDropManager } from "react-dnd";
import uuid from "react-uuid";

import styles from "./Grid.module.scss";
import { Item, Overlay, TipSuggest } from "~/Components";
import {
  ContextItemsIngrid,
  ElementContentPortfolio,
  ShowOverlay,
} from "~/Store/Context";
import ComponentLayouts from "../Item/ComponentLayouts";

function Grid(props) {
  const [items, setItems] = useContext(ContextItemsIngrid);
  const [backgroundColor, setBackgroundColor] = useState("#fff");
  const [contentPortfolio, setShowTrash, widthContent] = useContext(
    ElementContentPortfolio
  );
  const [showOverlay, setShowOverlay] = useState(false);

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ["ITEM_IN_GRID", "Item", "MULTI_ITEM"],
    drop(item, monitor) {
      if (item.inGrid) {
        const delta = monitor.getDifferenceFromInitialOffset();
        let left, top;
        if (item.left) {
          left = item.left.toString().includes("%")
            ? `calc(${item.left} + ${delta.x}px)`
            : Math.round(item.left + delta.x);
        } else {
          left = Math.round(item.left + delta.x);
        }
        if (item.top) {
          top = item.top.toString().includes("%")
            ? `calc(${item.top} + ${delta.y}px)`
            : Math.round(item.top + delta.y);
        } else {
          top = Math.round(item.top + delta.y);
        }
        console.log(`check left: ${left} top: ${top} `);
        moveItem(item.id, left, top, item.inGrid, item.items);
      } else if (item.inGrid === false && item.isMulti === false) {
        const valueScrollTop = contentPortfolio.current.scrollTop;
        const delta = monitor.getClientOffset();
        const data = monitor.getDifferenceFromInitialOffset();
        console.log(data);
        console.log(delta);
        let left = item.type === "icon" ? delta.x - 350 : delta.x - 400;
        let top = delta.y - 100;

        addItem(item.type, left, top + valueScrollTop, uuid(), item.InfoIcon);
      } else if (item.inGrid === false && item.isMulti) {
        const valueScrollTop = contentPortfolio.current.scrollTop;
        const delta = monitor.getClientOffset();
        let top = delta.y - 116;
        addItemMulti(
          item.type1,
          item.type2,
          item.type3,
          item.type4,
          top + valueScrollTop,
          uuid(),
          uuid(),
          uuid(),
          uuid(),
          uuid(),
          uuid(),
          uuid(),
          uuid(),
          uuid(),
          item.numberComponents
        );
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const addItem = (
    type,
    left = "200px",
    top = "100px",
    id,
    InfoIcon,
    width = 200,
    height = 40
  ) => {
    setItems((prev) => {
      return [
        ...prev,
        {
          type,
          left,
          top,
          id,
          width,
          height,
          inGrid: true,
          isMulti: false,
          InfoIcon,
        },
      ];
    });
  };
  const addItemMulti = (
    type1,
    type2,
    type3,
    type4,
    top,
    id,
    idItem1,
    idItem2,
    idItem3,
    idItem4,
    idItem5,
    idItem6,
    idItem7,
    idItem8,
    numberComponents
  ) => {
    setItems((prev) => {
      return [
        ...prev,
        {
          type1,
          type2,
          type3,
          type4,
          numberComponents,
          idItem1,
          idItem2,
          idItem3,
          idItem4,
          idItem5,
          idItem6,
          idItem7,
          idItem8,
          right: 0,
          left: 0,
          top,
          width: "100%",
          id,
          inGrid: true,
          isMulti: true,
        },
      ];
    });
  };
  const moveItem = (id, left, top, inGrid, items) => {
    items.map((item) => {
      if (item.id === id) {
        console.log(`left: ${left} top: ${top}  inGrid: ${inGrid} id: ${id} `);
        item.top = top;
        if (left) {
          item.left = left;
        }
      }
    });
  };
  //show, hidden trash
  let isDragging = useDragDropManager().monitor.isDragging();
  useEffect(() => {
    setShowTrash(isDragging ? true : false);
  }, [isDragging]);

  const isActive = canDrop && isOver;
  //set style when drop
  useEffect(() => {
    setBackgroundColor(
      isActive
        ? "rgba(102, 102, 255, 0.1)"
        : canDrop
        ? "rgba(255, 102, 153, 0.1)"
        : "#fff"
    );
  }, [{ isActive, canDrop }]);

  return (
    <ShowOverlay.Provider value={[showOverlay, setShowOverlay]}>
      <div
        ref={drop}
        style={{
          backgroundColor,
        }}
        className={clsx(styles.wrapper)}
        id={props.id}
      >
        {items &&
          items.map((item, index) => {
            if (item.isMulti) {
              return (
                <ComponentLayouts
                  key={item.id}
                  item={item}
                  id={"multi_items"}
                  opacity={isDragging ? true : false}
                  styleDefault={item.styles}
                  src={item.src}
                ></ComponentLayouts>
              );
            } else {
              return (
                <Item
                  key={item.id}
                  id={item.id}
                  inGrid={true}
                  type={item.type}
                  width={item.width}
                  height={item.height}
                  valueItem={item.valueItem}
                  center={item.center}
                  href={item.href}
                  icon={false}
                  styleDefault={item.styles}
                  InfoIcon={item.InfoIcon}
                  stylesItem={{
                    top: item.top,
                    left: item.left,
                    width: item.width,
                    height: item.height,
                  }}
                  src={item.src}
                  opacity={isDragging ? true : false}
                ></Item>
              );
            }
          })}
        {props.children}
        <Overlay></Overlay>
      </div>
    </ShowOverlay.Provider>
  );
}

export default Grid;
