import React from "react";
import "./RemoveBtn.css";
// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const RemoveBtn = props => (
  <span className="remove-btn" {...props}>
   Remove
  </span>
);
export default RemoveBtn;
