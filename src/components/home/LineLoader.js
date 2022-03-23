import react from 'react';
import styles from './lineloader.module.css';

export default function LineLoader() {
  return (
    <div className={styles.loader}>
      <div className={styles.blueLine} />
    </div>
  );
}
