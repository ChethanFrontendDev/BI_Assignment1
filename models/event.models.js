const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    sessionStartDate: {
      type: Date,
      required: true,
    },
    sessionEndDate: {
      type: Date,
      required: true,
    },
    sessionStartTime: {
      type: String,
      required: true,
    },
    sessionEndTime: {
      type: String,
      required: true,
    },
    eventType: {
      type: String,
      enum: ["Online", "Offline", "Both"],
      default: "Both",
      required: true,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    host: {
      type: String,
      required: true,
    },
    speakers: [
      {
        name: { type: String, required: true },
        profession: { type: String, required: true },
      },
    ],
    venue: {
      type: String,
    },
    eventFee: {
      type: String,
      required: true,
    },
    dressCode: {
      type: String,
      required: true,
    },
    ageRestrictions: {
      type: String,
      required: true,
    },
    eventTags: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
