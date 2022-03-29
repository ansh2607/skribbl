import {
  setDrawing,
  setStartX,
  setStartY,
  setErase,
  setPenColor,
  setLineWidth,
} from "./store/CanvasStore";

export function drawOnCanvas(
  context,
  startX,
  startY,
  currentX,
  currentY,
  color,
  width
) {
  context.current.fillStyle = color;
  context.current.strokeStyle = color;
  context.current.beginPath();
  context.current.moveTo(startX, startY);
  context.current.lineTo(currentX, currentY);
  context.current.lineWidth = width;
  context.current.stroke();
}

export function changeLineWidth(dispatch, width) {
  dispatch(setLineWidth(width));
}

export function changePenColor(dispatch, color) {
  dispatch(setPenColor(color));
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

export function eraseOnCanvas(context, currentX, currentY, color) {
  context.current.fillStyle = color;
  context.current.fillRect(currentX, currentY, 20, 20);
}

export function clearCanvas(context, canvas) {
  context.current.clearRect(0, 0, canvas.width, canvas.height);
  // dispatch(setErase(false));
}
