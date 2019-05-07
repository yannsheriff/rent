
export function humanizeMinutes(secNum) {
  const hours = Math.floor(secNum / 3600);
  let minutes = Math.floor((secNum - hours * 3600) / 60);
  let seconds = Math.floor(secNum - hours * 3600 - minutes * 60);
  minutes = minutes > 0 ? (minutes > 9 ? `${minutes}:` : `0${minutes}:`) : '00:';
  seconds = seconds > 0 ? (seconds > 9 ? `${seconds}` : `0${seconds}`) : '00';

  return minutes + seconds;
}

export function humanizeMonth(secNum) {
  let month = Math.floor(secNum / 2678400);
  let days = Math.floor((secNum - month * 2678400) / 86400);
  let hours = Math.floor((secNum - days * 86400 - month * 2678400) / 3600);
  month = month > 0 ? (month > 9 ? `${month} : ` : `0${month} : `) : '00 : ';
  days = days > 0 ? (days > 9 ? `${days} : ` : `0${days} : `) : '00 : ';
  hours = hours > 0 ? (hours > 9 ? `${hours}` : `0${hours}`) : '00';

  return month + days + hours;
}
