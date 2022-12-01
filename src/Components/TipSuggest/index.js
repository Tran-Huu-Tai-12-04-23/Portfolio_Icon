import { Tooltip } from "react-tippy";
import "react-tippy/dist/tippy.css";

function TipSuggest({ children, content, classNames }) {
  return (
    <Tooltip
      // trigger='click'
      className={classNames}
      title={content}
      position='bottom'
    >
      {children}
    </Tooltip>
  );
}

export default TipSuggest;
