"use client";

import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            My <span className={styles.gradientText0}>Contracts</span>
          </h1>

          <p className={styles.description}>
            Select a contract to interact with.
          </p>
        </div>
      </div>
    </main>
  );
}
