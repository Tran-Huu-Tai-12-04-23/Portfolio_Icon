import { AiOutlineClose } from "react-icons/ai";
import clsx from "clsx";
import styles from "./Preview.module.scss";
import { ComponentDefaults } from "~/Routes/ComponentDefaults";
import Grid from "~/Components/Grid";

function Preview({
  items,
  heightTemplate = 1000,
  width = "80%",
  setShowPreview,
  children,
}) {
  //render
  return (
    <div className={clsx(styles.wrapper)}>
      <AiOutlineClose
        className={clsx(styles.icon_close)}
        onClick={(e) => {
          setShowPreview(false);
        }}
      ></AiOutlineClose>
      <div
        className={clsx(styles.wrapper_template)}
        style={{
          width: width,
          height: heightTemplate,
        }}
      ></div>
    </div>
  );
}
export default Preview;
