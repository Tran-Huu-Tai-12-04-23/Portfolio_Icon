import clsx from "clsx";
import styles from "./Overlay.module.scss";

function Overlay() {
  const id = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return (
    <>
      {id.map((id) => {
        return <span key={id} className={clsx(styles.overlay)}></span>;
      })}
    </>
  );
}

export default Overlay;
