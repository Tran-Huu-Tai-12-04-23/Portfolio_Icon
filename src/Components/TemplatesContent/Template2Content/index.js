import clsx from "clsx";
import uuid from "react-uuid";
import { useContext, useEffect } from "react";

import styles from "./Template2Content.module.scss";
import { Grid, Item } from "~/Components";
import { ContextItemsIngrid } from "~/Store/Context";

function Template2Content() {
  const [items, setItems] = useContext(ContextItemsIngrid);
  useEffect(() => {
    setItems([
      {
        type: "input",
        left: 100,
        top: 100,
        width: 200,
        height: 50,
        id: uuid(),
        inGrid: true,
      },
      {
        type: "input",
        left: 100,
        top: 50,
        width: 200,
        height: 50,
        id: uuid(),
        inGrid: true,
      },
      {
        type: "input",
        left: 300,
        top: 300,
        width: 400,
        height: 50,
        id: uuid(),
        inGrid: true,
      },
    ]);
  }, []);
  return (
    <div className={clsx(styles.wrapper)}>
      <Grid id='grid_1'>
        {items &&
          items.map((item, index) => {
            return (
              <Item
                key={item.id}
                id={item.id}
                inGrid={true}
                type={item.type}
                stylesItem={{
                  top: item.top,
                  left: item.left,
                  width: item.width,
                  height: item.height,
                }}
              ></Item>
            );
          })}
      </Grid>
    </div>
  );
}

export default Template2Content;
