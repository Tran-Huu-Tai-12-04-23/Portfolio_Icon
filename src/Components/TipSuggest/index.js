import { Tooltip } from "react-tippy";
import "react-tippy/dist/tippy.css";

function TipSuggest({ children, content, classNames, html, trigger }) {
  return (
    <Tooltip
      html={html}
      trigger={trigger}
      className={classNames}
      title={content}
      position='bottom'
    >
      {children}
    </Tooltip>
  );
}

export default TipSuggest;
