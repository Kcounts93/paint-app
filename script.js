// Initial refercences

let gridContainer = document.querySelector(".grid-container");
let gridBtn = document.getElementById("submit-grid");
let clearGridBtn = document.getElementById("clear-grid");
let gridWidth = document.getElementById("width-range");
let gridHeight = document.getElementById("height-range");
let colorBtn = document.getElementById("color-btn");
let eraseBtn = document.getElementById("erase-btn");
let paintBtn = document.getElementById("paint-gridBtn");
let widthValue = document.getElementById("width-value");
let heightValue = document.getElementById("height-value");

// Events object
let events = {
  mouse: {
    down: "mousedown",
    move: "mousemove",
    up: "mouseup",
  },
  touch: {
    down: "touchstart",
    move: "touchmove",
    up: "touchend",
  },
};

let deviceType = "";

// Initial draw and erase = false
let draw = false;
let erase = false;

//  Touch device detection
const isTouchDevice = () => {
  try {
    // create touchevent
    document.createEvent("TouchEvent");
    deviceType = "touch";
    return true;
  } catch (e) {
    deviceType = "mouse";
    return false;
  }
};
isTouchDevice();
