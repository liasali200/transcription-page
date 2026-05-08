//image pages buttons
const btnRight = document.querySelector(".btn-right");
const btnLeft = document.querySelector(".btn-left");
const curImgNum = document.querySelector(".cur-img-num");
const totalImgNumDOM = document.querySelector(".total-img-num");


const imgs = [
  { id: 1, src: "images/img1.jpeg" },
  { id: 2, src: "images/img2.jpeg" },
  { id: 3, src: "images/img3.jpg" },
  { id: 4, src: "images/img4.jpg" },
  { id: 5, src: "images/img5.jpg" }
];

const totalImgCount = imgs.length;
totalImgNumDOM.textContent = totalImgCount.toString();
let num = 1;
//end of image pages

//image pages - forward and backward
function changeImgForward() {
  if (num > totalImgCount - 1 || num < 1) return;
  num++;
  curImgNum.textContent = num.toString();
  img.src = imgs[num - 1].src;

  return;
}
function changeImgBack() {
  if (num > totalImgCount || num <= 1) return;
  num--;
  curImgNum.textContent = num.toString();
  img.src = imgs[num - 1].src;
  console.log(num, imgs[num - 1].src);

  return;
}
// listener for image pages
btnRight.addEventListener("click", changeImgForward);
btnLeft.addEventListener("click", changeImgBack);

// image tools

// let state = {
let state = JSON.parse(localStorage.getItem("imageState")) || {

  brightness: 100,
  contrast: 100,
  rotate: 0,
  zoom: 1,

  x: 0,
  y: 0
};

// //icons
const rotateBtn = document.querySelector("#rotate-icon");
const zoomBtn = document.querySelectorAll(".zoom");

// //sliders
const brightnessInput = document.querySelector("#brightness-slider");
const contrastInput = document.querySelector("#contrast-slider");

// // canvas
const canvas = document.getElementById("image");
const ctx = canvas.getContext("2d");


// image view
// event listeners
brightnessInput.addEventListener("input", applyImageEffects);
contrastInput.addEventListener("input", applyImageEffects);
zoomBtn.forEach((element) => element.addEventListener("click", handleZoom));

// rotate 
rotateBtn.addEventListener("click", () => {
  state.rotate = (state.rotate + 90) % 360;
  saveState();
  render();
});


// save in localStorage

function saveState() {
  localStorage.setItem("imageState", JSON.stringify(state));
}

// //brightness and contrast

function applyImageEffects() {
  state.brightness = brightnessInput.value;
  state.contrast = contrastInput.value;
  saveState();
  render();
}

// zoom

function handleZoom(e) {
  e.preventDefault();

  const type = e.target.dataset.zoom;

  if (type === "in") state.zoom += 0.05;
  if (type === "out") state.zoom -= 0.05;

  updateZoomDisplay()
  saveState();
  render();
}
// //display zoom value 

function updateZoomDisplay() {
  const zoomValue = document.querySelector('.zoom-value')

  const zoomPercent = Math.round(state.zoom * 100)

  zoomValue.innerHTML = ` ${zoomPercent} %`
  console.log(zoomPercent)

}

// render changes

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.filter = `brightness(${state.brightness}%)
    contrast(${state.contrast}%)`;

  //wrap
  ctx.save();
  // draw image on canvas
  ctx.translate(canvas.width / 2 + state.x, canvas.height / 2 + state.y);
  ctx.rotate((state.rotate * Math.PI) / 180);
  ctx.scale(state.zoom, state.zoom)
  ctx.drawImage(
    img,
    -canvas.width / 2,
    -canvas.height / 2,
    canvas.width,
    canvas.height,
  );

  ctx.restore();

  //end wrap
}

// canvas
const img = new Image();
img.src = "images/img1.jpeg";

img.onload = () => {
  // set canvas size to match image
  canvas.width = img.width / 1.3;
  canvas.height = img.height / 1.3;
  
  render();
};


// drag image
let isDragging = false;
let startX = 0;
let startY = 0;

canvas.addEventListener('mousedown', (e) => {
    console.log("DOWN");

  isDragging = true;

  // current cursor
  startX = e.clientX;
  startY = e.clientY;

});
canvas.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

  // cursor start point
  const dx = e.clientX - startX;
  const dy = e.clientY - startY;

  //cursor stop point
  startX = e.clientX;
  startY = e.clientY;

  state.x += dx;
  state.y += dy;

  saveState();
  render();
});

canvas.addEventListener('mouseup', () => {
  isDragging = false;
});


// setting show/hide toggle

const imageToolbar = document.querySelector('.image-editor-toolbar')
const brightnessSlider = document.querySelector('.brightness-slider-wrapper')
const contrastSlider = document.querySelector('.contrast-slider-wrapper')

const wrapperMap = {
  setting: imageToolbar,
  brightness: brightnessSlider,
  contrast: contrastSlider
}

document.addEventListener('click', (e) => {
  const key = e.target.dataset.target

  if (!key) return;

  const element = wrapperMap[key];
  if (!element) return;

  element.classList.toggle('is-visible');
  element.classList.toggle('is-invisible')

}
)

// reset function

const reset = document.querySelector(".reset")
reset.addEventListener("click", () => resetImageView())

function resetImageView() {
  state = {
    brightness: 100,
    contrast: 100,
    rotate: 0,
    zoom: 1,

    x:0,
    y:0,
  };

  // UI
  brightnessInput.value = state.brightness;
  contrastInput.value = state.contrast;

  updateZoomDisplay();

  render()
}