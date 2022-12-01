import clsx from "clsx";

import styles from "./Template1Content.module.scss";

import { Input } from "~/Components/Content";

function Template1Content() {
  return (
    <div className={clsx(styles.wrapper)}>
      <Input />
    </div>
  );
}

export default Template1Content;
