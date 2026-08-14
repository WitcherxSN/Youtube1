import mongoose from "mongoose";
import dotenv from "dotenv";

import Video from "./models/Video.js";
import Channel from "./models/Channel.js";
import User from "./models/User.js";

dotenv.config();

async function fixDemoVideos() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    const user = await User.findOne();

    if (!user) {
      console.log("No user found");
      return;
    }

    const demoVideos = [
      {
        title: "Learn React in 30 Minutes",
        channelName: "Code With John",
        handle: "codewithjohn",
        views: 15000,
        uploadedAt: "2 months ago",
        category: "React",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
        profileImage:
          "https://i.pinimg.com/736x/41/81/19/418119091bdce8f57afd6219a3630b45.jpg",
        videoUrl:
          "https://www.w3schools.com/html/mov_bbb.mp4",
        description:
          "Learn the basics of React in this quick tutorial covering components, props, state and modern React concepts.",
        createdAt: new Date(
          Date.now() - 60 * 24 * 60 * 60 * 1000
        ),
      },

      {
        title: "JavaScript Full Course for Beginners",
        channelName: "Web Dev Academy",
        handle: "webdevacademy",
        views: 120000,
        uploadedAt: "1 year ago",
        category: "JavaScript",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
        profileImage:
          "https://i.pinimg.com/736x/03/ee/cf/03eecfdcfc564da82dca4813cddfcbf2.jpg",
        videoUrl:
          "https://www.w3schools.com/html/mov_bbb.mp4",
        description: "Description",
        createdAt: new Date(
          Date.now() - 365 * 24 * 60 * 60 * 1000
        ),
      },

      {
        title: "My Ultimate Gaming Setup Tour",
        channelName: "Tech Gaming",
        handle: "techgaming",
        views: 85000,
        uploadedAt: "3 weeks ago",
        category: "Gaming",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1550745165-9bc0b252726f",
        profileImage:
          "https://i.pinimg.com/736x/69/e4/69/69e4692a4b3ed38947b348ca52089c42.jpg",
        videoUrl:
          "https://www.w3schools.com/html/mov_bbb.mp4",
        description: "Description",
        createdAt: new Date(
          Date.now() - 21 * 24 * 60 * 60 * 1000
        ),
      },

      {
        title: "Best Live Music Performance",
        channelName: "Music World",
        handle: "musicworld",
        views: 245000,
        uploadedAt: "5 days ago",
        category: "Music",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b",
        profileImage:
          "https://i.pinimg.com/736x/35/ba/79/35ba799cdf74d05d6db682140822314d.jpg",
        videoUrl:
          "https://www.w3schools.com/html/mov_bbb.mp4",
        description: "Description",
        createdAt: new Date(
          Date.now() - 5 * 24 * 60 * 60 * 1000
        ),
      },

      {
        title: "Top Movies You Should Watch",
        channelName: "Movie Central",
        handle: "moviecentral",
        views: 98000,
        uploadedAt: "4 months ago",
        category: "Movies",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba",
        profileImage:
          "https://i.pinimg.com/736x/18/bf/d7/18bfd7cf1de5a4daef6f66d65fa851a3.jpg",
        videoUrl:
          "https://www.w3schools.com/html/mov_bbb.mp4",
        description: "Description",
        createdAt: new Date(
          Date.now() - 120 * 24 * 60 * 60 * 1000
        ),
      },

      {
        title: "Today's Top News Explained",
        channelName: "Daily News",
        handle: "dailynews",
        views: 56000,
        uploadedAt: "2 hours ago",
        category: "News",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1504711434969-e33886168f5c",
        profileImage:
          "https://i.pinimg.com/736x/db/e9/e7/dbe9e703efd4aafce6e1fc03c9f0313f.jpg",
        videoUrl:
          "https://www.w3schools.com/html/mov_bbb.mp4",
        description: "Description",
        createdAt: new Date(
          Date.now() - 2 * 60 * 60 * 1000
        ),
      },

      {
        title: "Build Your First MERN Stack Project",
        channelName: "Coding Master",
        handle: "codingmaster",
        views: 32000,
        uploadedAt: "1 month ago",
        category: "React",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
        profileImage:
          "https://i.pinimg.com/736x/bc/a2/d7/bca2d7839210a8f9485c0f88800a2281.jpg",
        videoUrl:
          "https://www.w3schools.com/html/mov_bbb.mp4",
        description: "Description",
        createdAt: new Date(
          Date.now() - 30 * 24 * 60 * 60 * 1000
        ),
      },

      {
        title: "Top 10 Games You Need to Play",
        channelName: "Gaming Zone",
        handle: "gamingzone",
        views: 175000,
        uploadedAt: "6 months ago",
        category: "Gaming",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1511512578047-dfb367046420",
        profileImage:
          "https://i.pinimg.com/736x/6f/23/3b/6f233b8d8dd360fc1febdfe85d5f1101.jpg",
        videoUrl:
          "https://www.w3schools.com/html/mov_bbb.mp4",
        description: "Description",
        createdAt: new Date(
          Date.now() - 180 * 24 * 60 * 60 * 1000
        ),
      },
    ];

    const titles = demoVideos.map(
      (video) => video.title
    );

    await Video.deleteMany({
      title: {
        $in: titles,
      },
    });

    for (const item of demoVideos) {
      let channel = await Channel.findOne({
        handle: item.handle,
      });

      if (!channel) {
        channel = await Channel.create({
          channelName: item.channelName,
          handle: item.handle,
          description: `${item.channelName} official channel`,
          profileImage: item.profileImage,
          bannerImage: "",
          owner: user._id,
          subscribers: 120000,
        });
      } else {
        channel.channelName =
          item.channelName;

        channel.profileImage =
          item.profileImage;

        await channel.save();
      }

      await Video.collection.insertOne({
        title: item.title,
        description: item.description,
        category: item.category,
        thumbnailUrl: item.thumbnailUrl,
        videoUrl: item.videoUrl,

        channel: channel._id,
        uploader: user._id,

        views: item.views,
        likes: 0,
        dislikes: 0,

        createdAt: item.createdAt,
        updatedAt: new Date(),
      });

      console.log(
        `${item.title} → ${item.channelName}`
      );
    }

    console.log(
      "Original demo videos restored successfully"
    );

    await mongoose.disconnect();

  } catch (error) {
    console.log(
      "Fix error:",
      error
    );
  }
}

fixDemoVideos();