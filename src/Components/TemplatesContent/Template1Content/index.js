import clsx from "clsx";

import styles from "./Template1Content.module.scss";
import { Grid } from "~/Components";

function Template1Content() {
  return (
    <div className={clsx(styles.wrapper)}>
      <Grid id='grid_1'></Grid>
    </div>
  );
}

export default Template1Content;
