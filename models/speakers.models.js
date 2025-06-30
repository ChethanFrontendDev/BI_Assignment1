const mongoose = require("mongoose");

const speakersSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    profession: { type: String, required: true },
  },
  { timestamps: true }
);

const Speakers = mongoose.model("Speakers", speakersSchema);
module.exports = Speakers;
