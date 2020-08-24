const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hotelSchema = mongoose.Schema(
  {
    writer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    images: {
      type: Array,
      default: [],
    },
    name: {
      type: String,
    },
    link: {
      type: String,
    },

    email: {
      type: String,
    },
  },
  { timestamps: true }
);

hotelSchema.index(
  {
    title: "text",
    description: "text",
  },
  {
    weights: {
      name: 5,
      description: 1,
    },
  }
);

const HotelModel = mongoose.model("HotelModel", hotelSchema);

module.exports = { HotelModel };
