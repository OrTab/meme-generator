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
        // renderMeme(350,52)
}

function onSetNewLine() {
    setNewLine()
}

function onDeleteLine(ev) {
    deleteLine()
    renderMeme()
}

function onCreateMeme(imgId) {
    createMeme(imgId)
    renderCanvas(imgId)
    updateCanvasSizes()
}

function onChangeTxt(ev, txt) {
    // var regex = /[-!$%^&*()_+|~=`{}[:;<>?,.@#\]]/g
    // var key = regex.exec(txt)
    // if (key) txt = key.input
    setChangeTxt(ev, txt)
    renderMeme()
        // renderMeme(ev, 350, 52)
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
    // gCtx.imageSmoothingEnabled = false;
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
        // updateCanvasSizes()

    if (!currMeme.lines.length) return
    gCtx.textAlign = currLine.align
    gCtx.lineWidth = currLine.fontWidth
    gCtx.font = `${currLine.fontSize}px ${currLine.fontStyle} `
    gCtx.strokeStyle = currLine.strokeColor
    gCtx.fillStyle = currLine.fillColor
    gCtx.fillText(currLine.txt, currLine.x, currLine.y)
    gCtx.strokeText(currLine.txt, currLine.offsetX, currLine.offsetY)
}


function canvasCord(ev) {
    console.log(ev);
}