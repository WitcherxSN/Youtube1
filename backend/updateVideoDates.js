import mongoose from "mongoose";
import dotenv from "dotenv";
import Video from "./models/Video.js";

dotenv.config();

async function updateVideoDates() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    const updates = [
      {
        title: "Learn React in 30 Minutes",
        daysAgo: 60,
      },
      {
        title: "JavaScript Full Course for Beginners",
        daysAgo: 14,
      },
      {
        title: "My Ultimate Gaming Setup Tour",
        hoursAgo: 5,
      },
      {
        title: "Best Live Music Performance",
        daysAgo: 180,
      },
      {
        title: "Top Movies You Should Watch",
        daysAgo: 365,
      },
      {
        title: "Today's Top News Explained",
        daysAgo: 1,
      },
      {
        title: "Build Your First MERN Stack Project",
        daysAgo: 30,
      },
      {
        title: "Top 10 Games You Need to Play",
        minutesAgo: 30,
      },
    ];

    for (const item of updates) {
      let millisecondsAgo = 0;

      if (item.daysAgo) {
        millisecondsAgo =
          item.daysAgo * 24 * 60 * 60 * 1000;
      }

      if (item.hoursAgo) {
        millisecondsAgo =
          item.hoursAgo * 60 * 60 * 1000;
      }

      if (item.minutesAgo) {
        millisecondsAgo =
          item.minutesAgo * 60 * 1000;
      }

      const newDate = new Date(
        Date.now() - millisecondsAgo
      );

      const result =
        await Video.collection.updateOne(
          {
            title: item.title,
          },
          {
            $set: {
              createdAt: newDate,
            },
          }
        );

      console.log(
        item.title,
        "matched:",
        result.matchedCount,
        "updated:",
        result.modifiedCount
      );
    }

    console.log("Finished updating video dates");

    await mongoose.disconnect();

  } catch (error) {
    console.log("Update error:", error);
  }
}

updateVideoDates();