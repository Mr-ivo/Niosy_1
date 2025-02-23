"use client";
import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import {
  FaTicketAlt,
  FaMusic,
  FaStar,
  FaPlay,
  FaInfoCircle,
  FaPause,
  FaHeart,
  FaPlus,
} from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RecentArticles from "./components/ReactArticles";
import ContactGallery from "./components/contactGallery";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { api } from "@/services/api";

const Page = () => {
  const currentYear = new Date().getFullYear();

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const pricingPlans = [
    {
      title: "Silver Plan",
      price: "$50",
      icon: FaTicketAlt,
      color: "#6366f1",
      features: [
        "Basic Access",
        "HD Streaming",
        "2 Devices",
        "Limited Content",
      ],
    },
    {
      title: "Gold Plan",
      price: "$80",
      icon: FaMusic,
      color: "#8b5cf6",
      features: ["Full Access", "4K Streaming", "4 Devices", "All Content"],
    },
    {
      title: "VIP Plan",
      price: "$120",
      icon: FaStar,
      color: "#6366f1",
      features: [
        "Premium Access",
        "8K Streaming",
        "6 Devices",
        "Exclusive Content",
      ],
    },
  ];

  const heroSlides = [
    {
      image: "/Rema.jpg",
      title: "Experience the Magic of",
      highlight: "Music",
      subtitle:
        "Discover, stream, and share the best soundtracks and songs for your events.",
    },
    {
      image: "/burna-boy.jpg",
      title: "Listen to Your Favorite",
      highlight: "Artists",
      subtitle: "Stream millions of songs from top artists worldwide.",
    },
    {
      image: "/Davido.jpg",
      title: "Discover New",
      highlight: "Releases",
      subtitle: "Be the first to hear the latest tracks and albums.",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [songs, setSongs] = useState([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    fetchSongs();
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const fetchSongs = async () => {
    try {
      const songsList = await api.getAllSongs();
      setSongs(songsList);
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
  };

  const handlePlay = (song) => {
    if (currentlyPlaying?.id === song.id) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play();
        setIsPlaying(true);
      }
    } else {
      if (audio) {
        audio.pause();
      }
      const newAudio = new Audio(`http://localhost:5000${song.audioUrl}`);
      newAudio.addEventListener("ended", () => {
        setIsPlaying(false);
      });
      newAudio.play();
      setAudio(newAudio);
      setCurrentlyPlaying(song);
      setIsPlaying(true);
    }
  };

  // Sample music data - replace with your actual data
  const musicTracks = [
    {
      id: 1,
      title: "Summer Vibes",
      artist: "Wave Masters",
      coverImage: "/burna-boy.jpg",
      duration: "3:45",
      genre: "Electronic",
    },
    {
      id: 2,
      title: "Midnight Jazz",
      artist: "Blue Notes",
      coverImage: "/guitar.jpeg",
      duration: "4:20",
      genre: "Jazz",
    },
    {
      id: 3,
      title: "Urban Beat",
      artist: "Street Rhythm",
      coverImage: "/Rema.jpg",
      duration: "3:15",
      genre: "Hip Hop",
    },
    {
      id: 4,
      title: "Acoustic Dreams",
      artist: "The Strings",
      coverImage: "/Davido.jpg",
      duration: "4:05",
      genre: "Acoustic",
    },
  ];

  return (
    <main className={styles.main}>
      <section className={styles.heroSection}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={styles.heroSlide}
          >
            <div className={styles.heroBackground}>
              <Image
                src={heroSlides[currentSlide].image}
                fill
                alt="Hero background"
                priority
                className={styles.heroBackgroundImage}
              />
              <div className={styles.heroOverlay} />
            </div>

            <div className={styles.heroContent}>
              <motion.h1
                className={styles.heroTitle}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {heroSlides[currentSlide].title}{" "}
                <span className={styles.highlight}>
                  {heroSlides[currentSlide].highlight}
                </span>
              </motion.h1>

              <motion.p
                className={styles.heroSubtitle}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {heroSlides[currentSlide].subtitle}
              </motion.p>

              <motion.div
                className={styles.heroBtns}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <button className={styles.primaryBtn}>
                  <FaPlay /> Start Listening
                </button>
                <button className={styles.secondaryBtn}>
                  <FaInfoCircle /> Learn More
                </button>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className={styles.slideIndicators}>
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`${styles.slideIndicator} ${
                currentSlide === index ? styles.activeIndicator : ""
              }`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      <section className={styles.featuredSection}>
        <div className={styles.sectionHeader}>
          <h2>New Releases</h2>
          <p>Latest tracks from top artists</p>
        </div>

        <div className={styles.musicGrid}>
          {songs.map((song) => (
            <div key={song._id} className={styles.musicCard}>
              <div className={styles.imageContainer}>
                <img
                  src={`http://localhost:5000${song.imageUrl}`}
                  alt={song.title}
                  className={styles.albumCover}
                />
                <button
                  className={styles.playOverlay}
                  onClick={() => handlePlay(song)}
                >
                  {currentlyPlaying?._id === song._id && isPlaying ? (
                    <FaPause className={styles.playIcon} />
                  ) : (
                    <FaPlay className={styles.playIcon} />
                  )}
                </button>
              </div>

              <div className={styles.songInfo}>
                <div className={styles.titleRow}>
                  <h3>{song.title}</h3>
                  <button className={styles.likeBtn}>
                    <FaHeart />
                  </button>
                </div>
                <p className={styles.artistName}>{song.artist}</p>
                <div className={styles.songMeta}>
                  <span className={styles.duration}>{song.duration}</span>
                  <span className={styles.genre}>{song.genre}</span>
                </div>

                {currentlyPlaying?._id === song._id && (
                  <div className={styles.nowPlaying}>
                    <div className={styles.progressBar}>
                      <div
                        className={styles.progress}
                        style={{
                          width: `${
                            (audio?.currentTime / audio?.duration) * 100 || 0
                          }%`,
                        }}
                      />
                    </div>
                    <span className={styles.nowPlayingText}>Now Playing</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.musicSection}>
        <h2>Featured Tracks</h2>
        <div className={styles.musicGrid}>
          {musicTracks.map((track) => (
            <div key={track.id} className={styles.musicCard}>
              <div className={styles.cardImage}>
                <Image
                  src={track.coverImage}
                  alt={track.title}
                  width={300}
                  height={300}
                  className={styles.coverImage}
                />
                <button className={styles.playButton}>
                  <FaPlay className={styles.playIcon} />
                </button>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.trackInfo}>
                  <h3>{track.title}</h3>
                  <p>{track.artist}</p>
                </div>
                <div className={styles.trackMeta}>
                  <span className={styles.genre}>{track.genre}</span>
                  <span className={styles.duration}>{track.duration}</span>
                </div>
                <button className={styles.likeButton}>
                  <FaHeart />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className={styles.pricingSection}>
        <div className={styles.sectionHeader}>
          <h2>Choose Your Plan</h2>
          <p>Select the perfect plan for your music journey</p>
        </div>
        <div className={styles.pricingGrid}>
          {pricingPlans.map((plan, index) => (
            <div key={index} className={styles.pricingCard}>
              <div
                className={styles.pricingHeader}
                style={{ backgroundColor: plan.color }}
              >
                <plan.icon className={styles.planIcon} />
                <h3>{plan.title}</h3>
                <div className={styles.price}>{plan.price}</div>
              </div>
              <div className={styles.pricingFeatures}>
                {plan.features.map((feature, idx) => (
                  <div key={idx} className={styles.feature}>
                    <FaStar className={styles.featureIcon} />
                    {feature}
                  </div>
                ))}
              </div>
              <button className={styles.selectPlanBtn}>Select Plan</button>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Articles Section */}
      <section className={styles.articlesSection}>
        <div className={styles.sectionHeader}>
          <h2>Latest News</h2>
          <p>Stay updated with the latest in music</p>
        </div>
        <RecentArticles />
      </section>

      {/* Contact Section */}
      <section className={styles.contactSection}>
        <ContactGallery />
      </section>

      {/* Footer Newsletter */}
      <section className={styles.newsletterSection}>
        <h3>Stay Connected</h3>
        <p>Subscribe to our newsletter for the latest updates</p>
        <div className={styles.subscriptionForm}>
          <input type="email" placeholder="Enter your email" />
          <button type="submit">Subscribe</button>
        </div>
        <div className={styles.copyright}>
          Noise - Copyright {currentYear} Design by NoisyInc
        </div>
      </section>
    </main>
  );
};

export default Page;
