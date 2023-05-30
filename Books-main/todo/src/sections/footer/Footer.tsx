import styles from './style.module.css';

type Props = { elems: string[] };

export default function Footer({ elems }: Props) {
  return (
    <div className={styles.footer}>
      {elems.map((elem) => (
        <div className={styles.footer__elem}>{elem}</div>
      ))}
    </div>
  );
}
