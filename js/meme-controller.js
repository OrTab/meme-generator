'use strict'


var gCanvas;
var gCtx;



function onInit() {
    gCanvas = document.getElementById('my-canvas')
    gCtx = gCanvas.getContext('2d')

}



function onSetFont(font) {
    setFont(font)
}

function onSetLineChange() {
    setLineChange()
}

function onSetNewLine() {
    setNewLine()
}

function onDeleteLine() {
    deleteLine()
}



function renderGallery(ev) {
    ev.preventDefault()
    var elMemeContainer = document.querySelector('.main-container')
    elMemeContainer.style.display = 'none';
    var imgs = getImgs()
    var strHtmls = imgs.map(img => {
        return `<img  onclick="renderCanvas(${img.id})" src="${img.url}"/>`
    })
    var elGalleryContainer = document.querySelector('.gallery-container')
    elGalleryContainer.innerHTML = strHtmls.join('')
    elGalleryContainer.style.display = 'grid'

}


function renderCanvas(imgId) {
    var currImg = findImgById(imgId)
    var img = new Image();
    img.src = currImg.url
    img.onload = () => {
        gCanvas.width = img.width;
        gCanvas.height = img.height;
        // gCtx.imageSmoothingEnabled = false;
        gCtx.drawImage(img, 0, 0);
        var elMemeContainer = document.querySelector('.main-container')
        elMemeContainer.style.display = 'flex';
        var elGalleryContainer = document.querySelector('.gallery-container')
        elGalleryContainer.style.display = 'none'
        gCanvas.style.border = 'none'
        createMeme(imgId)
    }
}


function renderMeme(ev, txt, x = 350, y = 52) {
    var currMeme = getMeme()

    // console.log(ev);
    if (!checkKey(ev, txt)) return
    gCtx.font = currMeme.font
    gCtx.textAlign = 'right'
    gCtx.lineWidth = '1.5'
    gCtx.fillText(txt, x, y)
    gCtx.strokeText(txt, x, y)
}

// gCtx.strokeStyle = 'red'
// gCtx.fillStyle = 'white'
// gCtx.font = '40px Ariel'

function canvasCord(ev) {
    console.log(ev);
}

function checkKey(ev, txt, x, y) {
    console.log(ev);
    if (ev.key === 'Backspace') {
        console.log(ev.key);
        var currMeme = getMeme()
        if (!currMeme) return
        currMeme.imgId
        renderCanvas(currMeme.imgId)
        return true
    }
}