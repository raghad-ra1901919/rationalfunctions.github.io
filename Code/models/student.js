import mongoose from "mongoose";

const schema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    survey: {
        type: [String],
        default: [],
    },
    test: {
        type: [String],
        default: [],
    },
});

export default mongoose.model("Student", schema);