import express from "express";
import Channel from "../models/Channel.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create channel
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      channelName,
      handle,
      description,
      profileImage,
      bannerImage,
    } = req.body;

    if (!channelName || !handle) {
      return res.status(400).json({
        message: "Channel name and handle are required",
      });
    }

    const existingChannel = await Channel.findOne({ handle });

    if (existingChannel) {
      return res.status(400).json({
        message: "Handle already exists",
      });
    }

    const newChannel = new Channel({
      channelName,
      handle,
      description,
      profileImage,
      bannerImage,
      owner: req.user.userId,
    });

    await newChannel.save();

    res.status(201).json({
      message: "Channel created successfully",
      channel: newChannel,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

router.get("/my/channel", authMiddleware, async (req, res) => {
  try {
    const channel = await Channel.findOne({
      owner: req.user.userId,
    });

    if (!channel) {
      return res.status(404).json({
        message: "Channel not found",
      });
    }

    res.status(200).json(channel);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

// Get channel by handle
router.get("/:handle", async (req, res) => {
  try {
    const channel = await Channel.findOne({
      handle: req.params.handle,
    });

    if (!channel) {
      return res.status(404).json({
        message: "Channel not found",
      });
    }

    res.status(200).json(channel);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

export default router;