const gridWidth = getComputedStyle(document.body).getPropertyValue("--grid-width");
const accentColor = getComputedStyle(document.body).getPropertyValue("--accent-color");
const inactiveColor = getComputedStyle(document.body).getPropertyValue("--inactive-color");



//this area will conect the .html and the .js


const sketchArea = document.querySelector("#sketchArea");
const slider = document.querySelector("#slider")
const sliderValue = document.querySelector("#slider-value")

const gridToggle = document.querySelector("#grid-toggle");

let squaresPerSide = 16;
let gridVisible = false;

let isDrawing = false;

function toggleGrid() {
    gridVisible = gridVisible ? false : true;
    gridToggle.style.color = gridVisible ? accentColor : inactiveColor;

    removeGridSquares();
    createGridSquares();
}

//this will change the color of the grids

function setBackgroundColor(e) {
    if (e.type === "mousedown") {
        isDrawing = true;
        e.target.style.backgroundColor = getRandomColor();
    }
    else if (e.type === "mouseover" && isDrawing) {
        e.target.style.backgroundColor = getRandomColor();
    }
    else isDrawing = false;
}

// make the grids 

function createGridSquares() {

    const numOfSquares = (squaresPerSide * squaresPerSide);
    let widthOrHeight = 0;
    

    for (let a = 0; a < (numOfSquares); a++) {
        const gridCell = document.createElement("div"); // creates "div"s

        if (gridVisible) {
            widthOrHeight = `${(parseInt(gridWidth) / squaresPerSide)- 2}px`;
            gridCell.style.border = "1px solid whitesmoke";
        } else if (!gridVisible) {
            widthOrHeight = `${(parseInt(gridWidth) / squaresPerSide)}px`;
            gridCell.style.border = "none";
        }

        gridCell.style.width = gridCell.style.height = widthOrHeight;
        
        gridCell.addEventListener("mousedown", (e) => setBackgroundColor(e));
        gridCell.addEventListener("mouseover", (e) => setBackgroundColor(e));
        gridCell.addEventListener("mouseup", (e) => setBackgroundColor(e));

        gridCell.addEventListener("dragstart", (e) => {e.preventDefault()});
        
        sketchArea.appendChild(gridCell);

     

    }
 
}
//this is the function for random color

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  
  
  function setRandomColor() {
    $("#colorpad").css("background-color", getRandomColor());
  }



function removeGridSquares() {
    while (sketchArea.firstChild) {
        sketchArea.removeChild(sketchArea.firstChild);
    }
}

slider.oninput = function () {
    squaresPerSide = this.value;
    sliderValue.textContent = `${this.value} x ${this.value} (Resolution)`;
   
    removeGridSquares();
    createGridSquares();
}


gridToggle.addEventListener("click", toggleGrid);


  
createGridSquares();