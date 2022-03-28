import {
  setDrawing,
  setStartX,
  setStartY,
  setErase,
} from "./store/CanvasStore";

export function drawOnCanvas(context, startX, startY, currentX, currentY) {
  context.current.fillStyle = "rgb(255, 255, 255)";
  context.current.beginPath();
  context.current.moveTo(startX, startY);
  context.current.lineTo(currentX, currentY);
  context.current.stroke();
}

export function setLineWidth(context, n) {
  context.current.lineWidth = n;
}

export function setPaintColor(context, color) {
  context.current.strokeStyle = color;
}

export function setStartPositon(dispatch, coordinates) {
  dispatch(setDrawing(true));
  dispatch(setStartX(coordinates.offsetX));
  dispatch(setStartY(coordinates.offsetY));
}

export function stopDrawing(dispatch) {
  dispatch(setDrawing(false));
}

export function selectPen(dispatch) {
  dispatch(setErase(false));
}

export function selectEraser(dispatch) {
  dispatch(setErase(true));
}

export function eraseOnCanvas(context, currentX, currentY) {
  context.current.fillStyle = "rgb(255, 255, 255)";
  context.current.fillRect(currentX, currentY, 20, 20);
}

export function clearCanvas(context, canvas) {
  context.current.clearRect(0, 0, canvas.width, canvas.height);
  // dispatch(setErase(false));
}
