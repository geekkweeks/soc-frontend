import {FaExclamationTriangle} from 'react-icons/fa'
import Layout from "../components/layout/layout";
import Link from "next/link";
import styles from "../styles/404.module.css";

export default function NotFoundPage() {
  return (
    <Layout title="Page Not Found">
      <div className={styles.error}>
          <FaExclamationTriangle /> 404
          <h4>Sorry, there is nothing here.</h4>
          <Link href='/'>Go Home Page</Link>
      </div>
    </Layout>
  );
}
