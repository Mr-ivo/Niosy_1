"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";
import styles from "./dashboard.module.css";

export default function Dashboard() {
  const [songs, setSongs] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [newSong, setNewSong] = useState({
    title: "",
    artist: "",
    genre: "",
    duration: "",
  });
  const [audioFile, setAudioFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      router.push("/auth/login");
      return;
    }
    setIsAdmin(user.role === "admin");
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      const songsList = await api.getAllSongs();
      setSongs(songsList);
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAdmin) return;

    setLoading(true);
    try {
      const formData = {
        ...newSong,
        audio: audioFile,
        image: imageFile,
      };

      await api.addSong(formData);

      // Reset form
      setNewSong({
        title: "",
        artist: "",
        genre: "",
        duration: "",
      });
      setAudioFile(null);
      setImageFile(null);

      fetchSongs();
    } catch (error) {
      console.error("Error adding song:", error);
    }
    setLoading(false);
  };

  const handleDelete = async (songId) => {
    if (!isAdmin) return;

    try {
      await api.deleteSong(songId);
      fetchSongs();
    } catch (error) {
      console.error("Error deleting song:", error);
    }
  };

  return (
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>

      {isAdmin && (
        <div className={styles.addSongSection}>
          <h2>Add New Song</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                value={newSong.title}
                onChange={(e) =>
                  setNewSong({ ...newSong, title: e.target.value })
                }
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="artist">Artist</label>
              <input
                type="text"
                id="artist"
                value={newSong.artist}
                onChange={(e) =>
                  setNewSong({ ...newSong, artist: e.target.value })
                }
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="genre">Genre</label>
              <input
                type="text"
                id="genre"
                value={newSong.genre}
                onChange={(e) =>
                  setNewSong({ ...newSong, genre: e.target.value })
                }
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="duration">Duration</label>
              <input
                type="text"
                id="duration"
                value={newSong.duration}
                onChange={(e) =>
                  setNewSong({ ...newSong, duration: e.target.value })
                }
                required
              />
            </div>
            <div className={styles.fileInputs}>
              <div className={styles.inputGroup}>
                <label htmlFor="audio">Audio File</label>
                <input
                  type="file"
                  id="audio"
                  accept="audio/*"
                  onChange={(e) => setAudioFile(e.target.files[0])}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="image">Cover Image</label>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={styles.submitBtn}
            >
              {loading ? "Adding..." : "Add Song"}
            </button>
          </form>
        </div>
      )}

      <div className={styles.songsList}>
        <h2>All Songs</h2>
        <div className={styles.songsGrid}>
          {songs.map((song) => (
            <div key={song._id} className={styles.songCard}>
              <img
                src={`http://localhost:5000${song.imageUrl}`}
                alt={song.title}
              />
              <div className={styles.songInfo}>
                <h3>{song.title}</h3>
                <p>{song.artist}</p>
                <p>{song.genre}</p>
                <p>{song.duration}</p>
                <audio controls src={`http://localhost:5000${song.audioUrl}`} />
              </div>
              {isAdmin && (
                <button
                  onClick={() => handleDelete(song._id)}
                  className={styles.deleteBtn}
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
