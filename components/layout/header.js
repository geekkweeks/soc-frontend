import Link from "next/link";
import { FaHashtag } from "react-icons/fa";
import styles from "../../styles/Header.module.css";

export default function header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
           <a><FaHashtag /> Social</a>
        </Link>
      </div>

      <nav>
        <ul>
          <li>
            <Link href="/clients"> 
              Clients
            </Link>
            <Link href="/user"> 
              User
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
