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
var gDotFlag = false;
var gShape = 'Circles'
var gWidth = 12;

function init() {
    gCanvas = document.getElementById('myCanvas');
    gCtx = gCanvas.getContext('2d');
    // canvas = document.getElementById('can');
    //     ctx = canvas.getContext("2d");
    gCtx.canvas.width = window.innerWidth - 30;
    gCtx.canvas.height = window.innerHeight - 30 ;
    // let w = gCanvas.width;
    // let h = gCanvas.height;
    gWidth = document.querySelector('#size').value
    console.log(gWidth)
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
}
function findxy(res, ev) {
    gCtx.strokeStyle = document.querySelector('#storke').value;
    gCtx.fillStyle = document.querySelector('#fill').value;

    if (res == 'down') {
        gPrevX = gCurrX;
        gPrevY = gCurrY;
        gCurrX = ev.clientX - gCanvas.offsetLeft;
        gCurrY = ev.clientY - gCanvas.offsetTop;

        gFlag = true;
        gDotFlag = true;
        // if (gDotFlag) {
        //     console.log(gDotFlag)
        //     gCtx.beginPath();
        //     gCtx.fillStyle = gStrokeColor;
        //     gCtx.fillRect(gCurrX, gCurrY, 2, 2);
        //     gCtx.closePath();
        //     gDotFlag = false;
        // }
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
            switch(gShape){
                case 'Circles':
                    drawArcs(finalSize + 20)
                    break;
                case 'Rects':
                    drawRects(finalSize +20)
                    break;
                default:
                    draw()
                    break;
            }
        }
    }
}

function onChangeShpae(value){
    gShape = value
    console.log(gShape)
}

function onChangeSize(value){
    console.log(value);
    gWidth = value
}

function draw() {
    gCtx.beginPath();
    gCtx.moveTo(gPrevX, gPrevY);
    gCtx.lineTo(gCurrX, gCurrY);
    gCtx.lineWidth = gWidth;
    gCtx.stroke();
    gCtx.closePath();
}

function drawRects(size = 20) {
    gCtx.beginPath();
    gCtx.rect(gCurrX, gCurrY, size, size); /// x, y, width, height
    gCtx.stroke();
    gCtx.fillRect(gCurrX, gCurrY, size, size); /// x, y, width, height
}

function drawArcs(size = 20) {
    gCtx.beginPath();
    gCtx.lineWidth = gWidth;
    gCtx.arc(gCurrX, gCurrY, size/2, 0, 2 * Math.PI); /// x, y, radius, startAngle, endAngle
    gCtx.stroke();
    gCtx.fill();

}

function onClear(){
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);

}

function onDownload(){
    document.querySelector('.download').click()
}

function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL();
    console.log(data); /// show base64 string
    elLink.href = data;
    elLink.download = 'my-image.jpg';
}


//     // PART 1
//     drawLine(10, 10, 130, 230);

//     // PART 2
//     drawTriangle(50, 250);

//     // PART 3
//     drawRect(250, 30);

//     // PART 4
//     drawArc(330, 310);

//     // PART 5 
//     drawText('HOLLA!', 225, 225);

//     // PATR 6
//     clearCanvas();

//     // PART 7
//     // saveAndRestoreExample();

//     // PART 8
//     // drawImg();

//     // PART 9
//     // drawImg2();

//     // PART 10
//     // resizeCanvas();

//     // PART 11
//      window.addEventListener('resize', function(){
//         // gCanvas.width = window.innerWidth;
//         // gCanvas.height = window.innerHeight;
//         resizeCanvas()
//     })

//     // PART 12 
//     // click on canvas

//     // PART 13 - Tainted canvas when download
//     // drawImg3();
// }

// function drawLine(x, y, xEnd = 250, yEnd = 250) {
//     gCtx.beginPath();
//     gCtx.moveTo(x, y);
//     gCtx.lineTo(xEnd, yEnd);
//     gCtx.strokeStyle = 'red';
//     gCtx.stroke();
// }

// function drawTriangle(x, y) {
//     gCtx.beginPath();
//     gCtx.moveTo(x, y);
//     gCtx.lineTo(130, 330);
//     gCtx.lineTo(50, 370);
//     // gCtx.lineTo(x,y);
//     gCtx.closePath();  //insted of lineTo(x,y) 
//     gCtx.strokeStyle = 'blue';
//     gCtx.stroke();
//     gCtx.fillStyle = 'hotpink';
//     gCtx.fill();
// }

// function drawRect(x, y) {
//     gCtx.beginPath();
//     gCtx.rect(x, y, 150, 150); /// x, y, width, height
//     gCtx.strokeStyle = 'black';
//     gCtx.stroke();
//     gCtx.fillStyle = 'orange';
//     gCtx.fillRect(x, y, 150, 150); /// x, y, width, height
// }

// function drawArc(x, y) {
//     gCtx.beginPath();
//     gCtx.lineWidth = '6';
//     gCtx.arc(x, y, 60, 0, 2 * Math.PI); /// x, y, radius, startAngle, endAngle
//     gCtx.strokeStyle = 'white';
//     gCtx.stroke();
//     gCtx.fillStyle = 'blue';
//     gCtx.fill();

// }

// function drawText(text, x, y) {
//     gCtx.lineWidth = '2';
//     gCtx.strokeStyle = 'red';
//     gCtx.fillStyle = 'white';
//     gCtx.font = '40px Ariel';
//     gCtx.textAlign = 'center';
//     gCtx.fillText(text, x, y);
//     gCtx.strokeText(text, x, y);
// }

// function saveAndRestoreExample() {
//     gCtx.lineWidth = '2';
//     gCtx.font = '40px Ariel';
//     gCtx.strokeStyle = 'red';
//     gCtx.fillStyle = 'white';
//     drawText('before save', 100, 60);
//     gCtx.save();
//     drawText('after save', 100, 160)
//     gCtx.strokeStyle = 'black';
//     gCtx.fillStyle = 'red';
//     drawText('after save and change', 20, 260);
//     gCtx.restore();
//     drawText('after restore', 100, 360);
// }

// function clearCanvas() {
//     gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
//     // You may clear part of the canvas
//     // gCtx.clearRect(0, 0, gCanvas.width / 2, gCanvas.height / 2);
// }

// function drawImg() {
//     const elImg = document.querySelector('img');
//     gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height);
// }

// function drawImg2() {
//     const img = new Image();
//     img.onload = () => {
//         gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
//     }
//     img.src = './img/1.jpg';
// }

// function drawImg3() {
//     const img = new Image();
//     img.onload = () => {
//         gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height); //img,x,y,width,height
//     }
//     img.src = 'https://steamuserimages-a.akamaihd.net/ugc/940586530515504757/CDDE77CB810474E1C07B945E40AE4713141AFD76/';
// }

// function downloadCanvas(elLink) {
//     const data = gCanvas.toDataURL();
//     console.log(data); /// show base64 string
//     elLink.href = data;
//     elLink.download = 'my-image.jpg';
// }

// function resizeCanvas() {
//     const elContainer = document.querySelector('.canvas-container');
//     // Note: changing the canvas dimension this way clears the canvas
//     gCanvas.width = elContainer.offsetWidth;
//     gCanvas.height = elContainer.offsetHeight;
// }


// function setShape(shape) {
//     gCurrShape = shape;
// }
// var x = {
//     name: 'popo',
//     balance: 15
// }
// function draw(ev) {
//     const { offsetX, offsetY } = ev;
//     // const offsetX = ev.offsetX;
//     // const offsetY = ev.offsetY;
//     console.log(offsetX, offsetY);

//     switch (gCurrShape) {
//         case 'triangle':
//             drawTriangle(offsetX, offsetY);
//             break;
//         case 'rect':
//             drawRect(offsetX, offsetY);
//             break;
//         case 'text':
//             drawText('Puki', offsetX, offsetY);
//             break;
//         case 'line':
//             drawLine(offsetX, offsetY);
//             break;
//     }
// }




