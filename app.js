const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.querySelectorAll('.jsColor');
const range = document.querySelector('#jsRange');
const mode = document.querySelector('#jsMode');

const CANVAS_SIZE = 700;
const INITAIL_COLOR = '#2c2c2c';

//canvas pixel을 그리기 위한 캔버스의 물리적인(?) 사이즈 정의
canvas.width    = CANVAS_SIZE;
canvas.height   = CANVAS_SIZE;

ctx.strokeStyle = INITAIL_COLOR;
ctx.fillStyle = INITAIL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function startpainting(){
    painting = true;
}

function stopPainting(){
    painting = false;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;

    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    }else{
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleColorClick(event){
    const bgColor = event.target.style.backgroundColor;
    ctx.strokeStyle = bgColor;
    ctx.fillStyle = bgColor;
}

function handelRangeValue(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick(event){
    (event.target.innerText.toUpperCase() === 'FILL'.toUpperCase()) ? event.target.innerText = 'PAINT' : event.target.innerText = 'FILL';
    filling = (filling === true) ? false : true;
}

function handleCanvasClick(){
    if (filling === true) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }

}

if (canvas) {
    canvas.addEventListener('mousemove',onMouseMove);
    canvas.addEventListener('mousedown',startpainting);
    canvas.addEventListener('mouseup',stopPainting);
    canvas.addEventListener('mouseleave',stopPainting);
    canvas.addEventListener('click',handleCanvasClick);
}

colors.forEach(color => 
    color.addEventListener('click', handleColorClick)
);

if (range) {
    range.addEventListener('input',handelRangeValue);
}

if (mode) {
    mode.addEventListener('click', handleModeClick);
}
