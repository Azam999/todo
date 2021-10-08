import React from "react";
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            Todo
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Header;
