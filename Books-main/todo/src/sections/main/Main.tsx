import Card from '../../components/card/Card';
import AddBookForm from '../../forms/AddBookForm';
import BookList from '../book-list/BookList';
import styles from './style.module.css';

export default function Main() {
  return (
    <div className={styles.main}>
      <div className={styles.right_side}>
        <Card />
      </div>
      <div className={styles.left_side}>
        <h1>Books Block</h1>
        <AddBookForm />
      </div>
    </div>
  );
}
