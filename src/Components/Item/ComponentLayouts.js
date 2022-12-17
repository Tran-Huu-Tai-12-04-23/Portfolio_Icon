import clsx from "clsx";
import { useState, useEffect, useRef, useContext } from "react";

import styles from "./Item.module.scss";
import { MultiItem, Item } from "~/Components";
import { ElementContentPortfolio, HeightHeading } from "~/Store/Context";
import uuid from "react-uuid";

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
    const arr = [
      {
        idItem1: item.idItem1,
        idItem2: item.idItem2,
      },
      {
        idItem1: item.idItem3,
        idItem2: item.idItem4,
      },
      {
        idItem1: item.idItem5,
        idItem2: item.idItem6,
      },
      {
        idItem1: item.idItem7,
        idItem2: item.idItem8,
      },
    ];
    return arr.map((temp, index) => {
      return (
        <div
          key={index}
          id={`${index}_wrapper_item_multi`}
          style={{
            width: "22%",
            position: "unset",
            margin: "0 12px",
            opacity: opacity ? "0.4" : 1,
          }}
        >
          <Item
            key={temp.idItem1}
            id={temp.idItem1}
            position='unset'
            inGrid={true}
            type={item.type1}
            width={widthDisplayContent / 4}
            height={(heightDisplayContent / 3.5) * 2}
            draggable={false}
            styleDefault={{
              backgroundColor: "transparent",
              border: "1px solid #000",
            }}
            stylesItem={{
              position: "unset",
              maxWidth: "100%",
            }}
          ></Item>
          <Item
            key={temp.idItem2}
            id={temp.idItem2}
            position='unset'
            inGrid={true}
            width={widthDisplayContent / 4}
            height={40}
            draggable={false}
            type={item.type2}
            styleDefault={{
              backgroundColor: "transparent",
              border: "1px solid #000",
              color: "#757575",
              marginTop: "6px",
            }}
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
          id={item.id}
          isMulti={true}
          inGrid={true}
          top={item.top}
          className={clsx(styles.wrapper_multi_items)}
          key={item.id}
          stylesComponentMulti={item.stylesComponentMulti}
          stylesItem={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 24px",
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
            inGrid={true}
            type={item.type1}
            width={widthDisplayContent / 2 - 24}
            height={heightDisplayContent - 24}
            draggable={false}
            position='unset'
            styleDefault={{
              backgroundColor: "transparent",
              border: "1px solid #000",
            }}
            stylesItem={{
              position: "unset",
              maxWidth: "48%",
            }}
          ></Item>
          <div
            style={{
              width: "50%",
              height: "100%",
              position: "unset",
              marginLeft: 24,
            }}
            id={item.id}
          >
            <Item
              key={item.idItem2}
              id={item.idItem2}
              inGrid={true}
              width={widthDisplayContent / 2 - 24}
              height={40}
              draggable={false}
              position='unset'
              type={item.type2}
              fontSize='24px'
              heading='true'
              styleDefault={{
                backgroundColor: "transparent",
                border: "1px solid #000",
              }}
              stylesItem={{
                maxWidth: "100%",
                position: "unset",
              }}
            ></Item>
            <Item
              key={item.idItem3}
              id={item.idItem3}
              inGrid={true}
              draggable={false}
              width={widthDisplayContent / 2 - 24}
              height={40}
              position='unset'
              type={item.type3}
              styleDefault={{
                backgroundColor: "transparent",
                border: "1px solid #000",
              }}
              stylesItem={{
                maxWidth: "100%",
                position: "unset",
              }}
            ></Item>
          </div>
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
          stylesComponentMulti={item.stylesComponentMulti}
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
          <Item
            key={item.idItem1}
            id={item.idItem1}
            position='unset'
            inGrid={true}
            type={item.type1}
            width={widthDisplayContent / 4 - 12}
            height={heightDisplayContent - 24}
            draggable={false}
            styleDefault={{
              backgroundColor: "transparent",
              border: "1px solid #000",
            }}
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
            styleDefault={{
              backgroundColor: "transparent",
              border: "1px solid #000",
              color: "#757575",
            }}
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
            styleDefault={{
              backgroundColor: "transparent",
              border: "1px solid #000",
            }}
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
            styleDefault={{
              backgroundColor: "transparent",
              border: "1px solid #000",
              color: "#757575",
            }}
            stylesItem={{
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
          stylesComponentMulti={item.stylesComponentMulti}
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
