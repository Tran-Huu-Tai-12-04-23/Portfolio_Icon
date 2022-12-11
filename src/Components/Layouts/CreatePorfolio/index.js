import { useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./CreatePorfolio.module.scss";
import { MdKeyboardArrowUp } from "react-icons/md";
import { VscAdd } from "react-icons/vsc";

import Header from "./Header";
import MenuUntil from "~/Components/MenuUntil";
import { EditorComponent, Trash, TipSuggest } from "~/Components";
import {
  ContextShowEditorComponent,
  ContextItemsIngrid,
} from "~/Store/Context";

function CreatePorfolio({ children }) {
  const [items, setItems] = useState([]);
  const [transactionContent, settransactionContent] = useState("0");
  const [widthMenu, setWidthMenu] = useState("18%");
  const [showScroll, setShowScroll] = useState(false);
  const [goToTop, setGoToTop] = useState(false);
  const [showEditorComponent, setEditorComponent] = useState(false);
  const [showAddHeight, setShowAddHeight] = useState(false);
  const [heightContent, setHeightContent] = useState(0);
  const [heightContentChange, setHeightContentChange] = useState(0);

  useEffect(() => {
    const content = document.getElementById("content_porfolio");
    if (content) {
      setHeightContent(content.offsetHeight);
    }
  }, []);

  useEffect(
    useCallback(() => {
      const content = document.getElementById("wrapper_template_content");
      if (content) {
        content.style.height = `${heightContent}px`;
      }
    }),
    [heightContent]
  );

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
    wrapperContentTemplate.scrollTop = 0;
  };

  useEffect(() => {
    if (items.length <= 0) {
      setEditorComponent(false);
    }
  }, [items]);

  return (
    <ContextItemsIngrid.Provider value={[items, setItems]}>
      <ContextShowEditorComponent.Provider
        value={[showEditorComponent, setEditorComponent]}
      >
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
              <div
                className={clsx(styles.wrapper_template_content)}
                id='wrapper_template_content'
              >
                {children}
                {/* <Grid space={2} gap='12px' backgroundColor='#ccc'></Grid> */}
              </div>
            </div>
            <MenuUntil state={setWidthMenu} valueState={widthMenu}>
              <div className={clsx(styles.wrapper_icon_add_height_content)}>
                <TipSuggest
                  content='Add height page, click'
                  position={"top"}
                  styles={{
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <VscAdd
                    className={clsx(styles.icon_add_height_content)}
                    onClick={(e) => {
                      setShowAddHeight(!showAddHeight);
                    }}
                  ></VscAdd>
                </TipSuggest>
                <div
                  className={clsx(styles.form_enter_height)}
                  style={{
                    display: showAddHeight ? "block" : "none",
                  }}
                >
                  <input
                    type='number'
                    onChange={(e) => {
                      setHeightContentChange(e.target.value);
                    }}
                    onKeyPress={(e) => {
                      if (e.which === 13) {
                        setHeightContent((prev) => {
                          return prev + parseInt(heightContentChange);
                        });
                        setHeightContentChange(0);
                        setShowAddHeight(!showAddHeight);
                      }
                    }}
                    value={heightContentChange}
                    placeholder='Please enter number !!'
                  />
                  <button
                    onClick={(e) => {
                      setHeightContent((prev) => {
                        return prev + parseInt(heightContentChange);
                      });
                      setHeightContentChange(0);
                      setShowAddHeight(!showAddHeight);
                    }}
                  >
                    Enter
                  </button>
                </div>
              </div>
            </MenuUntil>
            <EditorComponent
              style={{ display: showEditorComponent ? "flex" : "none" }}
            ></EditorComponent>
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
      </ContextShowEditorComponent.Provider>
    </ContextItemsIngrid.Provider>
  );
}

export default CreatePorfolio;
