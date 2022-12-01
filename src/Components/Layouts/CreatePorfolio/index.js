import clsx from "clsx";
import styles from "./CreatePorfolio.module.scss";

import Header from "./Header";
import MenuUntil from "~/Components/MenuUntil";

function CreatePorfolio({ children }) {
  return (
    <div className={clsx(styles.wrapper)}>
      <Header />
      <div className={clsx(styles.content)}>
        <div className={clsx(styles.wrapper_template)}>
          <div className={clsx(styles.wrapper_template_content)}>
            {children}
          </div>
        </div>
        <MenuUntil />
      </div>
    </div>
  );
}

export default CreatePorfolio;
