import React from "react";

export default function Warning({ children }) {
  return (
    <div className="f6 red" style={{ height: "2rem" }}>
      {children}
    </div>
  );
}
