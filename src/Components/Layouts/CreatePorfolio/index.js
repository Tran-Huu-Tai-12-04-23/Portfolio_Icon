import { useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./CreatePorfolio.module.scss";

import Header from "./Header";
import MenuUntil from "~/Components/MenuUntil";
import { EditorComponent } from "~/Components";

function CreatePorfolio({ children }) {
  const [widthContent, setWidthContent] = useState("100%");
  const [widthMenu, setWidthMenu] = useState("28%");
  const [showScroll, setShowScroll] = useState(false);
  const hanleShowScroll = (e) => {
    if (e.currentTarget.scrollTop === 0) {
      setShowScroll(false);
    } else {
      setShowScroll(true);
    }
  };

  useEffect(() => {
    setWidthContent("100%");
  }, [widthMenu]);

  return (
    <div className={clsx(styles.wrapper)}>
      <Header />
      <div className={clsx(styles.content)}>
        <div
          className={clsx(styles.wrapper_template, {
            [styles.show_scroll]: showScroll,
          })}
          style={{
            width: widthContent,
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
      </div>
    </div>
  );
}

export default CreatePorfolio;
