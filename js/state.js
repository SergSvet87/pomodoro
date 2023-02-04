
const WORK_TIME = 30;
const BREAK_TIME = 5;
const RELAX_TIME = 15;


export const state = {
  work: WORK_TIME,
  break: BREAK_TIME,
  relax: RELAX_TIME,
  status: 'work',
  count: 4,
  timeLeft: WORK_TIME * 60,
  isActive: false,
  timerId: 0,
}