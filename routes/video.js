const express = require('express');
const multer = require('multer');
const router = express.Router();
const Video = require('../models/Video');
const { synthesizeVoice } = require('../utils/elevenlabs');

const upload = multer({ dest: 'uploads/' });

// Upload Video
router.post('/upload', upload.single('video'), async (req, res) => {
  try {
    const video = await Video.create({
      userId: req.user.id,
      filePath: req.file.path,
      status: 'processing'
    });
    res.json(video);
  } catch (err) {
    res.status(500).json({ error: 'Upload failed' });
  }
});

// Add YouTube Video
router.post('/youtube', async (req, res) => {
  const { url } = req.body;
  // Use youtube-dl to process URL (requires Python)
  res.json({ status: 'Processing YouTube video' });
});

// Generate Voiceover
router.post('/generate-voice', async (req, res) => {
  const { text, videoId } = req.body;
  const audioPath = await synthesizeVoice(text);
  await Video.update({ voiceOverPath: audioPath }, { where: { id: videoId } });
  res.json({ success: true });
});

module.exports = router;
