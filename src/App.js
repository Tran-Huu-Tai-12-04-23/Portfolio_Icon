import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import clsx from "clsx";

import { publicRoutes } from "./Routes";
import styles from "./App.module.scss";

function App() {
  return (
    <div className={clsx(styles.wrapper)}>
      <Router>
        {publicRoutes.map((page) => {
          return <Link to={page.path}>{page.layout}</Link>;
        })}
      </Router>
    </div>
  );
}

export default App;
