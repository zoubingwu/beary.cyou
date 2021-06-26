import './main.css';
import fullpage from 'fullpage.js';
import xiong1 from './assets/xiong1.gif';
import xiong2 from './assets/xiong2.gif';
import xiong3 from './assets/xiong3.gif';
import xiong4 from './assets/xiong4.gif';
import xiong5 from './assets/xiong5.gif';

function loadImage(src, target) {
  return new Promise(function (resolve, reject) {
    const img = new Image();
    img.onload = function () {
      document.querySelector(target).src = this.src;
      resolve(img);
    };
    img.onerror = function (e) {
      console.log(e);
      reject(e);
    };
    img.src = src;
  });
}

function init() {
  const c = window.console;
  window.console = null;
  new fullpage('#app');
  window.console = c;

  loadImage(xiong1, '.xiong1');
  loadImage(xiong2, '.xiong2');
  loadImage(xiong3, '.xiong3');
  loadImage(xiong4, '.xiong4');
  loadImage(xiong5, '.xiong5');
}

window.onload = init;
