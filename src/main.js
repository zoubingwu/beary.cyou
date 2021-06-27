import fullpage from 'fullpage.js';
import xiong1 from './assets/xiong1.gif';
import xiong2 from './assets/xiong2.gif';
import xiong3 from './assets/xiong3.gif';
import xiong4 from './assets/xiong4.gif';
import xiong5 from './assets/xiong5.gif';
import 'virtual:windi.css';
import './main.css';

function loadImage(src, target) {
  const img = new Image();
  img.onload = function () {
    document.querySelector(target).src = this.src;
  };
  img.onerror = function (e) {
    console.error(e);
  };
  img.src = src;
}

function initFullPageEffect() {
  const c = window.console;
  window.console = null;
  new fullpage('#app');
  window.console = c;
}

function replaceGifs() {
  loadImage(xiong1, '.xiong1');
  loadImage(xiong2, '.xiong2');
  loadImage(xiong3, '.xiong3');
  loadImage(xiong4, '.xiong4');
  loadImage(xiong5, '.xiong5');
}

function init() {
  initFullPageEffect();
  replaceGifs();

  import('./Comment').then(({ initComment }) => {
    initComment(document.querySelector('.comment'));
  });
}

window.onload = init;
