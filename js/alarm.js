const audioTimer = new Audio('audio/3-2-1.mp3');
const audioStop = new Audio('audio/deep-end.mp3');

export const alarmTimer = () => {
  audioTimer.play();
}

export const alarmStop = () => {
  audioStop.play();
}