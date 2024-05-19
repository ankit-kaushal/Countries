import React, { useState, useEffect } from "react";
import { useTheme } from "../../common/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

import styles from "./styles.module.css";

const Navigation: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [icon, setIcon] = useState(theme === "light" ? faMoon : faSun);
  const [rotateIcon, setRotateIcon] = useState(false);

  useEffect(() => {
    if (rotateIcon) {
      const timeout = setTimeout(() => {
        setIcon(theme === "light" ? faMoon : faSun);
        setRotateIcon(false);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [rotateIcon, theme]);

  useEffect(() => {
    setRotateIcon(true);
  }, [theme]);

  return (
    <div className={styles.navigation_container}>
      <div className={styles.navigation_header}>Where in the world?</div>
      <button onClick={toggleTheme} className={styles.toggle_button}>
        <FontAwesomeIcon
          icon={icon}
          className={rotateIcon ? styles.rotate : ""}
        />
        {theme === "light" ? "Dark" : "Light"} Mode
      </button>
    </div>
  );
};

export default Navigation;
