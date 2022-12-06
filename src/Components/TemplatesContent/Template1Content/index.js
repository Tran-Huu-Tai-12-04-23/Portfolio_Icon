import clsx from "clsx";

import styles from "./Template1Content.module.scss";
import { Grid, Item } from "~/Components";

function Template1Content() {
  return (
    <div className={clsx(styles.wrapper)}>
      <Grid id='grid_1'>
        {/* <Item
          id='input_grid_0'
          inGrid={true}
          stylesItem={{
            backgroundColor: "green",
            top: 200,
            left: 100,
            width: "100px",
            height: "100px",
          }}
        ></Item> */}
      </Grid>
    </div>
  );
}

export default Template1Content;
