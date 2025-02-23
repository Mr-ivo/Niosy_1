"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaPlay, FaMinus, FaInfo } from "react-icons/fa";
import styles from "./myList.module.css";

export default function MyList() {
  const [myList, setMyList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMyList();
  }, []);

  const fetchMyList = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/my-list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setMyList(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching my list:", error);
      setIsLoading(false);
    }
  };

  const removeFromList = async (itemId) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:5000/api/my-list/${itemId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMyList(myList.filter((item) => item._id !== itemId));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>My List</h1>
          <p>Your personal collection of favorite content</p>
        </div>
      </section>

      <section className={styles.listSection}>
        {myList.length === 0 ? (
          <div className={styles.emptyList}>
            <h2>Your list is empty</h2>
            <p>Add shows and movies to your list to watch them later</p>
          </div>
        ) : (
          <div className={styles.listGrid}>
            {myList.map((item) => (
              <div key={item._id} className={styles.listCard}>
                <div className={styles.imageContainer}>
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    width={300}
                    height={450}
                    className={styles.itemImage}
                  />
                  <div className={styles.overlay}>
                    <button className={styles.playBtn}>
                      <FaPlay /> Play
                    </button>
                    <button
                      className={styles.removeBtn}
                      onClick={() => removeFromList(item._id)}
                    >
                      <FaMinus />
                    </button>
                    <button className={styles.infoBtn}>
                      <FaInfo />
                    </button>
                  </div>
                </div>
                <h3>{item.title}</h3>
                <p>
                  {item.type} • {item.genre}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
