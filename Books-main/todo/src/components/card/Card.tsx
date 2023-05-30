import styles from './style.module.css';

export default function Card() {
  return (
    <div style={{ width: '20px' }}>
      <div className={styles.card}>
        <div className={styles.circle}>
          <img
            src="https://d1yei2z3i6k35z.cloudfront.net/505757/63fa5902f1ab4_216x135.png"
            className={styles.logo}
            alt="Img"
          />
        </div>
        <div className={styles.content}>
          <h2>Connaissance Illimitée</h2>
          <p>Libère le superpouvoir de ton cerveau et développe une connaissance illimitée</p>
          <a href="#">JE VEUX MON EXEMPLAIRE</a>
        </div>
        <img
          src="https://d1yei2z3i6k35z.cloudfront.net/505757/63fa590e96084_5x8inch-2.png"
          className={styles.product_img}
          alt="Ing"
        />
      </div>
    </div>
  );
}
