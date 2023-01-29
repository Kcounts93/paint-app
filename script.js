let container = document.querySelector(".container");
let gridButton = document.getElementById("submit-grid");
let clearGridButton = document.getElementById("clear-grid");
let gridWidth = document.getElementById("width-range");
let gridHeight = document.getElementById("height-range");
let colorButton = document.getElementById("color-input");
let eraseBtn = document.getElementById("erase-btn");
let paintBtn = document.getElementById("paint-btn");
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
console.log(isTouchDevice());

// Creating the grid
gridButton.addEventListener("click", () => {
  container.innerHTML = "";
  let count = 0;
  //  create rows
  for (let i = 0; i < gridHeight.value; i++) {
    count += 2;
    // create rows div
    let div = document.createElement("div");
    div.classList.add("gridRow");
    // Create Columns
    for (let j = 0; j < gridWidth.value; j++) {
      count += 2;
      let col = document.createElement("div");
      col.classList.add("gridCol");
      /* Unique ids for all columns( for touch screen ) */
      col.setAttribute("id", `gridCol${count}`);

      //  for eg is deviceType = 'mouse'
      col.addEventListener(events[deviceType].down, () => {
        // start draw
        draw = true;
        // erase = true then background is transparent else color
        if (erase) {
          col.style.backgroundColor = "transparent";
        } else {
          col.style.backgroundColor = colorButton;
        }
      });
      col.addEventListener(events[deviceType].move, (e) => {
        /* elementFromPoint returns the element at x,y position of mouse */
        let elementId = document.elementFromPoint(
          !isTouchDevice() ? e.clientX : e.touches[0].clientX,
          !isTouchDevice() ? e.clientY : e.touches[0].clientY
        ).id;
        //checker
        checker(elementId);
      });
      // Stop Drawing
      col.addEventListener(events[deviceType].up, () => {
        draw = false;
      });
      // append columns
      div.appendChild(col);
    }
    // append grid to container
    container.appendChild(div);
  }
});
function checker(elementId) {
  let gridColumns = document.querySelectorAll(".gridCol");
  //loop through all boxes
  gridColumns.forEach((element) => {
    //if id matches then allow color
    if (elementId == element.id) {
      if (draw && !erase) {
        element.style.backgroundColor = colorButton.value;
      } else if (draw && erase) {
        element.style.backgroundColor = "transparent";
      }
    }
  });
}

// Clear Grid
clearGridButton.addEventListener("click", () => {
  container.innerHTML = "";
});
// Erase Button
eraseBtn.addEventListener("click", () => {
  erase = true;
});

// Paint Button
paintBtn.addEventListener("click", () => {
  erase = false;
});

// Display grid width and height
gridWidth.addEventListener("input", () => {
  widthValue.innerHTML =
    gridWidth.value < 9 ? `${gridWidth.value}` : gridWidth.value;
});

gridHeight.addEventListener("input", () => {
  heightValue.innerHTML =
    gridHeight.value < 9 ? `0${gridHeight.value}` : gridHeight.value;
});

window.onload = () => {
  gridWidth.value = 0;
  gridHeight.value = 0;
};
