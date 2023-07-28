import React, { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import "./DarkMode.css";

const DarkMode = () => {
  const [darkModeActive, setDarkModeActive] = useState(false);
//On Mounting

  useEffect(() => {
  const theme = localStorage.getItem("theme");
  if (theme === null) {
    localStorage.setItem("theme", "light");
  }
  setDarkModeActive(theme === "dark");
}, []);

 
  const switchTheme = () => {
    const newTheme = darkModeActive ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    setDarkModeActive(!darkModeActive);
    document.body.classList.toggle("dark-mode-active");
  };

  return (
    <button
      className="dark-mode-toggle"
      onClick={switchTheme}
    >
      {darkModeActive ? <FaSun className="icon-sun" /> : <FaMoon className="icon-moon" />}
    </button>
  );
};

export default DarkMode;
