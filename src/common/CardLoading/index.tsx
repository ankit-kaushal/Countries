import React from "react";
import styles from "./styles.module.css";

const CardLoading: React.FC = () => {
  return (
    <div className={styles.card_container}>
      <div
        className={`${styles.country_flag} ${styles.loading_placeholder}`}
      ></div>
      <div className={styles.card_info_container}>
        <div
          className={styles.loading_placeholder_text}
          style={{ width: "70%" }}
        ></div>
        <div
          className={styles.loading_placeholder_text}
          style={{ width: "50%" }}
        ></div>
        <div
          className={styles.loading_placeholder_text}
          style={{ width: "60%" }}
        ></div>
        <div
          className={styles.loading_placeholder_text}
          style={{ width: "40%" }}
        ></div>
      </div>
    </div>
  );
};

export default CardLoading;
