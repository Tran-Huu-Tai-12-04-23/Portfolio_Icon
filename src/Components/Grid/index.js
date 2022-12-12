import clsx from "clsx";
import { useCallback, useState, useEffect, useContext } from "react";
import { useDrop, useDragDropManager } from "react-dnd";
import uuid from "react-uuid";

import styles from "./Grid.module.scss";
import { Item, MultiItem } from "~/Components";
import { ContextItemsIngrid } from "~/Store/Context";
import ComponentLayouts from "./ComponentLayouts";

function Grid(props) {
  const [items, setItems] = useContext(ContextItemsIngrid);
  const [backgroundColor, setBackgroundColor] = useState("#fff");

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ["ITEM_IN_GRID", "Item", "MULTI_ITEM"],
    drop(item, monitor) {
      if (item.inGrid && item.isMulti === false) {
        const delta = monitor.getDifferenceFromInitialOffset();
        let { left, top } = getOffsetItemDrag(item.id, item.isMulti);
        console.log(`check left: ${left} top: ${top} `);
        left = Math.round(left + delta.x);
        top = Math.round(top + delta.y);
        moveItem(item.id, left, top, item.inGrid, item.type);
      } else if (item.inGrid === false && item.isMulti === false) {
        const wrapper = document.getElementById("content_portfolio");
        const valueScrollTop = wrapper.scrollTop;
        const delta = monitor.getClientOffset();
        let left = delta.x - 200;
        let top = delta.y - 116;
        console.log(`left: ${left} top: ${top}`);
        addItem(item.type, left, top + valueScrollTop, uuid());
      } else if (item.inGrid === false && item.isMulti) {
        const wrapper = document.getElementById("content_portfolio");
        const valueScrollTop = wrapper.scrollTop;
        const delta = monitor.getClientOffset();
        let left = 0;
        let right = 0;
        let top = delta.y - 116;
        console.log(`left: ${left} top: ${top}`);
        addItemMulti(
          item.type1,
          item.type2,
          item.type3,
          item.type4,
          left,
          right,
          top + valueScrollTop,
          uuid(),
          uuid(),
          uuid(),
          uuid(),
          uuid(),
          item.numberComponents
        );
      } else {
        const delta = monitor.getDifferenceFromInitialOffset();
        let { top } = getOffsetItemDrag(item.id, item.isMulti);
        console.log(`top: ${top} `);
        top = Math.round(top + delta.y);
        moveItemMulti(item.id, top, item.inGrid, item.isMulti);
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
            isMulti: false,
          },
        ];
      });
    }
  );

  const addItemMulti = (
    type1,
    type2,
    type3,
    type4,
    left,
    right,
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
          right,
          left,
          top,
          width: "100%",
          id,
          inGrid: true,
          isMulti: true,
        },
      ];
    });
  };

  const getOffsetItemDrag = useCallback(
    (id, isMulti) => {
      const item = document.getElementById(id);
      let top, left;
      if (isMulti === false) {
        left = item.parentElement.offsetLeft;
        top = item.parentElement.offsetTop;
      } else {
        left = item.offsetLeft;
        top = item.offsetTop;
      }
      return { left, top };
    },
    [isOver]
  );
  const moveItem = useCallback((id, left, top, inGrid, type) => {
    console.log(
      `left: ${left} top: ${top}  inGrid: ${inGrid} id: ${id} type: ${type}`
    );

    const item = document.getElementById(id).parentElement;
    item.style.left = `${left}px`;
    item.style.top = `${top}px`;
  });
  const moveItemMulti = useCallback((id, top, inGrid, isMulti) => {
    console.log(`top: ${top}  inGrid: ${inGrid} id: ${id} isMulti: ${isMulti}`);
    const item = document.getElementById(id);
    item.style.top = `${top}px`;
  });

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
