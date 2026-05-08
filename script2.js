
// !! file not in use

// const containerEl = document.querySelector(".container");
const img = document.querySelector(".image");
const sub = document.querySelector(".reference-bar-left");
const btnRight = document.querySelector(".btn-right");
const btnLeft = document.querySelector(".btn-left");
const curImgNum = document.querySelector(".cur-img-num");
const totalImgNumDOM = document.querySelector(".total-img-num");
const brightnessBtn = document.querySelector(".brightness");
const contrastBtn = document.querySelector(".contrast");
const rotateBtn = document.querySelector(".rotate");
const container = document.getElementById("image-container");
// const table = document.querySelector("table");
// const tableScroll = document.querySelector(".table-scroll");
const img1 = {
  id: 1,
  src: "./img1.jpeg",
};
const img2 = {
  id: 2,
  src: "./img2.jpeg",
};
const img3 = {
  id: 3,
  src: "./img3.jpg",
};

const img4 = {
  id: 4,
  src: "./img4.jpg",
};
const img5 = {
  id: 5,
  src: "./img5.jpg",
};

const imgs = [img1, img2, img3, img4, img5];
const totalImgCount = imgs.length;
totalImgNumDOM.textContent = totalImgCount.toString();
let num = 1;

function changeImgForward() {
  img.style.filter = `brightness(1)`;

  if (num > totalImgCount - 1 || num < 1) return;
  num++;
  curImgNum.textContent = num.toString();
  img.src = imgs[num - 1].src;

  return;
}

function changeImgBack() {
  img.style.filter = `brightness(1)`;

  if (num > totalImgCount || num <= 1) return;
  num--;
  curImgNum.textContent = num.toString();
  img.src = imgs[num - 1].src;
  console.log(num, imgs[num - 1].src);

  return;
}

btnRight.addEventListener("click", changeImgForward);
btnLeft.addEventListener("click", changeImgBack);
