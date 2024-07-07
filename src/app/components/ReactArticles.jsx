import React from "react";
import styles from "./ReactArticles.module.css";
import Image from "next/image";

const articles = [
  {
    id: 1,
    image: "/music.jpg",
    date: "JUN 20, 2024",
    title: "Breaking Coldplay NINE table wasn’t",
    author: "James Smith",
    authorImage: "/wholeheartedly.webp",
  },
  {
    id: 2,
    image: "/pexel.webp",
    date: "JUN 25, 2024",
    title: "Beyonce Surprises New Track Formation",
    author: "Jordan Smith",
    authorImage: "/wholeheartedly.webp",
  },
  {
    id: 3,
    image: "/pexel.webp",
    date: "JUN 30, 2024",
    title: "Johnny Depp pays tribute to Lemmy",
    author: "William Smith",
    authorImage: "/wholeheartedly.webp",
  },
];

const RecentArticles = () => (
  <div className={styles.articlesSection}>
    <h2 className={styles.sectionTitle}>Recent Articles</h2>
    <div className={styles.articlesGrid}>
      {articles.map((article) => (
        <div key={article.id} className={styles.articleCard}>
          <Image
            src={article.image}
            alt={article.title}
            width={300}
            height={200}
            className={styles.articleImage}
          />
          <div className={styles.articleInfo}>
            <p className={styles.articleDate}>{article.date}</p>
            <h3 className={styles.articleTitle}>{article.title}</h3>
            <div className={styles.authorInfo}>
              <Image
                src={article.authorImage}
                alt={article.author}
                width={40}
                height={40}
                className={styles.authorImage}
              />
              <p className={styles.articleAuthor}>
                Posted by: {article.author}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default RecentArticles;
