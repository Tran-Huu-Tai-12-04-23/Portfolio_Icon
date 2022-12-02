import { useRef, useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./CreatePorfolio.module.scss";

import Header from "./Header";
import MenuUntil from "~/Components/MenuUntil";

function CreatePorfolio({ children }) {
  const ref = useRef(null);
  const [widthContent, setWidthContent] = useState("100%");
  const [widthMenu, setWidthMenu] = useState("28%");
  useEffect(() => {
    setWidthContent("100%");
  }, [widthMenu]);

  return (
    <div className={clsx(styles.wrapper)}>
      <Header />
      <div className={clsx(styles.content)}>
        <div
          className={clsx(styles.wrapper_template)}
          style={{
            width: widthContent,
          }}
        >
          <div className={clsx(styles.wrapper_template_content)}>
            {children}
          </div>
        </div>
        <MenuUntil state={setWidthMenu} valueState={widthMenu} />
      </div>
    </div>
  );
}

export default CreatePorfolio;
