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
      console.log(item);
      if (item.inGrid) {
        const delta = monitor.getDifferenceFromInitialOffset();
        let { left, top } = getOffetItemDrag(item.id);
        console.log(`check left: ${left} top: ${top} `);
        left = Math.round(left + delta.x);
        top = Math.round(top + delta.y);
        moveItem(item.id, left, top, item.inGrid, item.type);
      } else if (item.isMutily === false) {
        const wrapper = document.getElementById("content_porfolio");
        const valueScrollTop = wrapper.scrollTop;
        const delta = monitor.getClientOffset();
        let left = delta.x - 200;
        let top = delta.y - 116;
        console.log(`left: ${left} top: ${top}`);
        addItem(item.type, left, top + valueScrollTop, uuid());
      } else {
        const wrapper = document.getElementById("content_porfolio");
        const valueScrollTop = wrapper.scrollTop;
        const delta = monitor.getClientOffset();
        let left = 0;
        let right = 0;
        let top = delta.y - 116;
        console.log(`left: ${left} top: ${top}`);
        addItemMutily(
          item.type1,
          item.type2,
          left,
          right,
          top + valueScrollTop,
          uuid()
        );
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
            isMutily: false,
          },
        ];
      });
    }
  );

  const addItemMutily = (type1, type2, left, right, top, id) => {
    setItems((prev) => {
      return [
        ...prev,
        {
          type1,
          type2,
          right,
          left,
          top,
          width: "100%",
          id,
          inGrid: true,
          isMutily: true,
        },
      ];
    });
  };

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
  console.log(items);
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
            if (item.isMutily) {
              return (
                <div
                  className={clsx(styles.wrapper_mutily_items)}
                  key={item.id}
                  id={item.id}
                  style={{
                    top: item.top,
                    left: item.left,
                    right: item.right,
                    width: item.width,
                    height: item.height,
                  }}
                >
                  <Item
                    inGrid={true}
                    type={item.type1}
                    stylesItem={{
                      top: 0,
                      left: item.left,
                      right: "50%",
                      width: item.width / 2,
                    }}
                  ></Item>
                  <Item
                    inGrid={true}
                    type={item.type2}
                    stylesItem={{
                      top: 0,
                      left: "50%",
                      right: item.right,
                      width: item.width / 2 - 12,
                      height: "200px",
                    }}
                  ></Item>
                </div>
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
