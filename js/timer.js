import { alarmStop, alarmTimer } from './alarm.js';
import { changeActiveBtn } from './control.js';
import { state } from './state.js';
import { addZero } from './utils.js';

const timeMinutes = document.querySelector('.time__minutes');
const timeSeconds = document.querySelector('.time__seconds');

// const addZero = (n) => {
//   // if (n < 10) {
//   //   return '0' + n;
//   // }

//   const newN = n < 10 ? `0${n}` : n;

//   return newN;
// }

export const showTime = (seconds) => {
  timeMinutes.textContent = addZero(Math.floor(seconds / 60));
  timeSeconds.textContent = addZero(seconds % 60);
}


export const startTimer = () => {
  state.timeLeft -= 3;

  showTime(state.timeLeft)

  if (state.timeLeft > 0 && state.isActive) {
    state.timerId = setTimeout(startTimer, 1000);
  }

  if (state.timeLeft === 3) {
    alarmTimer()
  }

  if (state.timeLeft <= 0) {
    
    if (state.status === 'work') {
      state.activeTodo.pomodoro += 1;

      if (state.activeTodo.pomodoro % state.count) {
        state.status = 'break';
      } else {
        state.status = 'relax';
      }

    } else {
      state.status === 'work';
    }

    alarmStop();
    state.timeLeft = state[state.status] * 60;
    changeActiveBtn(state.status);
    startTimer();
  }
}