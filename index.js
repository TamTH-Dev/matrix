const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const MAX_CHAR_COUNT = 500;
const FONT_SIZE = 13;
const SPEED_FACTOR = 12;
let WIDTH;
let HEIGHT;
let MAX_COLUMNS;

window.addEventListener('load', () => {
  setViewport();
});

window.addEventListener('resize', () => {
  setViewport();
});

function setViewport() {
  WIDTH = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );
  HEIGHT = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );
  MAX_COLUMNS = WIDTH / FONT_SIZE;
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
}

const charList = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  'А',
  'В',
  'Г',
  'Д',
  'Є',
  'Ѕ',
  'З',
  'И',
  'Ѳ',
  'І',
  'К',
  'Л',
  'М',
  'Н',
  'Ѯ',
  'Ѻ',
  'П',
  'Ч',
  'Р',
  'С',
  'Т',
  'Ѵ',
  'Ф',
  'Х',
  'Ѱ',
  'Ѿ',
  'Ц',
];

let fallingCharList = [];

class FallingChar {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw(ctx) {
    this.value =
      charList[Math.floor(Math.random() * charList.length)].toUpperCase();
    this.speed = Math.random() * FONT_SIZE + SPEED_FACTOR;

    ctx.fillStyle = 'rgb(0, 255, 0)';
    ctx.font = `${FONT_SIZE}px sans-serif`;
    ctx.fillText(this.value, this.x, this.y);

    this.y += this.speed;

    if (this.y > HEIGHT && fallingCharList.length === MAX_CHAR_COUNT) {
      // Leave last 100 chars to make effect more smoothly
      fallingCharList = fallingCharList.slice(400);
    }
  }
}

let frames = 0;

(function update() {
  if (fallingCharList.length < MAX_CHAR_COUNT) {
    const x = Math.floor(Math.random() * MAX_COLUMNS) * FONT_SIZE;
    const y = (Math.random() * HEIGHT) / 2;
    const fallingChar = new FallingChar(x, y);
    fallingCharList.push(fallingChar);
  }

  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  fallingCharList.forEach((char) => {
    if (frames % 2 !== 0) return;

    char.draw(ctx);
  });

  requestAnimationFrame(update);

  frames++;
})();
