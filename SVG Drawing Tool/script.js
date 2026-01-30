const svgCanvas = document.getElementById("svgCanvas");
const colorPicker = document.getElementById("colorPicker");
const undoBtn = document.getElementById("undoBtn");

let isDrawing = false;
let currentPath = null;
let paths = [];

// Start drawing on mouse down
svgCanvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  const color = colorPicker.value;

  // Create a new path element
  currentPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  currentPath.setAttribute("stroke", color);
  currentPath.setAttribute("stroke-width", 3);
  currentPath.setAttribute("fill", "none");
  currentPath.setAttribute("d", `M ${e.offsetX} ${e.offsetY}`);

  svgCanvas.appendChild(currentPath);
  paths.push(currentPath);
});

// Draw as mouse moves
svgCanvas.addEventListener("mousemove", (e) => {
  if (!isDrawing) return;
  const d = currentPath.getAttribute("d");
  currentPath.setAttribute("d", `${d} L ${e.offsetX} ${e.offsetY}`);
});

// Stop drawing on mouse up or leave
svgCanvas.addEventListener("mouseup", () => {
  isDrawing = false;
  currentPath = null;
});
svgCanvas.addEventListener("mouseleave", () => {
  isDrawing = false;
  currentPath = null;
});

// Undo last path
undoBtn.addEventListener("click", () => {
  if (paths.length === 0) return;
  const lastPath = paths.pop();
  svgCanvas.removeChild(lastPath);
});
