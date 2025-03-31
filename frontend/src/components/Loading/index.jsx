import React from "react"
import styles from './index.module.css'

export const Loading = () => {
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.loader}></div>
      </div>
    </div>
  );
}