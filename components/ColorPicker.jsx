"use strict";

import React, { useState } from "react";
import reactCSS from "reactcss";
import { SketchPicker,SwatchesPicker } from "react-color";
//ACTIONS y librerias de REDUX
import { useDispatch } from "react-redux";
import { agregarColorAction } from "../redux/categoriasDuck";

const ColorPicker = (props) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    displayColorPicker: false,
    color: '#F5A623'
  });

  const handleClick = () => {
    setState({ ...state, displayColorPicker: !state.displayColorPicker });
  };

  const handleClose = () => {
    setState({ ...state, displayColorPicker: false });
  };

  const handleChange = (color) => {
    props.cambiarColor(color.hex);
    dispatch(agregarColorAction(color.hex));
    setState({ ...state, color: color.hex });
  };

  const styles = reactCSS({
    default: {
      color: {
        width: props.width || "36px",
        height: props.height || "36px",
        borderRadius: "2px",
        background: props.color || `rgba(${state.color.r}, ${state.color.g}, ${state.color.b}, ${state.color.a})`,
      },
      swatch: {
        padding: "5px",
        background: "#fff",
        borderRadius: "1px",
        boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
        display: "inline-block",
        cursor: "pointer",
      },
      popover: {
        position: props.position || "absolute",
        zIndex: "2",
      },
      cover: {
        position: "fixed",
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
      },
    },
  });

  return (
    <div>
      <div style={styles.swatch} onClick={handleClick}>
        <div style={styles.color} />
      </div>
      {state.displayColorPicker ? (
        <div style={styles.popover}>
          <div style={styles.cover} onClick={handleClose} />
          <SwatchesPicker color={state.color} onChange={handleChange}  />
        </div>
      ) : null}
    </div>
  );
};

export default ColorPicker;
