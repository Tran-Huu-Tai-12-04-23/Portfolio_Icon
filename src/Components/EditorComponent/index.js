import { useContext, useState, useEffect } from "react";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { BsBorderWidth } from "react-icons/bs";
import { TbBorderRadius } from "react-icons/tb";
import { TfiClose } from "react-icons/tfi";
import { GoTextSize } from "react-icons/go";
import { BiFontFamily, BiColorFill } from "react-icons/bi";
import {
  AiOutlineBorder,
  AiOutlineFontColors,
  AiOutlineMinus,
} from "react-icons/ai";
import { FcFullTrash } from "react-icons/fc";
import { RxBorderStyle, RxLineHeight } from "react-icons/rx";
import { FaBold } from "react-icons/fa";
import { FiAlignCenter } from "react-icons/fi";
import { TbLetterCaseUpper } from "react-icons/tb";
import { IoIosAdd } from "react-icons/io";

import styles from "./EditorComponent.module.scss";
import { colors, fontFamilys, borderStyles } from "./datas";
import { ContextReducer, ContextItemsIngrid } from "~/Store/Context";
import {
  setBackgroundColor,
  setColor,
  setFontFamily,
  setFontSize,
  setBorderRadius,
  setBorderStyle,
  setBorderColor,
  setFontWeight,
  setAlignCenter,
  setBorderSize,
  setUppercase,
  setLineHeight,
} from "~/Store/reducer/actions";
import { TipSuggest } from "~/Components";
import { ContextShowEditorComponent } from "~/Store/Context";

function EditorComponent({ style }) {
  const [state, dispatch] = useContext(ContextReducer);
  const [items, setItems] = useContext(ContextItemsIngrid);
  const [showEditorComponent, setEditorComponent] = useContext(
    ContextShowEditorComponent
  );

  const [valueBorderRadius, setValueBorderRadius] = useState(
    state.border_radius
      ? parseInt(
          state.border_radius.substring(0, state.border_radius.length - 2)
        )
      : 0
  );
  const [fontSize, setFontSizeItem] = useState(
    state.font_size
      ? parseInt(state.font_size.substring(0, state.font_size.length - 2))
      : 0
  );
  const [lineHeight, setLineHeightItem] = useState(
    state.line_height
      ? parseInt(state.line_height.substring(0, state.line_height.length - 2))
      : 0
  );

  useEffect(() => {
    if (state.border_radius) {
      setValueBorderRadius(
        parseInt(
          state.border_radius.substring(0, state.border_radius.length - 2)
        )
      );
    }
    if (state.font_size) {
      setFontSizeItem(
        parseInt(state.font_size.substring(0, state.font_size.length - 2))
      );
    }
    if (state.line_height) {
      setLineHeightItem(
        parseInt(state.line_height.substring(0, state.line_height.length - 2))
      );
    }
  }, [state]);
  //set style component
  useEffect(() => {
    dispatch(setBorderRadius(`${valueBorderRadius}px`));
  }, [valueBorderRadius]);
  useEffect(() => {
    dispatch(setFontSize(`${fontSize}px`));
  }, [fontSize]);
  useEffect(() => {
    dispatch(setLineHeight(`${lineHeight}px`));
  }, [lineHeight]);

  const renderOptionColors = () => {
    return colors.map((color, index) => {
      return (
        <li
          key={index}
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setColor(color));
          }}
          data-color={color}
          style={{
            backgroundColor: color,
          }}
        ></li>
      );
    });
  };

  const renderFontFamily = () => {
    return fontFamilys.map((fontFamily, index) => {
      return (
        <li
          key={index}
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setFontFamily(fontFamily));
          }}
          data-font-family={fontFamily + ", sans-serif"}
        >
          {fontFamily}
        </li>
      );
    });
  };

  const renderOptionBorderColors = () => {
    return colors.map((color, index) => {
      return (
        <li
          key={index}
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setBorderColor(color));
          }}
          data-border-color={color}
          style={{
            backgroundColor: color,
          }}
        ></li>
      );
    });
  };

  const renderOptionBackGroundColor = () => {
    return colors.map((color, index) => {
      return (
        <li
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setBackgroundColor(color));
          }}
          key={index}
          data-background-color={color}
          style={{
            backgroundColor: color,
          }}
        ></li>
      );
    });
  };

  const renderOptionBorderSize = () => {
    const numberBorderSize = Array.from(Array(6).keys());
    return numberBorderSize.map((size, index) => {
      return (
        <div
          key={index}
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setBorderSize(`${size}px`));
          }}
          style={{
            border: "1px solid #6699FF",
            borderRadius: "12px",
            marginBottom: "4px",
          }}
        >
          <li
            data-border-size={size}
            style={{
              height: `${size}px`,
            }}
          ></li>
        </div>
      );
    });
  };

  const renderBorderStyle = () => {
    return borderStyles.map((style, index) => {
      return (
        <li
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setBorderStyle(style));
          }}
          key={index}
          data-border-style={style}
          style={{
            border: `2px ${style} #000`,
          }}
        ></li>
      );
    });
  };

  const removeItemsIngrid = (e) => {
    e.stopPropagation();
    //remove dom real
    document.getElementById(state.id_item_selected).remove();
    // remove dom virtual
    setItems(() => {
      return items.filter((item) => {
        return item.id !== state.id_item_selected;
      });
    });
  };
  return (
    <div
      className={clsx(styles.wrapper)}
      style={{
        ...style,
        // display: "flex",
      }}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div
        className={clsx(styles.wrapper_icon_close)}
        onClick={() => {
          setEditorComponent(!showEditorComponent);
        }}
      >
        <TipSuggest content='Close editor'>
          <TfiClose className={clsx(styles.icon_close)}></TfiClose>
        </TipSuggest>
      </div>

      <div className={clsx(styles.icon, styles.icon_background_color)}>
        <BiColorFill></BiColorFill>
        <FontAwesomeIcon
          className={clsx(styles.icon__arrow_down)}
          icon={faChevronDown}
        ></FontAwesomeIcon>
        <ul
          className={clsx(styles.background_color_options)}
          id='background_color_options'
        >
          {renderOptionBackGroundColor()}
        </ul>
      </div>
      <div className={clsx(styles.icon, styles.icon_color)}>
        <AiOutlineFontColors></AiOutlineFontColors>
        <FontAwesomeIcon
          className={clsx(styles.icon__arrow_down)}
          icon={faChevronDown}
        ></FontAwesomeIcon>
        <ul className={clsx(styles.color_options)} id='color_options'>
          {renderOptionColors()}
        </ul>
      </div>
      <div className={clsx(styles.icon, styles.icon_border_color)}>
        <AiOutlineBorder></AiOutlineBorder>
        <FontAwesomeIcon
          className={clsx(styles.icon__arrow_down)}
          icon={faChevronDown}
        ></FontAwesomeIcon>
        <ul
          className={clsx(styles.border_color_options)}
          id='border_color_options'
        >
          {renderOptionBorderColors()}
        </ul>
      </div>
      <div className={clsx(styles.icon, styles.font_size_options)}>
        <GoTextSize
          style={{
            border: "none",
          }}
        ></GoTextSize>
        <AiOutlineMinus
          onClick={(e) => {
            setFontSizeItem((prev) => {
              return parseInt(prev) - 1;
            });
          }}
        />
        <input
          type='number'
          style={{
            color: "#000",
          }}
          onChange={(e) => {
            setFontSizeItem(e.target.value);
          }}
          value={fontSize}
        ></input>
        <IoIosAdd
          onClick={(e) => {
            setFontSizeItem((prev) => {
              return parseInt(prev) + 1;
            });
          }}
        />
      </div>
      <div className={clsx(styles.icon, styles.line_height_options)}>
        <RxLineHeight
          style={{
            border: "none",
          }}
        ></RxLineHeight>
        <AiOutlineMinus
          onClick={(e) => {
            setLineHeightItem((prev) => {
              return parseInt(prev) - 1;
            });
          }}
        />
        <input
          type='number'
          style={{
            color: "#000",
          }}
          onChange={(e) => {
            setLineHeightItem(e.target.value);
          }}
          value={lineHeight}
        ></input>
        <IoIosAdd
          onClick={(e) => {
            setLineHeightItem((prev) => {
              return parseInt(prev) + 1;
            });
          }}
        />
      </div>

      <div className={clsx(styles.icon, styles.border_radius_options)}>
        <TbBorderRadius
          style={{
            border: "none",
          }}
        ></TbBorderRadius>
        <AiOutlineMinus
          onClick={(e) => {
            setValueBorderRadius((prev) => {
              return parseInt(prev) - 1;
            });
          }}
        />
        <input
          type='number'
          style={{
            color: "#000",
          }}
          onChange={(e) => {
            setValueBorderRadius(e.target.value);
          }}
          value={valueBorderRadius}
        ></input>
        <IoIosAdd
          onClick={(e) => {
            setValueBorderRadius((prev) => {
              return parseInt(prev) + 1;
            });
          }}
        />
      </div>
      <div className={clsx(styles.icon, styles.icon_border_size)}>
        <BsBorderWidth></BsBorderWidth>
        <FontAwesomeIcon
          className={clsx(styles.icon__arrow_down)}
          icon={faChevronDown}
        ></FontAwesomeIcon>
        <ul
          className={clsx(styles.border_size_options)}
          id='border_size_options'
        >
          {renderOptionBorderSize()}
        </ul>
      </div>
      <div className={clsx(styles.icon, styles.icon_border_style)}>
        <RxBorderStyle></RxBorderStyle>
        <FontAwesomeIcon
          className={clsx(styles.icon__arrow_down)}
          icon={faChevronDown}
        ></FontAwesomeIcon>
        <ul
          className={clsx(styles.border_style_options)}
          id='border_style_options'
        >
          {renderBorderStyle()}
        </ul>
      </div>
      <div
        className={clsx(styles.icon, styles.icon_font_weight)}
        onClick={(e) => {
          e.stopPropagation();
          dispatch(setFontWeight(!state.font_weight));
        }}
      >
        <FaBold></FaBold>
      </div>
      <div
        className={clsx(styles.icon, styles.icon_align_center)}
        style={{
          marginRight: 12,
        }}
        onClick={(e) => {
          e.stopPropagation();
          dispatch(setAlignCenter(!state.align_center));
        }}
      >
        <FiAlignCenter></FiAlignCenter>
      </div>
      <div
        className={clsx(styles.icon, styles.icon_upper_letter)}
        style={{
          marginRight: 12,
        }}
        onClick={(e) => {
          e.stopPropagation();
          dispatch(setUppercase(!state.upper_case_letter));
        }}
      >
        <TbLetterCaseUpper></TbLetterCaseUpper>
      </div>

      <div className={clsx(styles.icon, styles.icon_font_style)}>
        <BiFontFamily></BiFontFamily>
        <FontAwesomeIcon
          className={clsx(styles.icon__arrow_down)}
          icon={faChevronDown}
        ></FontAwesomeIcon>
        <ul className={clsx(styles.font_style_options)} id='font_style_options'>
          {renderFontFamily()}
        </ul>
      </div>
      <FcFullTrash
        onClick={removeItemsIngrid}
        className={clsx(styles.icon_trash)}
      ></FcFullTrash>
    </div>
  );
}

export default EditorComponent;
