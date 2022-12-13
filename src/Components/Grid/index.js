import clsx from "clsx";
import { useCallback, useState, useEffect, useContext } from "react";
import { useDrop, useDragDropManager } from "react-dnd";
import uuid from "react-uuid";

import styles from "./Grid.module.scss";
import { Item, MultiItem } from "~/Components";
import { ContextItemsIngrid, ElementContentPortfolio } from "~/Store/Context";
import ComponentLayouts from "../Item/ComponentLayouts";

function Grid(props) {
  const [items, setItems] = useContext(ContextItemsIngrid);
  const [backgroundColor, setBackgroundColor] = useState("#fff");

  const [contentPortfolio, setShowTrash] = useContext(ElementContentPortfolio);

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ["ITEM_IN_GRID", "Item", "MULTI_ITEM"],
    drop(item, monitor) {
      if (item.inGrid) {
        const delta = monitor.getDifferenceFromInitialOffset();
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        console.log(`check left: ${left} top: ${top} `);
        moveItem(item.id, left, top, item.inGrid, item.items);
      } else if (item.inGrid === false && item.isMulti === false) {
        const valueScrollTop = contentPortfolio.current.scrollTop;
        const delta = monitor.getClientOffset();
        let left = delta.x - 200;
        let top = delta.y - 116;
        addItem(item.type, left, top + valueScrollTop, uuid());
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
    width = "200px",
    height = "100px"
  ) => {
    setItems((prev) => {
      return [
        ...prev,
        {
          type,
          left,
          top,
          width,
          height,
          id,
          inGrid: true,
          isMulti: false,
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
        console.log(item);
        console.log(`left: ${left} top: ${top}  inGrid: ${inGrid} id: ${id} `);
        item.top = top;
        if (left) {
          item.left = left;
        }
        console.log(item);
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
        ? "rgba(102, 102, 255, 0.5)"
        : canDrop
        ? "rgba(255, 102, 153, 0.5)"
        : "#fff"
    );
  }, [{ isActive, canDrop }]);

  return (
    <>
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
                <ComponentLayouts key={index} item={item}></ComponentLayouts>
              );
            } else {
              return (
                <Item
                  key={item.id}
                  id={item.id}
                  inGrid={true}
                  type={item.type}
                  stylesItem={{
                    top: item.top,
                    left: item.left,
                    width: item.width,
                    height: item.height,
                  }}
                ></Item>
              );
            }
          })}
        {props.children}
      </div>
    </>
  );
}

export default Grid;
