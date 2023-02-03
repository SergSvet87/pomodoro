import { state } from './state.js';
import { showTime, startTimer } from './timer.js'

const btnStart = document.querySelector('.control__btn_start');
const btnStop = document.querySelector('.control__btn_stop');
const btnsNavigation = document.querySelectorAll('.navigation__btn');

export const changeActiveBtn = (dataUse) => {
  state.status = dataUse;

  for (let index = 0; index < btnsNavigation.length; index++) {

    if (btnsNavigation[index].dataset.use === dataUse) {
      btnsNavigation[index].classList.add('navigation__btn_active');
    } else {
      btnsNavigation[index].classList.remove('navigation__btn_active');
    }
  }
};

export const stop = () => {
  clearTimeout(state.timerId);
  state.isActive = false;
  btnStart.textContent = 'Старт';
  state.timeLeft = state[state.status] * 60;
  showTime(state.timeLeft);
}

export const initControl = () => {
  btnStart.addEventListener('click', () => {
    if (state.isActive) {
      state.isActive = false
      btnStart.textContent = 'Старт';
      clearTimeout(state.timerId);
    } else {
      state.isActive = true;
      btnStart.textContent = 'Пауза';
      startTimer();
    }
  });

  
  btnStop.addEventListener('click', stop)

  for (let index = 0; index < btnsNavigation.length; index++) {
    btnsNavigation[index].addEventListener('click', () => {
      changeActiveBtn(btnsNavigation[index].dataset.use);
      stop()
    });

  }

  showTime(state.timeLeft);
}