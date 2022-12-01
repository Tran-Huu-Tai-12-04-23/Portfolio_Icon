import clsx from "clsx";
import styles from "./Home.module.scss";

import Header from "./HeaderHome";
import ContentNewBlank from "~/Components/ContentNewBlank";

function Home() {
  return (
    <div className={clsx(styles.wrapper)}>
      <Header />
      <ContentNewBlank />
    </div>
  );
}

export default Home;
