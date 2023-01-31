import { alarmStop, alarmTimer } from './alarm.js';
import { state } from './state.js';

const timeMinutes = document.querySelector('.time__minutes');
const timeSeconds = document.querySelector('.time__seconds');

const showTime = (seconds) => {
  let minute = Math.floor(seconds / 60);
  let second = seconds % 60;

  timeMinutes.textContent = minute < 10 ? '0' + minute : minute;
  timeSeconds.textContent = second < 10 ? '0' + second : second;

}


export const startTimer = () => {
  state.timeLeft -= 1;

  showTime(state.timeLeft)

  if (state.timeLeft > 0 && state.isActive) {
    state.timerId = setTimeout(startTimer, 1000);
  }

  if (state.timeLeft === 3) {
    alarmTimer()
  }

  if (state.timeLeft === 0) {
    alarmStop()
  }
}