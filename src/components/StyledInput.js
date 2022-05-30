import React from "react";
import Warning from "./Warning";

export default function StyledInput({
  label,
  value,
  handleChange,
  isValid,
  warningText,
  id,
}) {
  return (
    <>
      <label htmlFor={id} className="f6 b db mb2" required>
        {label}
      </label>
      <input
        id={id}
        className={`input-reset ba b--black-20 pa2 db w-100 ${
          isValid !== false && "mb4"
        }`}
        type="text"
        value={value}
        onChange={(e) => handleChange(e)}
      />
      {isValid === false && <Warning>{warningText}</Warning>}
    </>
  );
}
