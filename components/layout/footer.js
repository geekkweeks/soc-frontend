import Link from "next/link";
import styles from "../../styles/Footer.module.css";

export default function footer() {
  return (
    <footer className={styles.footer}>
      <p>Copyright &copy; Social - Tren Data Reader 2021</p>
      <p>
          <Link href="/about">About this web</Link>
      </p>
    </footer>
  );
}
