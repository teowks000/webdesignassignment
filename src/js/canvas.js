const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const { innerHeight: WEBVIEW_HEIGHT, innerWidth: WEBVIEW_WIDTH } = window;
const RADIUS = Math.sqrt(WEBVIEW_HEIGHT ** 2 + WEBVIEW_WIDTH ** 2);

const ORANGE = "#ff7b25";
const YELLOW = "#feb236";

canvas.height = WEBVIEW_HEIGHT;
canvas.width = WEBVIEW_WIDTH;

context.beginPath();
context.moveTo(0, 0);
context.lineTo(0, WEBVIEW_HEIGHT * 0.35);
context.arcTo(
  WEBVIEW_WIDTH * 0.5,
  WEBVIEW_HEIGHT * 0.45,
  WEBVIEW_WIDTH,
  WEBVIEW_HEIGHT * 0.35,
  RADIUS
);
context.lineTo(WEBVIEW_WIDTH, 0);

const gradient = context.createLinearGradient(0, 0, WEBVIEW_WIDTH, 0);
gradient.addColorStop(0, YELLOW);
gradient.addColorStop(0.75, ORANGE);

context.strokeStyle = "#fff";
context.fillStyle = gradient;
context.fill(); // 0, 0, WEBVIEW_WIDTH, WEBVIEW_HEIGHT * 0.35);

context.stroke();
