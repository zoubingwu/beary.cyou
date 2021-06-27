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
  let scrolling = false;
  let q = [];
  let timer;
  let prevTouchY = [];
  let fullpageInstance;

  const app = document.querySelector('#app');

  const c = window.console;
  window.console = null;
  fullpageInstance = new fullpage('#app', {
    autoScrolling: false,
    fitToSection: false,
    afterLoad: function (_, dest) {
      scrolling = false;
      if (dest.isLast) {
        app.removeEventListener('wheel', handleWheel);
        app.removeEventListener('touchmove', handleWheel);
        app.removeEventListener('touchend', touchEnd);
      }
    },
  });
  window.console = c;

  function moveSection(delta, threshold) {
    if (delta > threshold) {
      fullpageInstance.moveSectionDown();
      return true;
    } else if (delta < -threshold) {
      fullpageInstance.moveSectionUp();
      return true;
    } else {
      return false;
    }
  }

  function handleWheel(e) {
    if (e.type === 'touchmove' && e.changedTouches.length > 1) {
      return;
    }

    if (scrolling) {
      e.preventDefault();
      return;
    }

    e.preventDefault();

    if (e.type === 'wheel') {
      q.push(e.deltaY);
    } else if (e.type === 'touchmove') {
      const clientY = e.changedTouches[0].clientY;
      console.log('clientY: ', clientY);
      if (prevTouchY.length > 0) {
        const deltaY = prevTouchY[prevTouchY.length - 1] - clientY;
        q.push(deltaY);
      }
      prevTouchY.push(clientY);
    }

    const delta = q.reduce((a, b) => a + b, 0);
    const threshold = e.type === 'wheel' ? 400 : 100;
    const moving = moveSection(delta, threshold);

    clearTimeout(timer);
    if (moving) {
      q = [];
      scrolling = true;
    } else {
      timer = setTimeout(() => {
        q = [];
      }, 300);
    }
  }

  function touchEnd() {
    q = [];
    prevTouchY = [];
  }

  app.addEventListener('wheel', handleWheel);
  app.addEventListener('touchmove', handleWheel);
  app.addEventListener('touchend', touchEnd);
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
