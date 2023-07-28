import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import DarkMode from "../DarkMode/DarkMode";

const NavBar = () => {
  const [darkMode, setDarkMode] = useState(false);

  const handleDarkModeToggle = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <Navbar
      className={`custom-navbar ${darkMode ? "dark" : ""}`}
      variant={darkMode ? "dark" : "light"} // Set the variant to "dark" in dark mode
      expand="sm"
    >
      <div className="container">
        <Link to="/" className="navbar-brand">
          <i className="fa fa-mobile text-warning" />
          <span className="text-warning">Contact Manager</span>
        </Link>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
            <NavDropdown title="More" id="basic-nav-dropdown">
              <NavDropdown.Item href="https://github.com/SaurabhKaperwan">
                Github Id
              </NavDropdown.Item>
              <NavDropdown.Item href="https://github.com/SaurabhKaperwan/contact-manager">
                Source Code
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <DarkMode onClick={handleDarkModeToggle} /> 
      </div>
    </Navbar>
  );
};

export default NavBar;