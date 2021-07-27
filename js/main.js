'use strict';
var gCanvas;
var gCurrShape = 'triangle';
var gCanvas
var gCtx
var gFlag = false
var gPrevX = 0
var gCurrX = 0
var gPrevY = 0
var gCurrY = 0
var gShape = 'Circles'
var gWidth = 12;


function init() {
    if (window.innerWidth < 670) arrangeMenu()
    gCanvas = document.getElementById('myCanvas');
    gCtx = gCanvas.getContext('2d');
    gCtx.canvas.width = window.innerWidth - 30;
    gCtx.canvas.height = window.innerHeight - 30;
    gWidth = document.querySelector('#size').value
    gCanvas.addEventListener("mousemove", function (ev) {
        findxy('move', ev)
    }, false);
    gCanvas.addEventListener("mousedown", function (ev) {
        findxy('down', ev)
    }, false);
    gCanvas.addEventListener("mouseup", function (ev) {
        findxy('up', ev)
    }, false);
    gCanvas.addEventListener("mouseout", function (ev) {
        findxy('out', ev)
    }, false);
    gCanvas.addEventListener("touchstart", function (ev) {
        findxyTouch('touchst', ev)
    }, false);
    gCanvas.addEventListener("touchend", function (ev) {
        findxyTouch('touchend', ev)
    }, false);
    gCanvas.addEventListener("touchmove", function (ev) {
        findxyTouch('touchmv', ev)
    }, false);
}

function findxyTouch(res, ev) {
    ev.preventDefault()
    gCtx.strokeStyle = document.querySelector('#stroke').value;
    gCtx.fillStyle = document.querySelector('#fill').value;
    if (res === 'touchst') {
        gPrevX = gCurrX;
        gPrevY = gCurrY;
        gCurrX = ev.touches[0].clientX - gCanvas.offsetLeft;
        gCurrY = ev.touches[0].clientY - gCanvas.offsetTop;
        gFlag = true;
    }
    if (res === 'touchend') {
        gFlag = false;
    }
    if (res === 'touchmv') {
        if (gFlag) {
            gPrevX = gCurrX;
            gPrevY = gCurrY;
            gCurrX = ev.touches[0].clientX - gCanvas.offsetLeft;
            gCurrY = ev.touches[0].clientY - gCanvas.offsetTop;
            let sizeX = Math.abs(gPrevX - gCurrX)
            let sizeY = Math.abs(gPrevY - gCurrY)
            let finalSize = sizeX > sizeY ? sizeX : sizeY
            switch (gShape) {
                case 'Circles':
                    drawArcs(finalSize + 20)
                    break;
                case 'Rects':
                    drawRects(finalSize + 20)
                    break;
                default:
                    draw()
                    break;
            }
        }
    }
}

function findxy(res, ev) {
    gCtx.strokeStyle = document.querySelector('#stroke').value;
    gCtx.fillStyle = document.querySelector('#fill').value;
    if (res == 'down') {
        const canvas = document.querySelector("#myCanvas");
        const modal = document.querySelector(".about-modal");
        canvas.onclick = function (event) {
            if (event.target !== modal) {
                if (!modal.classList.contains('hide')) modal.classList.add("hide");
            }
        }
        gPrevX = gCurrX;
        gPrevY = gCurrY;
        gCurrX = ev.clientX - gCanvas.offsetLeft;
        gCurrY = ev.clientY - gCanvas.offsetTop;
        gFlag = true;
    }
    if (res == 'up' || res == "out") {
        gFlag = false;
    }
    if (res == 'move') {
        if (gFlag) {
            gPrevX = gCurrX;
            gPrevY = gCurrY;
            gCurrX = ev.clientX - gCanvas.offsetLeft;
            gCurrY = ev.clientY - gCanvas.offsetTop;
            let sizeX = Math.abs(gPrevX - gCurrX)
            let sizeY = Math.abs(gPrevY - gCurrY)
            let finalSize = sizeX > sizeY ? sizeX : sizeY
            switch (gShape) {
                case 'Circles':
                    drawArcs(finalSize +25 )
                    break;
                case 'Rects':
                    drawRects(finalSize )
                    break;
                default:
                    draw()
                    break;
            }
        }
    }
}

function arrangeMenu() {
    document.querySelector('.stroke-label').style.display = "none"
    document.querySelector('.fill-label').style.display = "none"
    document.querySelector('.size-label').style.display = "none"

}

function onAbout() {
    const modal = document.querySelector(".about-modal");
    modal.classList.remove('hide')
}
function closeModal() {
    const modal = document.querySelector(".about-modal");
    modal.classList.add('hide')
}

function onChangeShpae(value) {
    gShape = value
}

function onChangeSize(value) {
    gWidth = value
}

function draw() {
    gCtx.beginPath();
    gCtx.moveTo(gPrevX, gPrevY);
    gCtx.lineTo(gCurrX, gCurrY);
    gCtx.lineWidth = gWidth > 4 ? 4 : gWidth;
    gCtx.stroke();
    gCtx.closePath();
    gCtx.lineWidth = gWidth
}

function drawRects(size = 20) {
    gCtx.beginPath();
    gCtx.rect(gCurrX, gCurrY, size, size); /// x, y, width, height
    gCtx.lineWidth = gWidth;
    gCtx.stroke();
    gCtx.fillRect(gCurrX, gCurrY, size, size); /// x, y, width, height
}

function drawArcs(size = 20) {
    gCtx.beginPath();
    gCtx.lineWidth = gWidth;
    gCtx.arc(gCurrX, gCurrY, size / 2, 0, 2 * Math.PI); /// x, y, radius, startAngle, endAngle
    gCtx.stroke();
    gCtx.fill();

}

function onClear() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
}

function onDownload() {
    document.querySelector('.download').click()
}

function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my-image.jpg';
}



