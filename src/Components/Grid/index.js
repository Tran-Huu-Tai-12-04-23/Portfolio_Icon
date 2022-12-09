import clsx from "clsx";
import { useCallback, useState, useEffect, useContext } from "react";
import { useDrop, useDragDropManager } from "react-dnd";
import uuid from "react-uuid";

import styles from "./Grid.module.scss";
import { Item } from "~/Components";
import { ContextItemsIngrid } from "~/Store/Context";

function Grid(props) {
  const [items, setItems] = useContext(ContextItemsIngrid);
  const [backgroundColor, setBackgroundColor] = useState("#fff");

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ["ITEM_IN_GRID", "Item"],
    drop(item, monitor) {
      if (item.inGrid) {
        const delta = monitor.getDifferenceFromInitialOffset();
        let { left, top } = getOffetItemDrag(item.id);
        console.log(`check left: ${left} top: ${top} `);
        left = Math.round(left + delta.x);
        top = Math.round(top + delta.y);
        moveItem(item.id, left, top, item.inGrid, item.type);
      } else {
        console.log(item);
        const delta = monitor.getClientOffset();
        let left = delta.x - 200;
        let top = delta.y - 116;
        console.log(`left: ${left} top: ${top}`);
        addItem(item.type, left, top, uuid());
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const addItem = useCallback(
    (
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
          },
        ];
      });
    }
  );

  const getOffetItemDrag = useCallback(
    (id) => {
      const item = document.getElementById(id).parentElement;
      // console.log(item);
      const left = item.offsetLeft;
      const top = item.offsetTop;
      return { left, top };
    },
    [isOver]
  );
  const moveItem = useCallback(
    (id, left, top, inGrid, type) => {
      console.log(
        `left: ${left} top: ${top}  inGrid: ${inGrid} id: ${id} type: ${type}`
      );

      const item = document.getElementById(id).parentElement;
      item.style.left = `${left}px`;
      item.style.top = `${top}px`;
      console.log(item);
    },
    [isOver]
  );

  let isDragging = useDragDropManager().monitor.isDragging();
  useEffect(() => {
    const trash = document.getElementById("trash");
    trash.style.display = isDragging ? "flex" : "none";
  }, [useDragDropManager().monitor.isDragging()]);

  const isActive = canDrop && isOver;
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
          })}
        {props.children}
      </div>
    </>
  );
}

export default Grid;
