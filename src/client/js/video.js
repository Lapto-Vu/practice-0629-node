import regeneratorRuntime from "regenerator-runtime";

const video = document.querySelector("video");
const videoController = document.getElementById("videoController");
const psBtn = document.getElementById("playPauseBtn");
const currentZone = document.getElementById("currentZone");
const durationTime = document.getElementById("durationTime");
const timeRange = document.getElementById("timeRange");
const volumeBtn = document.getElementById("volume");
const volumeRange = document.getElementById("volumeRange");
const fullScreen = document.getElementById("fullScreen");
const videoInner = document.getElementById("videoInner");
const form = document.getElementById("comments")
const textarea = document.getElementById("text");
const deleteBtn = document.querySelectorAll(".comment__delete")


let volumeValue = 0.5;
video.volume = volumeValue;
let controlsTimeout = null;
let controlsMovementTimeout = null;

const handlePlayAndStop = () => {
  if (video.paused) {
    video.play();
    psBtn.className = "fas fa-pause";
    handleMetadata();
  } else {
    video.pause();
    psBtn.className = "fas fa-play";
  }
};

const handleSound = () => {
  if (video.muted) {
    video.muted = false;
    volumeRange.value = volumeValue;
    volumeBtn.className = "fas fa-volume-up";
  } else {
    video.muted = true;
    volumeRange.value = 0;
    volumeBtn.className = "fas fa-volume-mute";
  }
};

const handleVolume = (event) => {
  const {
    target: { value }
  } = event;
  if (video.muted) {
    video.muted = false;
    volumeBtn.className = "fas fa-volume-mute";
  }
  if (value === "0") {
    volumeBtn.className = "fas fa-volume-off";
  } else {
    volumeBtn.className = "fas fa-volume-up";
  }
  video.volume = volumeValue = value;
};

const formatTime = (seconds) =>
  new Date(seconds * 1000).toISOString().substr(14, 5);

const handleMetadata = () => {
  durationTime.innerText = formatTime(Math.floor(video.duration));
  timeRange.max = Math.floor(video.duration);
};

const handleTimeupdate = () => {
  currentZone.innerText = formatTime(Math.floor(video.currentTime));
  timeRange.value = Math.floor(video.currentTime);
};

const handleTimeRange = (event) => (video.currentTime = event.target.value);

const handleFullScreen = () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    videoInner.requestFullscreen();
  }
};


const hideControls = () => (videoController.style.opacity = "0");

const handleMouseMove = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }
  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout);
    controlsMovementTimeout = null;
  }
  videoController.style.opacity = "1";
  controlsMovementTimeout = setTimeout(hideControls, 3000);
};

const handleMouseLeave = () => {
  controlsTimeout = setTimeout(hideControls, 500);
};

const handleEnded = () => {
  const { id } = videoInner.dataset;
  fetch(`/api/videos/${id}/view`, {
    method: "POST",
  });
};

const handleComment = async (event) => {
  event.preventDefault();
  const text = textarea.value;	
  const { id } = videoInner.dataset;
  if (text === "") {		
    return;				
  }
  await fetch(`/api/videos/${id}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", 
    },	
    body: JSON.stringify({ text }),
  });
  textarea.value="";
  window.location.reload();
};

const handleCommentDelete = async (event) => {
  const { id } = event.target.dataset
  await fetch(`/api/comment/${id}/delete`, {
    method: "DELETE",
  });
  window.location.reload();
}

deleteBtn.forEach( (item) => {
  item.addEventListener("click", handleCommentDelete)
});

form.addEventListener("submit", handleComment);
psBtn.addEventListener("click", handlePlayAndStop);
volumeBtn.addEventListener("click", handleSound);
volumeRange.addEventListener("input", handleVolume);
video.addEventListener("loadedmetadata", handleMetadata);
video.addEventListener("timeupdate", handleTimeupdate);
timeRange.addEventListener("input", handleTimeRange);
fullScreen.addEventListener("click", handleFullScreen);
video.addEventListener("click", handlePlayAndStop);
videoInner.addEventListener("mousemove", handleMouseMove);
videoInner.addEventListener("mouseleave", handleMouseLeave);
video.addEventListener("ended", handleEnded);
