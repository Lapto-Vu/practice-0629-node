import Video from "../models/Video";
import User from "../models/User";


export const home = async (req, res) => {
  const videos = await Video.find({}).sort({ createdAt: "desc" }).populate("owner");
  return res.render("home", {videos});
};

export const search = async (req, res) => {
  const {query: {keyword}} = req;
  if (keyword) {
    var searchResult = await Video.find({title: {$regex: new RegExp(`${keyword}$`, "i")}}).populate("owner");
  }
  return res.render("search", { videos: searchResult });
};

export const watch = async (req, res) => {
  const {params: { id } } = req;
  const video = await Video.findById(id).populate("owner");
  return res.render("watch", { video })
}

export const board = async (req, res) => {
  const { params: { id } } = req;
  const videos = await Video.find({ owner : id }).sort({ createdAt: "desc" }).populate("owner");
  const user = await User.findById(id);
  return res.render("board", {videos, user});
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

export const getEditVideo = async (req, res) => {
  const { params: { id }} = req;
  const video = await Video.findById(id);
  return res.render("video", {video});
}

export const postEditVideo = async (req, res) => {
  const { id } = req.params;
  const{ file, body :{ title, description, hashtags } }= req;
  const video = await Video.findById(id);
  await Video.findByIdAndUpdate(id, {
    thumbUrl: file ? file.path : video.thumbUrl,
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  req.flash("info", "성공적으로 동영상을 편집하였습니다.");
  return res.redirect(`/videos/${id}`);
}

export const videoDelete = async (req, res) => {
  return res.redirect("/")
}