import { useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./CreatePorfolio.module.scss";

import Header from "./Header";
import MenuUntil from "~/Components/MenuUntil";
import { EditorComponent, Trash, TipSuggest } from "~/Components";
import { MdKeyboardArrowUp } from "react-icons/md";

function CreatePorfolio({ children }) {
  const [transactionContent, settransactionContent] = useState("0");
  const [widthMenu, setWidthMenu] = useState("18%");
  const [showScroll, setShowScroll] = useState(false);
  const [goToTop, setGoToTop] = useState(false);

  const hanleShowScroll = (e) => {
    if (e.currentTarget.scrollTop === 0) {
      setShowScroll(false);
    } else {
      setShowScroll(true);
    }
    setGoToTop(e.currentTarget.scrollTop > 200 ? true : false);
  };

  useEffect(() => {
    settransactionContent(widthMenu === "0" ? "9%" : "0");
  }, [widthMenu]);

  const hanleGoToTop = (e) => {
    const wrapperContentTemplate = document.getElementById("content_porfolio");
    console.log(wrapperContentTemplate.scrollTop);
    wrapperContentTemplate.scrollTop = 0;
  };

  return (
    <div className={clsx(styles.wrapper)}>
      <Header />
      <div className={clsx(styles.content)}>
        <div
          id={"content_porfolio"}
          className={clsx(styles.wrapper_template, {
            [styles.show_scroll]: showScroll,
          })}
          style={{
            width: "80%",
            transform: `translateX(${transactionContent})`,
          }}
          onScroll={hanleShowScroll}
        >
          <div className={clsx(styles.wrapper_template_content)}>
            {children}
            {/* <Grid space={2} gap='12px' backgroundColor='#ccc'></Grid> */}
          </div>
        </div>
        <MenuUntil state={setWidthMenu} valueState={widthMenu} />
        <EditorComponent></EditorComponent>
        <Trash id={"trash"}></Trash>
        <MdKeyboardArrowUp
          onClick={hanleGoToTop}
          className={clsx(styles.go_to_top)}
          style={{
            display: goToTop ? "block" : "none",
          }}
        ></MdKeyboardArrowUp>
      </div>
    </div>
  );
}

export default CreatePorfolio;
