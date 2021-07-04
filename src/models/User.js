import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String },
  avatarUrl: { type: String, default: "http://59.15.195.235/default_profile.jpeg", required: true},
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Comment" }]
});

userSchema.pre("save", async function () {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 5);
    }
});

const User = mongoose.model("User", userSchema);
export default User;