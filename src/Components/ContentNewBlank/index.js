import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faHourglass1 } from "@fortawesome/free-solid-svg-icons";
import { Fragment } from "react";

import styles from "./ContentNewBlank.module.scss";
import { Template } from "~/Components";

function ContentNewBlank() {
  return (
    <Fragment>
      <h1 className={clsx(styles.heading)}>Choose Template</h1>
      <div className={clsx(styles.wrapper)}>
        <Template icon={<FontAwesomeIcon icon={faAdd}></FontAwesomeIcon>} />
        <Template />
        <Template />
        <Template />
        <Template />
      </div>
    </Fragment>
  );
}

export default ContentNewBlank;
