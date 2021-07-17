import styles from "../../styles/Loader.module.css";

export default function Loader() {
  return (
    <div className={styles.body}>
      <h1 id={styles.title}>Cooking in progress...</h1>
      <div id={styles.cooking}>
        <div className={styles.bubble}></div>
        <div className={styles.bubble}></div>
        <div className={styles.bubble}></div>
        <div className={styles.bubble}></div>
        <div className={styles.bubble}></div>
        <div id={styles.area}>
          <div id={styles.sides}>
            <div id={styles.pan}></div>
            <div id={styles.handle}></div>
          </div>
          <div id={styles.pancake}>
            <div id={styles.pastry}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
