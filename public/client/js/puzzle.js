/**
 * Simple Jigsaw Puzzle.
 *
 * Another simple implementation of jigsaw puzzle. 
 * I tried to make it as simply and as fast as possible, 
 * so the resulting code is absolutely not optimized.
 * The pictures used are not mine, I found them 
 * on the Internet (God bless the Internet!).
 *
 * I had to add the word 'game' to this description, 
 * because people like to search for that word.
 *
 * - added picture selection;
 * - added board configuration selection;
 * - changed RADIUS according to the size of the board;
 * - added window resize event handler;
 * - made the puzzle respond to touch events (thanks to aminovmunir@hahayka for spotting the issue);
 *
 * @version 0.1.5
 * @author Denis Khakimov <denisdude@gmail.com>
 */

var music = new Audio("/client/sounds/Lobby-Time.mp3")

const flag_detective_music_on = document.querySelector(".flag-detective-music-on")
const flag_detective_music_off = document.querySelector(".flag-detective-music-off")

const flag_detective_game_card = document.querySelector(".flag-detective-game-card")
const flag_detective_score_card = document.querySelector(".flag-detective-score-card")

const focus_input = document.querySelector(".focus")

const detective_total_questions = document.querySelector(
  ".detective-total-questions"
);


focus_input.focus()
focus_input.classList.add("d-none")

// Music


flag_detective_music_on.onclick=()=>{
  flag_detective_music_on.classList.add("d-none")
  flag_detective_music_off.classList.remove("d-none")
  music.play()
  music.loop ="true"
}

flag_detective_music_off.onclick=()=>{
  flag_detective_music_on.classList.remove("d-none")
  flag_detective_music_off.classList.add("d-none")
  music.pause()
}

// Total Questions

detective_total_questions.innerHTML =
  '<span class="total_que">' +
  1 +
  '<span>/' +
  5
" </span></span>";



// Timer


const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 30 / 2;
const ALERT_THRESHOLD = 30 / 4;

const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};

const TIME_LIMIT = 30;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;


// Clock Timer


flag_detective_game_card.innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(
  timeLeft
)}</span>
</div>
`;

const base_timer__label = document.querySelector(".base-timer__label")

function onTimesUp() {
  clearInterval(timerInterval);
}

function startTimer() {
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById("base-timer-label").innerHTML = formatTime(
      timeLeft
    );
    setCircleDasharray();
    setRemainingPathColor(timeLeft);

    if (timeLeft === 0) {
      onTimesUp();
      callResultScreen();
    }
  }, 1000);
}
startTimer()

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(warning.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(info.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(warning.color);
    base_timer__label.style.animation = "popup 800ms infinite ease-in-out"
  }
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}


// Score Card

flag_detective_score_card.innerHTML = 1 < 10 ? "Score : 0" + 1 : "Score :" + 1;


// Score End

// Clock Timer End



const FPS = 30;
// const pickimage = document.querySelector('select[name=pickimage]');
// let IMAGE = pickimage.value;
let image = null;
let ROWS = 3;
let COLS = 2;
let RADIUS = 100;
let OFFSET = 20;
let board = null;
let piece = null;
const MAX_WIDTH = 500;
const MAX_HEIGHT = 500;

const app = document.querySelector('#app');
const canvas = document.createElement('canvas');
app.appendChild(canvas);
const ctx = canvas.getContext('2d');

// UI -- begin
let isMouseInside = false;
let isPieceMoving = false;
let mousePos = { x: 0, y: 0 };

canvas.addEventListener('pointerenter', e => {
  isMouseInside = true;
});
canvas.addEventListener('pointerleave', e => {
  isMouseInside = false;
  isPieceMoving = false;
  piece = null;
});
canvas.addEventListener('pointermove', e => {
  if (e.pointerType == 'mouse' && !isPieceMoving && isMouseInside && board) {
    piece = board.pieceByPos(ctx, e.offsetX, e.offsetY);
    board.unhoverPieces();
    if (piece) piece.hover();
  }
  if (e.pointerType == 'touch' && isPieceMoving && piece) {
    piece.x += e.movementX;
    piece.y += e.movementY;
  } else if (isPieceMoving && piece) {// e.pointerType == 'mouse'
    piece.x += e.offsetX - mousePos.x;
    piece.y += e.offsetY - mousePos.y;
  }
  mousePos.x = e.offsetX;
  mousePos.y = e.offsetY;
});
canvas.addEventListener('pointerdown', e => {
  if (e.pointerType == 'touch' && !isPieceMoving && isMouseInside && board) {
    piece = board.pieceByPos(ctx, e.offsetX, e.offsetY);
    board.unhoverPieces();
    if (piece) piece.hover();
  }
  if (piece) isPieceMoving = true;
});
canvas.addEventListener('pointerup', e => {
  isPieceMoving = false;
  // is the piece near its place?
  if (piece && piece.isNearToPlace()) {
    let localPiece = piece;
    let piecePos = { x: localPiece.x, y: localPiece.y };
    let tween = new TWEEN.Tween(piecePos).
      to({ x: 0, y: 0 }, 250).
      easing(TWEEN.Easing.Quartic.In).
      onUpdate(() => {
        localPiece.z = 10;
        localPiece.x = piecePos.x;
        localPiece.y = piecePos.y;
      }).
      onComplete(() => {
        localPiece.z = 0;
        if (board.check()) {
          alert('You have successfully completed this puzzle!');
          board.pieces = [];
        }
      }).
      start();
  }
  piece = null;
});

// pickimage.addEventListener('change', e => {
//   IMAGE = e.target.value;
//   reset();
// });

const boardconfig = document.querySelector('.boardconfig');
boardconfig.addEventListener('change', e => {
  const dims = e.target.value.split('x');
  ROWS = dims[0];
  COLS = dims[1];
  if (COLS * ROWS > 15) {
    RADIUS ;
  } else if (COLS * ROWS > 12) {
    RADIUS;
  } else if (COLS * ROWS > 8) {
    RADIUS;
  } else {
    RADIUS;
  }
  reset();
});

const resetpuzzle = document.querySelector('.resetpuzzle');
resetpuzzle.addEventListener('click', e => {
  reset();
});

const shufflepuzzle = document.querySelector('.shufflepuzzle');

window.onload =function(){ shufflepuzzle.click()}

shufflepuzzle.addEventListener('click', e => {
  const localPadding = 40;
  const localLeft = 500;
  const localRight = canvas.width;
  const localTop = localPadding;
  const localBottom = canvas.height;

  let randomPosition = [];
  let currentPosition = [];

  for (let i = 0; i < board.pieces.length; i++) {
    let piecePos = board.posByIndex(i);
    let localX = piecePos.x * board.pw;
    let localY = piecePos.y * board.ph;
    randomPosition.push({
      x: localLeft - localX + Math.random() * (-100+localRight - localLeft - board.pw),
      y: localTop - localY + Math.random() * (-150+localBottom - (localTop) - board.ph)
    });

    currentPosition.push({ x: 0, y: 0 });
  }
  for (let i = 0; i < board.pieces.length; i++) {
    let piece = board.pieces[i];
    new TWEEN.Tween(currentPosition[i]).
      to(randomPosition[i], 1000).
      easing(TWEEN.Easing.Quadratic.Out).
      onUpdate(() => {
        piece.x = currentPosition[i].x;
        piece.y = currentPosition[i].y;
        piece.z = i + 10;
      }).
      onComplete(() => {
        piece.z = 0;
      }).
      start();
  }
});
// UI -- end

let deltaTime = 0;
let fpsDeltaTime = 0;
let fpsDeltaLimit = 1000 / FPS;
const render = time => {
  deltaTime = time - deltaTime;
  fpsDeltaTime += deltaTime;

  if (fpsDeltaTime >= fpsDeltaLimit) {
    TWEEN.update(time);
    if (board) board.render(ctx);

    fpsDeltaTime = 0;
  }

  deltaTime = time;
  requestAnimationFrame(render);
};


// init -- begin
const reset = () => {
  image = new Image();
  image.src = "/client/img/Flags/01-correct.svg";
  image.addEventListener('load', e => {
    let ratio = image.width / image.height;
    let width = 600
    let height = image.height;

    if (image.width > image.height) {
      width = width > MAX_WIDTH ? MAX_WIDTH : width;
      height = width / ratio;
    } else {
      height = height > MAX_HEIGHT ? MAX_HEIGHT : height;
      width = height * ratio;
    }
    image.width = width;
    image.height = height;

    canvas.width = app.clientWidth;
    canvas.height = app.clientHeight;

    board = new Board(ROWS, COLS, image, OFFSET, RADIUS);
  });
};
const init = event => {
  reset();
  render(0);
};
document.addEventListener('DOMContentLoaded', init);
// init -- end

// window resize -- begin
const resize = event => {
  canvas.width = app.clientWidth;
  canvas.height = app.clientHeight;
};

// delay processing of window resize
let resizeTimeout = null;
window.addEventListener('resize', e => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    resize(e);
  }, 100);
});
// window resize -- end

// classes -- begin
//
class Piece {
  constructor(bx, by, width, height) {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.w = width;
    this.h = height;
    this.img = null;
    this.mask = null;
    this.bx = bx;
    this.by = by;
    this.isHover = false;
    this.index = 0;
  }
  isNearToPlace() {
    const distance = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));

    if (distance < 50)
      return true;

    return false;
  }
  getMask() { return this.mask(this.x, this.y); }
  set image(v) { this.img = v; }
  get image() { return this.img; }
  hover() {
    this.isHover = true;
    this.z = 10;
  }
  unhover() {
    this.isHover = false;
    this.z = 0;
  }
  render(ctx) {
    ctx.save();

    let mask = this.getMask();
    ctx.strokeStyle = 'gold';
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.stroke(mask);
    ctx.clip(mask, 'evenodd');

    ctx.drawImage(this.image,
      this.x + this.bx,
      this.y + this.by,
      this.image.width, this.image.height);

    if (this.isHover) {
      ctx.fillStyle = 'rgba(255, 230, 0, .25)';
      ctx.fill(mask);
    }

    ctx.restore();
  }
}

//
class Board {
  constructor(rows, cols, image, x = 0, y = 0, radius = 20) {
    this.r = rows;
    this.c = cols;
    this.x = x;
    this.y = y;
    this.image = image;
    this.pw = image.width / cols;
    this.ph = image.height / rows;
    this.pieces = [];
    this.rad = radius;

    for (let y = 0; y < this.r; y++) {
      for (let x = 0; x < this.c; x++) {
        let piece = new Piece(this.x, this.y, this.pw, this.ph);
        piece.image = this.image;
        piece.index = this.index(x, y);
        piece.mask = this.mask(x, y, this.radius);
        this.pieces.push(piece);
      }
    }
  }
  get piecesByZAsc() { return [...this.pieces].sort((a, b) => a.z - b.z); }
  get piecesByZDesc() { return [...this.pieces].sort((a, b) => b.z - a.z); }
  get radius() { return this.rad; }
  set radius(v) {
    this.rad = v;
    this.updateMasks();
  }
  index(x, y) { return x + y * this.c; }
  posByIndex(index) {
    return {
      x: index % this.c,
      y: Math.floor(index / this.c)
    };

  }
  check() {
    let counter = 0;

    for (let i = 0; i < this.pieces.length; i++) {
      if (this.pieces[i].index != counter ||
        this.pieces[i].x != 0 ||
        this.pieces[i].y != 0) return false;
      counter++;
    }

    return true;
  }
  updateMasks() {
    for (let y = 0; y < this.r; y++) {
      for (let x = 0; x < this.c; x++) {
        this.pieces[this.index(x, y)].mask = this.mask(x, y, this.radius);
      }
    }
  }
  unhoverPieces() {
    for (let i = 0; i < this.pieces.length; i++)
      this.pieces[i].unhover();
  }
  pieceByPos(ctx, x, y) {
    const pieces = this.piecesByZDesc;

    for (let i = 0; i < pieces.length; i++)
      if (ctx.isPointInPath(pieces[i].getMask(), x, y, 'nonzero'))
        return pieces[i];

    return null;
  }
  render(ctx) {
    ctx.save();
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    const pieces = this.piecesByZAsc;
    if (pieces.length > 0) {
      ctx.fillStyle = 'rgb(221, 250, 182)';
      ctx.rect(this.x, this.y, this.image.width, this.image.height);
      ctx.fill();

      for (let i = 0; i < pieces.length; i++)
        pieces[i].render(ctx);
    } else {
      ctx.drawImage(this.image, this.x, this.y, this.image.width, this.image.height);
    }

    ctx.restore();
  }
  mask(x, y, radius) {
    return (px, py) => {
      let m = new Path2D();

      m.moveTo(px + this.x + x * this.pw, py + this.y + y * this.ph);
      // top
      if (y == 0) {
        m.lineTo(px + this.x + (x + 1) * this.pw, py + this.y + y * this.ph);
      } else {
        m.lineTo(px + this.x + (x + .5) * this.pw - radius, py + this.y + y * this.ph);
        m.arc(px + this.x + (x + .5) * this.pw, py + this.y + y * this.ph, radius, Math.PI, 0, true);
        m.lineTo(px + this.x + (x + 1) * this.pw, py + this.y + y * this.ph);
      }
      // right
      if (x == this.c - 1) {
        m.lineTo(px + this.x + (x + 1) * this.pw, py + this.y + (y + 1) * this.ph);
      } else {
        m.lineTo(px + this.x + (x + 1) * this.pw, py + this.y + (y + .5) * this.ph - radius);
        m.arc(px + this.x + (x + 1) * this.pw, py + this.y + (y + .5) * this.ph, radius, -Math.PI / 2, Math.PI / 2, false);
        m.lineTo(px + this.x + (x + 1) * this.pw, py + this.y + (y + 1) * this.ph);
      }
      // bottom
      if (y == this.r - 1) {
        m.lineTo(px + this.x + x * this.pw, py + this.y + (y + 1) * this.ph);
      } else {
        m.lineTo(px + this.x + (x + .5) * this.pw + radius, py + this.y + (y + 1) * this.ph);
        m.arc(px + this.x + (x + .5) * this.pw, py + this.y + (y + 1) * this.ph, radius, 0, Math.PI, false);
        m.lineTo(px + this.x + x * this.pw, py + this.y + (y + 1) * this.ph);
      }
      // left
      if (x == 0) {
        m.lineTo(px + this.x + x * this.pw, py + this.y + y * this.ph);
      } else {
        m.lineTo(px + this.x + x * this.pw, py + this.y + (y + .5) * this.ph + radius);
        m.arc(px + this.x + x * this.pw, py + this.y + (y + .5) * this.ph, radius, Math.PI / 2, -Math.PI / 2, true);
        m.lineTo(px + this.x + x * this.pw, py + this.y + y * this.ph);
      }

      return m;
    };
  }
}

// classes -- end
