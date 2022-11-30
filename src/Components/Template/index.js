import clsx from "clsx";
import styles from "./Template.module.scss";

function Template({ icon, background }) {
  return <div className={clsx(styles.wrapper)}> {icon}</div>;
}

export default Template;
