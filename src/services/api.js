const API_URL = "http://localhost:5000/api";

export const api = {
  // Auth endpoints
  login: async (credentials) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    return response.json();
  },

  register: async (userData) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  // Songs endpoints
  getAllSongs: async () => {
    const response = await fetch(`${API_URL}/songs`);
    return response.json();
  },

  addSong: async (songData) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();

    // Append song details
    Object.keys(songData).forEach((key) => {
      if (key !== "audio" && key !== "image") {
        formData.append(key, songData[key]);
      }
    });

    // Append files
    formData.append("audio", songData.audio);
    formData.append("image", songData.image);

    const response = await fetch(`${API_URL}/songs`, {
      method: "POST",
      headers: {
        "x-auth-token": token,
      },
      body: formData,
    });
    return response.json();
  },

  deleteSong: async (songId) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/songs/${songId}`, {
      method: "DELETE",
      headers: {
        "x-auth-token": token,
      },
    });
    return response.json();
  },
};
