'use strict'


var gCanvas;
var gCtx;



function onInit() {
    gCanvas = document.getElementById('my-canvas')
    gCtx = gCanvas.getContext('2d')

}

function onChangeFontSize(size) {
    changeFontSize(size)
    updateCanvasSizes()
    renderMeme()
    drawRect()

}

function onChangeFont(font) {
    changeFont(font)
    renderMeme()
}

function onChangeAlign(direc) {
    changeAlign(direc)
    updateCanvasSizes()
    renderMeme()

}

function onChangeStrokeColor(strokeColor) {
    changeStrokeColor(strokeColor)
    renderMeme()
}

function onChangeFillColor(fillColor) {
    changeFillColor(fillColor)
    renderMeme()
}

function onChangeLine() {
    changeLine()
}

function onSetNewLine() {
    setNewLine()
}

function onDeleteLine() {
    deleteLine()
    renderMeme()
}

function onCreateMeme(imgId) {
    createMeme(imgId)
    renderCanvas(imgId)
    updateCanvasSizes()
    renderMeme()

}

function onChangeTxt(txt) {
    setChangeTxt(txt)
    renderMeme()
}



function renderGallery(ev) {
    ev.preventDefault()
    var elMemeContainer = document.querySelector('.main-container')
    elMemeContainer.style.display = 'none';
    var imgs = getImgs()
    var strHtmls = imgs.map(img => {
        return `<img  onclick="onCreateMeme(${img.id})" src="${img.url}"/>`
    })
    var elGalleryContainer = document.querySelector('.gallery-container')
    elGalleryContainer.innerHTML = strHtmls.join('')
    elGalleryContainer.style.display = 'grid'

}


function renderCanvas(imgId) {
    var currImg = findImgById(imgId)
    var img = new Image();
    img.src = currImg.url

    gCanvas.width = img.width;
    gCanvas.height = img.height;
    gCtx.drawImage(img, 0, 0);
    var elMemeContainer = document.querySelector('.main-container')
    elMemeContainer.style.display = 'flex';
    var elGalleryContainer = document.querySelector('.gallery-container')
    elGalleryContainer.style.display = 'none'
    gCanvas.style.border = 'none'
}

function updateCanvasSizes() {
    setCanvasSizes(gCanvas.width, gCanvas.height)
}


function renderMeme() {

    var currMeme = getMeme()
    var currLine = currMeme.lines[currMeme.lineIdx]
    renderCanvas(currMeme.imgId)
    checkAlign(currLine)
    if (!currMeme.lines.length) return
    gCtx.lineWidth = currLine.fontWidth
    gCtx.font = `${currLine.fontSize}px ${currLine.fontStyle} `
    gCtx.strokeStyle = currLine.strokeColor
    gCtx.fillStyle = currLine.fillColor
    gCtx.fillText(currLine.txt, currLine.x, currLine.y)
    gCtx.strokeText(currLine.txt, currLine.offsetX, currLine.offsetY)
    drawRect()
}


function canvasCord(ev) {
    console.log(ev);
}


function drawRect() {
    var currMeme = getMeme()
    var currLine = currMeme.lines[currMeme.lineIdx]
    var text = gCtx.measureText(currLine.txt)
    gCtx.beginPath()
    gCtx.strokeStyle = 'black'
    var align = checkAlign(currLine)
    switch (align) {
        case 'left':
            gCtx.rect(currLine.offsetX - 20, currLine.offsetY + 20, text.width + 30, -currLine.fontSize - 20)
            break;
        case 'right':
            gCtx.rect(currLine.offsetX + 20, currLine.offsetY + 20, -text.width - 80, -currLine.fontSize - 20)
            break;
        case 'center':
            gCtx.rect((currLine.offsetX - text.width / 2) - 20, currLine.offsetY + 20, text.width + 30, -currLine.fontSize - 20)
            break;

    }
    gCtx.setLineDash([20, 8])
        // gCtx.lineWidth = '50px'
    gCtx.stroke()
}


function checkAlign(line) {
    if (line.align === 'right') {
        gCtx.direction = 'rtl'
        gCtx.textAlign = 'right'
        return 'right'
    }
    if (line.align === 'left') {
        gCtx.direction = 'ltr'
        gCtx.textAlign = 'left'
        return 'left'

    }
    if (line.align = 'center') {
        gCtx.direction = 'inherit'
        gCtx.textAlign = 'center'
        return 'center'
    }
}