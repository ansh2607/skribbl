import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStartX, setStartY } from "../store/CanvasStore";
import {
  drawOnCanvas,
  changeLineWidth,
  changePenColor,
  setStartPositon,
  stopDrawing,
  selectPen,
  selectEraser,
  eraseOnCanvas,
  clearCanvas,
} from "../CanvasServices";

export default function Canvas() {
  const dispatch = useDispatch();
  const { socket } = useSelector((state) => state.PlayerStore);
  const { roomId } = useSelector((state) => state.GameStore);
  const {
    drawing,
    erase,
    startX,
    startY,
    penColor,
    backgroundColor,
    lineWidth,
  } = useSelector((state) => state.CanvasStore);

  let batch = [];
  let isRequestTimed = false;

  const canvasRef = useRef(null);
  const context = useRef(null);

  function sendDrawCommand(command, currentX, currentY, color, lineWidth) {
    batch.push([command, startX, startY, currentX, currentY, color, lineWidth]);
    if (!isRequestTimed) {
      setTimeout(() => {
        socket.emit("canvas-draw", batch, roomId);
        isRequestTimed = false;
        batch = [];
      }, 50);
      isRequestTimed = true;
    }
  }

  function userDraw(e) {
    const currentX = e.nativeEvent.offsetX;
    const currentY = e.nativeEvent.offsetY;

    if (drawing) {
      if (erase) {
        eraseOnCanvas(context, currentX, currentY, backgroundColor);
        sendDrawCommand(1, currentX, currentY, backgroundColor, lineWidth);
      } else {
        drawOnCanvas(
          context,
          startX,
          startY,
          currentX,
          currentY,
          penColor,
          lineWidth
        );
        sendDrawCommand(0, currentX, currentY, penColor, lineWidth);
        dispatch(setStartX(currentX));
        dispatch(setStartY(currentY));
      }
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = penColor;
    ctx.strokeStyle = penColor;
    ctx.lineWidth = lineWidth;
    context.current = ctx;

    const drawFromServer = (commands) => {
      commands.forEach((command) => {
        if (command[0] === 0) {
          drawOnCanvas(
            context,
            command[1],
            command[2],
            command[3],
            command[4],
            command[5],
            command[6]
          );
        } else if (command[0] === 1) {
          eraseOnCanvas(context, command[3], command[4], command[5]);
        } else if (command[0] === 2) {
          clearCanvas(context, canvasRef.current);
        }
      });
    };

    socket.on("canvas-draw", drawFromServer);
  }, [socket]);

  return (
    <div className="canvas-container">
      <canvas
        id="drawing-area"
        height="500"
        width="500"
        ref={canvasRef}
        onMouseDown={(e) => setStartPositon(dispatch, e.nativeEvent)}
        onMouseMove={(e) => userDraw(e)}
        onMouseUp={() => stopDrawing(dispatch)}
      />
      <div className="canvas-container__tools">
        <div className="canvas-container__tools__basic">
          <div
            className="tool pencil"
            id="tool_pencil"
            onClick={() => selectPen(dispatch)}
          >
            Pencil
          </div>
          <div
            className="tool stroke1"
            onClick={() => changeLineWidth(dispatch, 1)}
          >
            1
          </div>
          <div
            className="tool stroke2"
            onClick={() => changeLineWidth(dispatch, 3)}
          >
            2
          </div>
          <div
            className="tool stroke3"
            onClick={() => changeLineWidth(dispatch, 5)}
          >
            3
          </div>
          <div className="tool eraser" onClick={() => selectEraser(dispatch)}>
            Eraser
          </div>
          <div
            className="tool clear"
            onClick={() => {
              clearCanvas(context, canvasRef.current);
              sendDrawCommand(2, 0, 0, "rgb(255,255,255)", 0);
            }}
          >
            Clear
          </div>
        </div>
        <div className="tool color-picker">
          <div
            className="tool paint-red"
            onClick={() => changePenColor(dispatch, "rgb(255, 0, 0)")}
          ></div>
          <div
            className="tool paint-black"
            onClick={() => changePenColor(dispatch, "rgb(0, 0, 0)")}
          ></div>
          <div
            className="tool paint-blue"
            onClick={() => changePenColor(dispatch, "rgb(0, 0, 255)")}
          ></div>
          <div
            className="tool paint-green"
            onClick={() => changePenColor(dispatch, "rgb(0, 156, 0)")}
          ></div>
          <div
            className="tool paint-yellow"
            onClick={() => changePenColor(dispatch, "rgb(255, 255, 0)")}
          ></div>
          <div
            className="tool paint-orange"
            onClick={() => changePenColor(dispatch, "rgb(255, 128, 0)")}
          ></div>
          <div
            className="tool paint-magenta"
            onClick={() => changePenColor(dispatch, "rgb(255, 0, 255)")}
          ></div>
        </div>
      </div>
    </div>
  );
}
