"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaPlay, FaPlus, FaInfo } from "react-icons/fa";
import styles from "./movies.module.css";

export default function Movies() {
  const [movies, setMovies] = useState({
    featured: [],
    action: [],
    thriller: [],
    comedy: [],
  });

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/movies");
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Movies</h1>
          <p>Watch the latest blockbusters and classics</p>
        </div>
      </section>

      <section className={styles.moviesSection}>
        <h2>Featured Movies</h2>
        <div className={styles.featuredGrid}>
          {movies.featured.map((movie) => (
            <div key={movie._id} className={styles.movieCard}>
              <div className={styles.imageContainer}>
                <Image
                  src={movie.imageUrl}
                  alt={movie.title}
                  width={300}
                  height={450}
                  className={styles.movieImage}
                />
                <div className={styles.overlay}>
                  <button className={styles.playBtn}>
                    <FaPlay /> Play
                  </button>
                  <button className={styles.addBtn}>
                    <FaPlus />
                  </button>
                  <button className={styles.infoBtn}>
                    <FaInfo />
                  </button>
                </div>
              </div>
              <h3>{movie.title}</h3>
              <p>{movie.genre}</p>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
