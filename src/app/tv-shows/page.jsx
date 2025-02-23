"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaPlay, FaPlus, FaInfo } from "react-icons/fa";
import styles from "./tvShows.module.css";

// Sample data structure (remove this when you have your API)
const sampleShows = {
  trending: [
    {
      _id: "1",
      title: "Stranger Things",
      genre: "Sci-Fi & Drama",
      imageUrl: "/shows/stranger-things.jpg",
    },
    // Add more sample shows
  ],
  drama: [
    {
      _id: "2",
      title: "The Crown",
      genre: "Drama",
      imageUrl: "/shows/the-crown.jpg",
    },
    // Add more sample shows
  ],
  comedy: [],
  documentary: [],
};

export default function TvShows() {
  const [shows, setShows] = useState({
    trending: [],
    drama: [],
    comedy: [],
    documentary: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchShows();
  }, []);

  const fetchShows = async () => {
    try {
      // For now, use sample data until API is ready
      setShows(sampleShows);
      setIsLoading(false);

      // When API is ready, uncomment this:
      /*
      const response = await fetch('http://localhost:5000/api/shows');
      const data = await response.json();
      setShows(data);
      setIsLoading(false);
      */
    } catch (error) {
      console.error("Error fetching shows:", error);
      setError("Failed to load shows");
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>TV Shows</h1>
          <p>Discover new series and binge-worthy shows</p>
        </div>
      </section>

      {shows.trending.length > 0 && (
        <section className={styles.showsSection}>
          <h2>Trending Now</h2>
          <div className={styles.showsGrid}>
            {shows.trending.map((show) => (
              <div key={show._id} className={styles.showCard}>
                <div className={styles.imageContainer}>
                  <div className={styles.imagePlaceholder}>
                    {/* Fallback for missing images */}
                    <Image
                      src={show.imageUrl || "/placeholder-show.jpg"}
                      alt={show.title}
                      fill
                      className={styles.showImage}
                      onError={(e) => {
                        e.target.src = "/placeholder-show.jpg";
                      }}
                    />
                  </div>
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
                <h3>{show.title}</h3>
                <p>{show.genre}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {shows.drama.length > 0 && (
        <section className={styles.showsSection}>
          <h2>Popular Drama Series</h2>
          <div className={styles.showsGrid}>
            {shows.drama.map((show) => (
              <div key={show._id} className={styles.showCard}>
                <div className={styles.imageContainer}>
                  <div className={styles.imagePlaceholder}>
                    <Image
                      src={show.imageUrl || "/placeholder-show.jpg"}
                      alt={show.title}
                      fill
                      className={styles.showImage}
                      onError={(e) => {
                        e.target.src = "/placeholder-show.jpg";
                      }}
                    />
                  </div>
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
                <h3>{show.title}</h3>
                <p>{show.genre}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Only render sections if they have content */}
      {shows.comedy.length > 0 && (
        <section className={styles.showsSection}>
          <h2>Comedy Hits</h2>
          <div className={styles.showsGrid}>
            {/* Similar structure for comedy shows */}
          </div>
        </section>
      )}

      {shows.documentary.length > 0 && (
        <section className={styles.showsSection}>
          <h2>Must-Watch Documentaries</h2>
          <div className={styles.showsGrid}>
            {/* Similar structure for documentaries */}
          </div>
        </section>
      )}
    </main>
  );
}
