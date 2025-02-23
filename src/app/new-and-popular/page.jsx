"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaPlay, FaPlus, FaInfo, FaFire, FaStar } from "react-icons/fa";
import styles from "./newAndPopular.module.css";

export default function NewAndPopular() {
  const [content, setContent] = useState({
    newReleases: [],
    trending: [],
    topRated: [],
    comingSoon: [],
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/trending");
      const data = await response.json();
      setContent(data);
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  };

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>New & Popular</h1>
          <p>Stay up to date with the latest releases and trending content</p>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className={styles.sectionHeader}>
          <FaFire className={styles.sectionIcon} />
          <h2>New Releases</h2>
        </div>
        <div className={styles.contentGrid}>
          {content.newReleases.map((item) => (
            <div key={item._id} className={styles.contentCard}>
              {/* Similar card structure as above */}
            </div>
          ))}
        </div>
      </section>

      {/* Additional sections for trending, top rated, etc. */}
    </main>
  );
}
