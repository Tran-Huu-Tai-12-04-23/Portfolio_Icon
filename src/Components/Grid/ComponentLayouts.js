import clsx from "clsx";
import { useState, useEffect } from "react";

import styles from "./Grid.module.scss";
import { MultiItem, Item } from "~/Components";

function ComponentLayouts({ item }) {
  const [widthDisplay, setWidthDisplay] = useState();
  const [heightDisplay, setHeightDisplay] = useState();

  //get height and width of wrapper content
  useEffect(() => {
    const wrapper = document.getElementById("content_portfolio");
    if (wrapper) {
      setWidthDisplay(wrapper.offsetWidth + 1000);
      setHeightDisplay(wrapper.offsetHeight * 0.4);
    }
  });

  const renderComponents = () => {
    if (item.numberComponents === 3) {
      return (
        <MultiItem
          isMulti={true}
          inGrid={true}
          top={item.top}
          id={item.id}
          className={clsx(styles.wrapper_multi_items)}
          key={item.id}
          stylesItem={{
            top: item.top / 1.5,
            left: item.left,
            right: item.right,
            height: heightDisplay,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Item
            key={item.idItem1}
            id={item.idItem1}
            inGrid={true}
            type={item.type1}
            width={widthDisplay / 2 - 24}
            height={heightDisplay - 24}
            draggable={false}
            stylesItem={{
              top: 0,
              left: item.left + 12,
              marginTop: "12px",
              maxWidth: "48%",
            }}
          ></Item>
          <Item
            key={item.idItem2}
            id={item.idItem2}
            inGrid={true}
            width={widthDisplay / 2 - 24}
            height={heightDisplay * 0.2 + 12}
            draggable={false}
            type={item.type2}
            fontSize='24px'
            heading='true'
            stylesItem={{
              top: 0,
              right: item.right + 12,
              marginTop: "12px",
              maxWidth: "48%",
            }}
          ></Item>
          <Item
            key={item.idItem3}
            id={item.idItem3}
            inGrid={true}
            width={widthDisplay / 2 - 24}
            height={heightDisplay - (heightDisplay * 0.2 + 48)}
            draggable={false}
            type={item.type3}
            stylesItem={{
              bottom: "12px",
              right: item.right + 12,
              marginTop: "12px",
              maxWidth: "48%",
            }}
          ></Item>
        </MultiItem>
      );
    } else if (item.numberComponents === 4) {
      return (
        <MultiItem
          isMulti={true}
          inGrid={true}
          top={item.top}
          id={item.id}
          className={clsx(styles.wrapper_multi_items)}
          key={item.id}
          stylesItem={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            top: item.top / 1.5,
            left: item.left,
            right: item.right,
            height: heightDisplay,
          }}
        >
          <Item
            key={item.idItem1}
            id={item.idItem1}
            position='unset'
            inGrid={true}
            type={item.type1}
            width={widthDisplay / 4 - 12}
            height={heightDisplay - 24}
            draggable={false}
            stylesItem={{
              position: "unset",
              margin: "12px",
            }}
          ></Item>
          <Item
            key={item.idItem2}
            id={item.idItem2}
            position='unset'
            inGrid={true}
            width={widthDisplay / 4 - 12}
            height={heightDisplay - 24}
            draggable={false}
            type={item.type2}
            stylesItem={{
              position: "unset",
              margin: "12px",
            }}
          ></Item>
          <Item
            key={item.idItem3}
            id={item.idItem3}
            position='unset'
            inGrid={true}
            width={widthDisplay / 4 - 12}
            height={heightDisplay - 24}
            draggable={false}
            type={item.type3}
            stylesItem={{
              position: "unset",
              margin: "12px",
            }}
          ></Item>
          <Item
            key={item.idItem4}
            id={item.idItem4}
            position='unset'
            inGrid={true}
            width={widthDisplay / 4 - 12}
            height={heightDisplay - 24}
            draggable={false}
            type={item.type4}
            stylesItem={{
              position: "unset",
              margin: "12px",
            }}
          ></Item>
        </MultiItem>
      );
    }
  };
  return renderComponents();
}

export default ComponentLayouts;
