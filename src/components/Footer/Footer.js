import React from "react";

const Footer = () => {
  return (
    <footer className="py-5 bg-dark">
      <div className="container">
        <p className="m-0 text-center text-white">
          Copyright © Eslam Mohamed {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
