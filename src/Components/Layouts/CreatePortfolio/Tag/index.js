import clsx from "clsx";
import styles from "./Tag.module.scss";

function Tag({ content, valueScroll }) {
  console.log("valueScroll" + valueScroll);
  return <div className={clsx(styles.wrapper)}>{content}</div>;
}

export default Tag;
