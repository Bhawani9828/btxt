/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { useReducer } from "react";
// import { RemixIconsLineSystemSearch2Line4 } from "../../icons/RemixIconsLineSystemSearch2Line4";
import "./style.css";

export const Search = ({
  stateProp,
  className,
  // icon = <RemixIconsLineSystemSearch2Line4 className="remix-icons-line" />,
  inputType = "text",
}) => {
  const [state, dispatch] = useReducer(reducer, {
    state: stateProp || "resting",
  });

  return (
    <div
      className={`search ${state.state} ${className}`}
      onMouseLeave={() => {
        dispatch("mouse_leave");
      }}
      onMouseEnter={() => {
        dispatch("mouse_enter");
      }}
    >
      <input className="div" placeholder="Search" type={inputType} />
      {/* {icon} */}
    </div>
  );
};

function reducer(state, action) {
  switch (action) {
    case "mouse_enter":
      return {
        ...state,
        state: "hover",
      };

    case "mouse_leave":
      return {
        ...state,
        state: "resting",
      };
  }

  return state;
}

Search.propTypes = {
  stateProp: PropTypes.oneOf(["resting", "hover"]),
  inputType: PropTypes.string,
};
