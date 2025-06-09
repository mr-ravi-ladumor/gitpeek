import { Schema, model } from "mongoose";
const repoSchema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    fullName: { type: String, required: true },
    htmlUrl: { type: String, required: true, unique: true },
    description: { type: String, required: true, maxlength: 300 },
    starsCount: { type: Number, required: true },
    watchersCount: { type: Number, required: true },
    forksCount: { type: Number, required: true },
    openIssuesCount: { type: Number, required: true },
    language: { type: String, default: "Unknown" },
    topics: { type: [String], default: [] },
    createdAt: { type: Date, required: true }, 
    pushedAt: { type: Date, required: true },
  },
  { timestamps: true }
);

const Repo = model("Repo", repoSchema);
export default Repo;
