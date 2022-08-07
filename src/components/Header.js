import React from "react";
import Navbar from "./Navbar";
const Header = (props) => {
  const { title } = props;
  const { userDetails, categories, image } = props;
  let backgroundStyle;

  if (image) {
    backgroundStyle =
      `linear-gradient(rgba(0, 0, 0, 0.78), rgba(0, 0, 0, 0.78)), url(${image})`;
    
  } else {
    backgroundStyle = `linear-gradient(rgba(0, 0, 0, 0.78), rgba(0, 0, 0, 0.78)), url(https://www.propmodo.com/wp-content/uploads/2020/07/parking-lot.jpg)`
  }
  return (
    <div
      className="header"
      style={{
        'background': backgroundStyle,
      }}
    >
      <Navbar userDetails={userDetails} categories={categories} />
      <div className="header-message">{title}</div>
      <div className = "header-submessage">An App to Make Parking Fun</div>
    </div>
  );
};

export default Header;
