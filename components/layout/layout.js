import React from "react";
import Head from "next/head";
import Header from "./header";
import Footer from "./footer";
import styles from "../../styles/Layout.module.css";

export default function Layout({ title, keywords, description, children }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>

      <Header />
      <div className={styles.container}>{children}</div>

      <Footer />
    </div>
  );
}

Layout.defaultProps = {
  title: "Social",
  description: "Social",
  keywords: "social, tren, data, reader",
};
