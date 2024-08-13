import React from "react";

// Base popup template for all pop up menus

export default function Popup(props) {
  const { children, close } = props;
  return (
    <>
      <div className="newMenuPopup w-80 flex justify-b align">
        <button className="close btn icon" onClick={close}>
          <i className="fa-solid fa-x"></i>
        </button>
        {children}
      </div>
      <div className="darkbg"></div>
    </>
  );
}
