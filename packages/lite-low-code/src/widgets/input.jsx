import React from "react";

function Input({ label }) {
  return (
    <div>
      <label>{label}</label>
      <input className="u-full-width" />
    </div>
  );
}

export default Input;
