import Video from "../models/Video";
import User from "../models/User";


export const home = async (req, res) => {
  return res.render("home");
};

export const search = async (req, res) => {
  return res.render("search");
};

export const board = (req, res) => {
  return res.render("board");
}

export const getVideoUpload = (req, res) => {
  return res.render("upload");
}

export const postVideoUpload = async (req, res) => {
  const {session: { user: { _id } }, files: { video, thumb }, body: { title, description, hashtags }} = req;
  try {
    const newVideo = await Video.create({
      title,
      description,
      fileUrl: video[0].path,
      thumbUrl: thumb[0].path,
      owner: _id,
      hashtags: Video.formatHashtags(hashtags),
    });
    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();
    return res.redirect(`/users/${_id}`);
  } catch (error) {
    return res.status(400).render("upload", {message: error});
  }
}