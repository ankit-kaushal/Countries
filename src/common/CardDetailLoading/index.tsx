import React from "react";
import styles from "./styles.module.css";

const CardDetailLoading = () => {
  return (
    <div className={styles.card_detail_loading_container}>
      <div className={styles.flag_placeholder}></div>
      <div className={styles.info_placeholder}>
        <div>
          <div className={styles.line}></div>
          <div className={`${styles.line} ${styles.short}`}></div>
          <div className={styles.line}></div>
          <div className={`${styles.line} ${styles.short}`}></div>
          <div className={styles.line}></div>
        </div>
        <div>
          <div className={`${styles.line} ${styles.short}`}></div>
          <div className={styles.line}></div>
        </div>
      </div>
    </div>
  );
};

export default CardDetailLoading;
