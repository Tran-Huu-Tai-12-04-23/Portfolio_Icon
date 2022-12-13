import clsx from "clsx";
import { useState, useEffect, useRef, useContext } from "react";

import styles from "./Item.module.scss";
import { MultiItem, Item } from "~/Components";
import { ElementContentPortfolio, HeightHeading } from "~/Store/Context";

function ComponentLayouts({ item, opacity, children }) {
  const [widthDisplayContent, setWidthDisplayContent] = useState();
  const [heightDisplayContent, setHeightDisplayContent] = useState();
  const [contentPortfolio, setShowTrash] = useContext(ElementContentPortfolio);

  //get height and width of wrapper content
  useEffect(() => {
    if (contentPortfolio.current) {
      setWidthDisplayContent(contentPortfolio.current.offsetWidth + 1000);
      setHeightDisplayContent(contentPortfolio.current.offsetHeight * 0.4);
    }
  });

  useEffect(() => {
    const itemWrapperComponent = document.getElementById(item.id);
    setHeightDisplayContent(itemWrapperComponent.offsetHeight);
  });

  const renderItem = () => {
    const arr = [1, 2, 3, 4];
    return arr.map((temp, index) => {
      return (
        <div
          key={index}
          style={{
            width: "22%",
            position: "unset",
            margin: "0 12px",
            opacity: opacity ? "0.4" : 1,
          }}
        >
          <Item
            key={item.idItem1}
            id={item.idItem1}
            position='unset'
            inGrid={true}
            type={item.type1}
            width={widthDisplayContent / 4}
            height={(heightDisplayContent / 3.5) * 2}
            draggable={false}
            stylesItem={{
              position: "unset",
              maxWidth: "100%",
            }}
          ></Item>
          <Item
            key={item.idItem2}
            id={item.idItem2}
            position='unset'
            inGrid={true}
            width={widthDisplayContent / 4}
            // height={(heightDisplayContent * 1) / 3.5}
            draggable={false}
            type={item.type2}
            stylesItem={{
              position: "unset",
              maxWidth: "100%",
            }}
          ></Item>
        </div>
      );
    });
  };

  const [heightHeadingText, setHeightHeadingText] = useState(
    heightDisplayContent ? heightDisplayContent * 0.3 + 12 : 50
  );

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
            top: item.top,
            left: item.left,
            right: item.right,
            height: heightDisplayContent,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            opacity: opacity ? "0.4" : 1,
          }}
        >
          <Item
            key={item.idItem1}
            id={item.idItem1}
            inGrid={true}
            type={item.type1}
            width={widthDisplayContent / 2 - 24}
            height={heightDisplayContent - 24}
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
            width={widthDisplayContent / 2 - 24}
            height={heightHeadingText}
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
            width={widthDisplayContent / 2 - 24}
            draggable={false}
            type={item.type3}
            stylesItem={{
              top: heightHeadingText,
              right: item.right + 12,
              marginTop: "20px",
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
            justifyContent: "space-around",
            // alignItems: "center",
            top: item.top,
            left: item.left,
            right: item.right,
            height: heightDisplayContent,
            opacity: opacity ? "0.4" : 1,
          }}
        >
          <Item
            key={item.idItem1}
            id={item.idItem1}
            position='unset'
            inGrid={true}
            type={item.type1}
            width={widthDisplayContent / 4 - 12}
            height={heightDisplayContent - 24}
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
            width={widthDisplayContent / 4 - 12}
            // height={heightDisplayContent - 24}
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
            width={widthDisplayContent / 4 - 12}
            height={heightDisplayContent - 24}
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
            width={widthDisplayContent / 4 - 12}
            // height={heightDisplayContent - 24}
            draggable={false}
            type={item.type4}
            stylesItem={{
              top: 24,
              position: "unset",
              margin: "12px",
            }}
          ></Item>
        </MultiItem>
      );
    } else if (item.numberComponents === 8) {
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
            alignItems: "center",
            top: item.top,
            left: item.left,
            right: item.right,
            height: heightDisplayContent,
            opacity: opacity ? "0.4" : 1,
          }}
        >
          {renderItem()}
        </MultiItem>
      );
    }
  };
  return (
    <HeightHeading.Provider value={[heightHeadingText, setHeightHeadingText]}>
      {renderComponents()}
    </HeightHeading.Provider>
  );
}

export default ComponentLayouts;
