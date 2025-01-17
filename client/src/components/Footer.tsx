import React from "react";

const Footer = () => {
  return (
    <div className="bg-primary p-3 d-flex justify-content-center gap-3">
      <a
        href="https://github.com/Bbybee1747"
        onClick={() => {
          console.log("Navigating to GitHub");
        }}
        className="bi bi-github text-white fs-4"
        target="_blank" // Opens in a new tab
        rel="noopener noreferrer" // Security best practice
        role="button"
      ></a>
    </div>
  );
};

export default Footer;
