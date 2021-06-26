import fullpage from 'fullpage.js';

function loadImage(src, target) {
  return new Promise(function (resolve, reject) {
    const img = new Image();
    img.onload = function () {
      document.querySelector(target).src = this.src;
      resolve(img);
    };
    img.onerror = reject;
    img.src = src;
  });
}

function init() {
  const c = window.console;
  window.console = null;
  new fullpage('#app');
  window.console = c;

  loadImage('./assets/xiong1.gif', '.xiong1');
  loadImage('./assets/xiong2.gif', '.xiong2');
  loadImage('./assets/xiong3.gif', '.xiong3');
  loadImage('./assets/xiong4.gif', '.xiong4');
  loadImage('./assets/xiong5.gif', '.xiong5');
}

window.onload = init;
