import express from "express";
import Video from "../models/Video.js";
import Channel from "../models/Channel.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


// CREATE VIDEO
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      thumbnailUrl,
      videoUrl,
      channelId,
    } = req.body;

    if (
      !title ||
      !category ||
      !thumbnailUrl ||
      !videoUrl ||
      !channelId
    ) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    const channel = await Channel.findById(channelId);

    if (!channel) {
      return res.status(404).json({
        message: "Channel not found",
      });
    }

    if (
      channel.owner.toString() !== req.user.userId
    ) {
      return res.status(403).json({
        message: "You are not the owner of this channel",
      });
    }

    const newVideo = new Video({
      title,
      description,
      category,
      thumbnailUrl,
      videoUrl,
      channel: channelId,
      uploader: req.user.userId,
    });

    await newVideo.save();

    res.status(201).json({
      message: "Video created successfully",
      video: newVideo,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});


// GET ALL VIDEOS
router.get("/", async (req, res) => {
  try {
    const videos = await Video.find()
      .populate("channel", "channelName handle profileImage")
      .sort({ createdAt: -1 });

    res.status(200).json(videos);

  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});


// GET ONE VIDEO
router.get("/:id", async (req, res) => {
  try {
    const video = await Video.findById(req.params.id)
      .populate("channel", "channelName handle profileImage");

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    res.status(200).json(video);

  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});


// UPDATE VIDEO
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    if (
      video.uploader.toString() !== req.user.userId
    ) {
      return res.status(403).json({
        message: "You cannot edit this video",
      });
    }

    const updatedVideo = await Video.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      message: "Video updated successfully",
      video: updatedVideo,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});


// DELETE VIDEO
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    if (
      video.uploader.toString() !== req.user.userId
    ) {
      return res.status(403).json({
        message: "You cannot delete this video",
      });
    }

    await video.deleteOne();

    res.status(200).json({
      message: "Video deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});


export default router;