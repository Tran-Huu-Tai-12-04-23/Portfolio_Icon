import { useContext } from "react";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faPalette,
} from "@fortawesome/free-solid-svg-icons";
import { BsBorderWidth } from "react-icons/bs";
import { TbBorderRadius } from "react-icons/tb";
import { TfiClose } from "react-icons/tfi";
import { GoTextSize } from "react-icons/go";
import { BiFontFamily, BiColorFill } from "react-icons/bi";
import { AiOutlineBorder, AiOutlineFontColors } from "react-icons/ai";
import { FcFullTrash } from "react-icons/fc";
import { RxBorderStyle } from "react-icons/rx";
import { FaBold } from "react-icons/fa";
import { FiAlignCenter } from "react-icons/fi";

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
} from "~/Store/reducer/actions";
import { TipSuggest } from "~/Components";
import { ContextShowEditorComponent } from "~/Store/Context";

function EditorComponent({ style }) {
  const [state, dispatch] = useContext(ContextReducer);
  const [items, setItems] = useContext(ContextItemsIngrid);
  const [showEditorComponent, setEditorComponent] = useContext(
    ContextShowEditorComponent
  );

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

  const renderFontSize = () => {
    const numberFontSize = Array.from(Array(41).keys());
    return numberFontSize.map((size, index) => {
      return (
        <li
          key={index}
          onClick={(e) => {
            dispatch(setFontSize(`${size}px`));
            e.stopPropagation();
          }}
          data-font-size={size}
        >
          {size}
        </li>
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

  const renderOptionBorderRadius = () => {
    const numberBorderRadius = Array.from(Array(5).keys());
    return numberBorderRadius.map((item, index) => {
      var radius = `${item * 8}px`;
      if (item === 4) {
        radius = "50%";
      }
      return (
        <li
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setBorderRadius(radius));
          }}
          key={index}
          data-border-radius={radius}
          style={{
            borderRadius: radius,
            marginBottom: "4px",
            height: "30px",
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

  const removeItemsIngrid = () => {
    setItems(() => {
      return items.filter((item) => {
        return item.id !== state.id_item_slected;
      });
    });
  };

  return (
    <div
      className={clsx(styles.wrapper)}
      style={{
        display: style.display,
      }}
    >
      <div
        className={clsx(styles.wrapper_icon_close)}
        onClick={() => {
          setEditorComponent(!showEditorComponent);
        }}
      >
        <TipSuggest content='Color editor'>
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

      <div className={clsx(styles.icon, styles.icon_font_size)}>
        <GoTextSize></GoTextSize>
        <FontAwesomeIcon
          className={clsx(styles.icon__arrow_down)}
          icon={faChevronDown}
        ></FontAwesomeIcon>
        <ul className={clsx(styles.font_size_options)} id='font_size_options'>
          {renderFontSize()}
        </ul>
      </div>

      <div className={clsx(styles.icon, styles.icon_border_radius)}>
        <TbBorderRadius></TbBorderRadius>
        <FontAwesomeIcon
          className={clsx(styles.icon__arrow_down)}
          icon={faChevronDown}
        ></FontAwesomeIcon>
        <ul
          className={clsx(styles.border_raidus_options)}
          id='border_raidus_options'
        >
          {renderOptionBorderRadius()}
        </ul>
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
          dispatch(setAlignCenter(!state.align_center));
        }}
      >
        <FiAlignCenter></FiAlignCenter>
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
