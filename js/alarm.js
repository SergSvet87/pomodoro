import { state } from './state.js';

const audio = {
  work: new Audio('audio/dudu.mp3'),
  break: new Audio('audio/RingWeb.mp3'),
  relax: new Audio('audio/wave.mp3'),
};
const audioTimer = new Audio('audio/3-2-1.mp3');

export const alarmTimer = () => {
  audioTimer.play();
}

export const alarmStop = () => {
  audio[state.status].play();
}