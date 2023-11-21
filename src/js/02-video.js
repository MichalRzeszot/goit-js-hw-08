import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.getElementById('vimeo-player');

const player = new Vimeo(iframe);

const localStorageKey = 'videoplayer-current-time';

const saveCurrentTime = time => {
  localStorage.setItem(localStorageKey, JSON.stringify(time));
};

const getCurrentTime = () => {
  const storedTime = localStorage.getItem(localStorageKey);
  return storedTime ? JSON.parse(storedTime) : 0;
};

const updateTimeInLocalStorage = throttle(data => {
  const currentTime = data.seconds;
  saveCurrentTime(currentTime);
}, 1000);

player.on('timeupdate', updateTimeInLocalStorage);

const storedTime = getCurrentTime();
if (storedTime > 0) {
  player.setCurrentTime(storedTime);
}
