const router = require("express").Router();
const multer = require("multer");
const Song = require("../models/Song");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dest =
      file.fieldname === "audio" ? "uploads/audio" : "uploads/images";
    cb(null, dest);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Get all songs
router.get("/", async (req, res) => {
  try {
    const songs = await Song.find().sort({ createdAt: -1 });
    res.json(songs);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Add new song (admin only)
router.post(
  "/",
  [auth, admin],
  upload.fields([
    { name: "audio", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { title, artist, genre, duration } = req.body;

      const song = new Song({
        title,
        artist,
        genre,
        duration,
        audioUrl: `/uploads/audio/${req.files.audio[0].filename}`,
        imageUrl: `/uploads/images/${req.files.image[0].filename}`,
      });

      await song.save();
      res.json(song);
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Delete song (admin only)
router.delete("/:id", [auth, admin], async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }

    await song.remove();
    res.json({ message: "Song removed" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
