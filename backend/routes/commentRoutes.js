import express from "express";
import Comment from "../models/Comment.js";
import Video from "../models/Video.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


// CREATE COMMENT
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { text, videoId } = req.body;

    if (!text || !videoId) {
      return res.status(400).json({
        message: "Comment text and video ID are required",
      });
    }

    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    const newComment = new Comment({
      text,
      video: videoId,
      user: req.user.userId,
    });

    await newComment.save();

    res.status(201).json({
      message: "Comment added successfully",
      comment: newComment,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

// GET COMMENTS FOR ONE VIDEO
router.get("/video/:videoId", async (req, res) => {
  try {
    const comments = await Comment.find({
      video: req.params.videoId,
    })
      .populate("user", "username avatar")
      .sort({ createdAt: -1 });

    res.status(200).json(comments);

  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

// UPDATE COMMENT
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim() === "") {
      return res.status(400).json({
        message: "Comment text is required",
      });
    }

    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    if (comment.user.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "You cannot edit this comment",
      });
    }

    comment.text = text;

    await comment.save();

    res.status(200).json({
      message: "Comment updated successfully",
      comment,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

// DELETE COMMENT
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    if (comment.user.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "You cannot delete this comment",
      });
    }

    await comment.deleteOne();

    res.status(200).json({
      message: "Comment deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

export default router;