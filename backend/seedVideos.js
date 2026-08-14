import mongoose from "mongoose";
import dotenv from "dotenv";
import Video from "./models/Video.js";
import Channel from "./models/Channel.js";

dotenv.config();

async function seedVideos() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    const channel = await Channel.findOne();

    if (!channel) {
      console.log("No channel found. Create a channel first.");
      process.exit();
    }

    const demoVideos = [
      {
        title: "Learn React in 30 Minutes",
        description:
          "Learn the basics of React including components, props, state and modern React concepts.",
        category: "React",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
        videoUrl:
          "https://www.w3schools.com/html/mov_bbb.mp4",
          createdAt: new Date(
      Date.now() - 1000 * 60 * 60 * 24 * 60 ),
      },

      {
        title: "JavaScript Full Course for Beginners",
        description:
          "Learn JavaScript fundamentals and important concepts for modern web development.",
        category: "JavaScript",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
        videoUrl:
          "https://www.w3schools.com/html/movie.mp4",
          createdAt: new Date(
      Date.now() - 1000 * 60 * 60 * 24 * 14
    ),
      },

      {
        title: "My Ultimate Gaming Setup Tour",
        description:
          "A complete tour of an exciting gaming setup with hardware and accessories.",
        category: "Gaming",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1550745165-9bc0b252726f",
        videoUrl:
          "https://www.w3schools.com/html/mov_bbb.mp4",
          createdAt: new Date(
      Date.now() - 1000 * 60 * 60 * 5),
      },

      {
        title: "Best Live Music Performance",
        description:
          "Enjoy an amazing live music performance with a great atmosphere.",
        category: "Music",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b",
        videoUrl:
          "https://www.w3schools.com/html/movie.mp4",
          createdAt: new Date(
      Date.now() - 1000 * 60 * 60 * 24 * 180),
      },

      {
        title: "Top Movies You Should Watch",
        description:
          "A collection of interesting movies worth watching.",
        category: "Movies",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba",
        videoUrl:
          "https://www.w3schools.com/html/mov_bbb.mp4",
           createdAt: new Date(
      Date.now() - 1000 * 60 * 60 * 24 * 365
    ),
      },

      {
        title: "Today's Top News Explained",
        description:
          "A simple explanation of important news and current events.",
        category: "News",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1504711434969-e33886168f5c",
        videoUrl:
          "https://www.w3schools.com/html/movie.mp4",
         
    createdAt: new Date(
      Date.now() - 1000 * 60 * 60 * 24
    ),
      },

      {
        title: "Build Your First MERN Stack Project",
        description:
          "Learn how to build a simple MERN stack project using MongoDB, Express, React and Node.",
        category: "React",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
        videoUrl:
          "https://www.w3schools.com/html/mov_bbb.mp4",
            createdAt: new Date(
      Date.now() - 1000 * 60 * 60 * 24 * 30
    ),
      },

      {
        title: "Top 10 Games You Need to Play",
        description:
          "A list of exciting games that every gamer should try.",
        category: "Gaming",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1511512578047-dfb367046420",
        videoUrl:
          "https://www.w3schools.com/html/movie.mp4",

    createdAt: new Date(
      Date.now() - 1000 * 60 * 30
    ),
      },
    ];

    const videosToInsert = demoVideos.map((video) => ({
      ...video,
      channel: channel._id,
      uploader: channel.owner,
      views: Math.floor(Math.random() * 200000),
      likes: Math.floor(Math.random() * 5000),
      dislikes: Math.floor(Math.random() * 100),
    }));

    await Video.insertMany(videosToInsert);

    console.log("8 demo videos inserted successfully");

    process.exit();

  } catch (error) {
    console.log("Seed error:", error);
    process.exit(1);
  }
}

seedVideos();