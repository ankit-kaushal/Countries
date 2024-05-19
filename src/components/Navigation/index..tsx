import { useTheme } from "../../common/ThemeContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";

import styles from "./styles.module.css";

const Navigation: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className={styles.navigation_container}>
      <div className={styles.navigation_header}>Where in the world?</div>
      <button onClick={toggleTheme} className={styles.toggle_button}>
        <FontAwesomeIcon icon={faMoon} />
        {theme === "light" ? "Dark" : "Light"} Mode
      </button>
    </div>
  );
};

export default Navigation;
