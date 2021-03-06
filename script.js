// 104 v 1*
const player = document.querySelector('.player');
const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range'); // (progress-range) is class, and with querySelector it needs . (dot)
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById ('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const speed = document.querySelector('.player-speed');
const fullscreenBtn = document.querySelector('.fullscreen');



// 2*a
// Play & Pause  here in an if function we say if it was stoped you press play to go on, but if it was playing you pause it----------------------------------- //

// 4*a
function showPlayIcon (){
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
}

// 2*a1
function togglePlay(){
  if(video.paused){ //if the video was true (on pause), you play it;
    video.play();
    // 3*a changing the play shape to stop shape when we stop the video
    playBtn.classList.replace('fa-play', 'fa-pause');
    // 3*b when we stope it, it should show stope
    playBtn.setAttribute('title', 'Pause');

  } else {
    video.pause();
    // 3*c changing the play shape to stop shape when we stop the video
    // playBtn.classList.replace('fa-pause', 'fa-play');
    // 3*d when we stope it, it should show stope
    // playBtn.setAttribute('title', 'Play');
    // 4*b
    showPlayIcon();
  }
}

// 5* on Video End, show play button icon
video.addEventListener('ended', showPlayIcon);

// Progress Bar ---------------------------------- //
// 7*1 Calculate display time format
function displayTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  seconds = seconds > 9 ? seconds : `0${seconds}`;
  return `${minutes}:${seconds}`;
  // console.log(minutes, seconds);
}





// 5*b update progress bar as video plays
function updateProgress (){
  // you know this event brings back several things we need two things 1- currentTime and duration
   // console.log('currentTime', video.currentTime, 'duration', video.duration);
  // 6*
  progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
  // 7*2
  // displayTime(64);
  currentTime.textContent = `${displayTime(video.currentTime)} /`;
  duration.textContent = `${displayTime(video.duration)}`;

}

// 8*2 Click to seek within the video
function setProgress(e) {
  const newTime = e.offsetX / progressRange.offsetWidth;
  progressBar.style.width = `${newTime * 100}%`;
  video.currentTime = newTime * video.duration;
  // console.log(newTime);

  // console.log(e);
}



// Volume Controls --------------------------- //
// 11*1
let lastVolume = 1;





// 9* 2
function changeVolume(e) {
  let volume = e.offsetX / volumeRange.offsetWidth;
  // Rounding volume up or down
  if(volume < 0.1) {
    volume = 0;
  }
  if(volume > 0.9) {
    volume = 1;
  }

  // 8*3
  volumeBar.style.width = `${volume * 100}%`;
  video.volume = volume;
  console.log(volume);
  // 10*
  volumeIcon.className = '';
  if(volume > 0.7) {
    volumeIcon.classList.add('fas', 'fa-volume-up');
  } else if (volume < 0.7 && volume > 0) {
    volumeIcon.classList.add('fas', 'fa-volume-down');
  } else if (volume === 0) {
    volumeIcon.classList.add('fas', 'fa-fa-volume-off');
  }
  // 11*2
  lastVolume = volume;

}

// 11*3
// Mute/Unmute
function toggleMute() {
  // 12*1
  volumeIcon.className = '';

  if(video.volume) {
    lastVolume = video.volume;
    video.volume = 0;
    volumeBar.style.width = 0;
    // 12*2
    volumeIcon.classList.add('fas', 'fa-volume-mute');
    volumeIcon.setAttribute('title', 'Unmute');
  } else {
    video.volume = lastVolume;
    volumeBar.style.width = `${lastVolume * 100}%`;
    volumeIcon.classList.add('fas', 'fa-volume-up');
    volumeIcon.setAttribute('title', 'Mute');
  }
}

// Change Playback Speed -------------------- //
// 13*1
function changeSpeed() {
  // console.log('video playback rate', video.PlaybackRate);
  // console.log('selected value', speed.value);
  video.PlaybackRate = speed.value;
}


let fullscreen = false;
// Toggle Fullscreen
function toggleFullscreen(){
  if (!fullscreen) {
    openFullscreen(player);
  } else {
    closeFullscreen();
  }
  fullscreen = !fullscreen;
}


// Fullscreen ------------------------------- //
/* View in fullscreen  we got it directly from internet*/
function openFullscreen(elem) { // we added this parameter here
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
  video.classList.add('video-fullscreen');
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
  video.classList.remove('video-fullscreen');
}


// 2*b Event Listener
playBtn.addEventListener('click', togglePlay); // togglePlay function is at the top
video.addEventListener('click', togglePlay); //this one is similar to the one above, but this one says whereevr you click on the video screen, the video start paly
// 5*a
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);

// 8*1
progressRange.addEventListener('click', setProgress);

// 9*1 108
volumeRange.addEventListener('click', changeVolume);
// 11* 4
volumeIcon.addEventListener('click', toggleMute);
// 13*
speed.addEventListener('change', changeSpeed);

fullscreenBtn.addEventListener("click", toggleFullscreen);
