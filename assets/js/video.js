/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/client/js/video.js":
/*!********************************!*\
  !*** ./src/client/js/video.js ***!
  \********************************/
/***/ (() => {

eval("var video = document.querySelector(\"video\");\nvar videoController = document.getElementById(\"videoController\");\nvar psBtn = document.getElementById(\"playPauseBtn\");\nvar currentZone = document.getElementById(\"currentZone\");\nvar durationTime = document.getElementById(\"durationTime\");\nvar timeRange = document.getElementById(\"timeRange\");\nvar volumeBtn = document.getElementById(\"volume\");\nvar volumeRange = document.getElementById(\"volumeRange\");\nvar fullScreen = document.getElementById(\"fullScreen\");\nvar videoInner = document.getElementById(\"videoInner\");\nvar volumeValue = 0.5;\nvideo.volume = volumeValue;\nvar controlsTimeout = null;\nvar controlsMovementTimeout = null;\n\nvar handlePlayAndStop = function handlePlayAndStop() {\n  if (video.paused) {\n    video.play();\n    psBtn.className = \"fas fa-pause\";\n    handleMetadata();\n  } else {\n    video.pause();\n    psBtn.className = \"fas fa-play\";\n  }\n};\n\nvar handleSound = function handleSound() {\n  if (video.muted) {\n    video.muted = false;\n    volumeRange.value = volumeValue;\n    volumeBtn.className = \"fas fa-volume-up\";\n  } else {\n    video.muted = true;\n    volumeRange.value = 0;\n    volumeBtn.className = \"fas fa-volume-mute\";\n  }\n};\n\nvar handleVolume = function handleVolume(event) {\n  var value = event.target.value;\n\n  if (video.muted) {\n    video.muted = false;\n    volumeBtn.className = \"fas fa-volume-mute\";\n  }\n\n  if (value === \"0\") {\n    volumeBtn.className = \"fas fa-volume-off\";\n  } else {\n    volumeBtn.className = \"fas fa-volume-up\";\n  }\n\n  video.volume = volumeValue = value;\n};\n\nvar formatTime = function formatTime(seconds) {\n  return new Date(seconds * 1000).toISOString().substr(14, 5);\n};\n\nvar handleMetadata = function handleMetadata() {\n  durationTime.innerText = formatTime(Math.floor(video.duration));\n  timeRange.max = Math.floor(video.duration);\n};\n\nvar handleTimeupdate = function handleTimeupdate() {\n  currentZone.innerText = formatTime(Math.floor(video.currentTime));\n  timeRange.value = Math.floor(video.currentTime);\n};\n\nvar handleTimeRange = function handleTimeRange(event) {\n  return video.currentTime = event.target.value;\n};\n\nvar handleFullScreen = function handleFullScreen() {\n  if (document.fullscreenElement) {\n    document.exitFullscreen();\n  } else {\n    videoInner.requestFullscreen();\n  }\n};\n\nvar hideControls = function hideControls() {\n  return videoController.style.opacity = \"0\";\n};\n\nvar handleMouseMove = function handleMouseMove() {\n  if (controlsTimeout) {\n    clearTimeout(controlsTimeout);\n    controlsTimeout = null;\n  }\n\n  if (controlsMovementTimeout) {\n    clearTimeout(controlsMovementTimeout);\n    controlsMovementTimeout = null;\n  }\n\n  videoController.style.opacity = \"1\";\n  controlsMovementTimeout = setTimeout(hideControls, 3000);\n};\n\nvar handleMouseLeave = function handleMouseLeave() {\n  controlsTimeout = setTimeout(hideControls, 500);\n};\n\npsBtn.addEventListener(\"click\", handlePlayAndStop);\nvolumeBtn.addEventListener(\"click\", handleSound);\nvolumeRange.addEventListener(\"input\", handleVolume);\nvideo.addEventListener(\"loadedmetadata\", handleMetadata);\nvideo.addEventListener(\"timeupdate\", handleTimeupdate);\ntimeRange.addEventListener(\"input\", handleTimeRange);\nfullScreen.addEventListener(\"click\", handleFullScreen);\nvideo.addEventListener(\"click\", handlePlayAndStop);\nvideoInner.addEventListener(\"mousemove\", handleMouseMove);\nvideoInner.addEventListener(\"mouseleave\", handleMouseLeave);\n\n//# sourceURL=webpack://practice-0629-node/./src/client/js/video.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/js/video.js"]();
/******/ 	
/******/ })()
;