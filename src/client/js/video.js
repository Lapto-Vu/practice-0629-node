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
