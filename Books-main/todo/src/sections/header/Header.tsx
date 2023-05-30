import styles from './style.module.css'

type Props = {elems: string[]}

export default function Header({elems}: Props) {
  return (
    <div className={styles.header}>
      {elems.map((elem) => <div className={styles.header__elem}>{elem}</div> )}
    </div>
  )
}
