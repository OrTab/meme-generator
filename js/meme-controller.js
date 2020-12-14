'use strict'


var gCanvas;
var gCtx;
var gDrag;


function onInit() {
    gCanvas = document.getElementById('my-canvas')
    gCtx = gCanvas.getContext('2d')
    imgsKeyWords()
    renderKeyWords()
}

function onChangeFontSize(size) {
    changeFontSize(size)
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
    renderMeme()
}

function onSetNewLine() {
    setNewLine(gCanvas.height)
    renderMeme()
}

function onDeleteLine() {
    deleteLine()
    renderMeme()
}

function onCreateMeme(imgId) {
    createMeme(imgId, gCanvas.height)
    renderCanvas(imgId)
    updateCanvasSizes()
    renderMeme()

}

function onChangeStrokeWidth(strokeWidth) {
    var strokeWidthSpan = document.querySelector('.strokeWidth')
    strokeWidthSpan.innerText = strokeWidth
    changeStrokeWidth(strokeWidth)
    renderMeme()
}

function onChangeTxt(txt) {
    setChangeTxt(txt)
    renderMeme()
}

function updateCanvasSizes() {
    setLinesCords(gCanvas.width)
}

function renderGallery(ev, imgs) {
    var elBtnGallery = document.querySelector('.moveToGallery-btn')
    elBtnGallery.style.display = 'none'
    ev.preventDefault()
    var elMemeContainer = document.querySelector('.main-container')
    elMemeContainer.style.display = 'none';
    if (!imgs) imgs = getImgs()
    var strHtmls = imgs.map(img => {
        return `<img  onclick="onCreateMeme(${img.id})" src="${img.url}"/>`
    })
    var ElMaingallery = document.querySelector('.main-gallery')
    ElMaingallery.style.display = 'block'
    var elGalleryContainer = document.querySelector('.gallery-container')
    elGalleryContainer.innerHTML = strHtmls.join('')
    elGalleryContainer.style.display = 'grid'

}

function renderCanvas(imgId) {
    var currImg = findImgById(imgId)
    var img = new Image();
    img.src = currImg.url
    gCanvas.width = img.width
    gCanvas.height = img.height
    gCtx.drawImage(img, 0, 0);
    gCtx.imageSmoothingQuality = 'high'
    var elMemeContainer = document.querySelector('.main-container')
    elMemeContainer.style.display = 'flex';
    var elGalleryContainer = document.querySelector('.main-gallery')
    elGalleryContainer.style.display = 'none'
    gCanvas.classList.add('shadow')
}


function renderMeme() {
    var currMeme = getMeme()
    if (!currMeme) window.location = 'index.html'
    var currLine = currMeme.lines[currMeme.lineIdx]
    renderCanvas(currMeme.imgId)
    var elTxtInput = document.querySelector('.meme-txt')
    elTxtInput.value = (currLine.txt !== 'Create Your Meme') ? currLine.txt : ''
    currMeme.lines.forEach(line => {
        checkAlign()
        if (!currMeme.lines.length) return
        gCtx.lineWidth = line.strokeWidth
        gCtx.font = `${line.fontSize}px ${line.fontStyle} `
        gCtx.strokeStyle = line.strokeColor
        gCtx.fillStyle = line.fillColor
        gCtx.textBaseline = "bottom"
        gCtx.fillText(line.txt, line.offsetX, line.offsetY)
        gCtx.strokeText(line.txt, line.offsetX, line.offsetY)
    })
    drawRect()
}

function checkIfTextLineClicked(ev) {
    var currMeme = getMeme()
    var bounds = gCanvas.getBoundingClientRect();
    var mouseX = ev.offsetX;
    var mouseY = ev.offsetY
    mouseX /= bounds.width
    mouseY /= bounds.height
    mouseX *= gCanvas.width
    mouseY *= gCanvas.height
    currMeme.lines.forEach((currLine, idx) => {
        var text = gCtx.measureText(currLine.txt)

        switch (currLine.align) {
            case 'left':
                if (mouseY > currLine.offsetY - currLine.fontSize - 10 && mouseY < currLine.offsetY + 10 && mouseX > currLine.offsetX && mouseX < currLine.offsetX + text.width) {
                    currMeme.lineIdx = idx
                    gDrag = true
                    gCanvas.classList.add('pointer')
                    gCanvas.addEventListener('mousemove', dragNdrop)
                    renderMeme()
                }
                break;
            case 'right':
                if (mouseY > currLine.offsetY - currLine.fontSize - 10 && mouseY < currLine.offsetY + 10 && mouseX < currLine.offsetX && mouseX > currLine.offsetX - text.width) {
                    currMeme.lineIdx = idx
                    gDrag = true
                    gCanvas.classList.add('pointer')
                    gCanvas.addEventListener('mousemove', dragNdrop)
                    renderMeme()
                }
                break;
            case 'center':

                if (mouseY > currLine.offsetY - currLine.fontSize - 10 && mouseY < currLine.offsetY + 10 && (mouseX < currLine.offsetX && mouseX > currLine.offsetX - text.width / 2 - 10 || mouseX > currLine.offsetX && mouseX < currLine.offsetX + text.width / 2 + 10)) {
                    currMeme.lineIdx = idx
                    gDrag = true
                    gCanvas.classList.add('pointer')
                    gCanvas.addEventListener('mousemove', dragNdrop)
                    renderMeme()
                }
                break;
        }
    })
}

function dragNdrop(ev) {
    focusInput()
    if (ev.type === 'mouseup') {
        gDrag = false
        gCanvas.classList.remove('pointer')
    }
    if (!gDrag) return
    var meme = getMeme()
    var currLine = meme.lines[meme.lineIdx]
    var bounds = gCanvas.getBoundingClientRect();
    var mouseX = ev.offsetX;
    var mouseY = ev.offsetY
    mouseX /= bounds.width
    mouseY /= bounds.height
    mouseX *= gCanvas.width
    mouseY *= gCanvas.height
    currLine.offsetX = mouseX
    currLine.offsetY = mouseY
    renderMeme()
}

function drawRect() {
    var currMeme = getMeme()
    var currLine = currMeme.lines[currMeme.lineIdx]
    var text = gCtx.measureText(currLine.txt)
    if (!currMeme.isMark) return
    gCtx.beginPath()
    gCtx.strokeStyle = 'black'
    switch (currLine.align) {
        case 'left':
            gCtx.rect(currLine.offsetX - 15, currLine.offsetY + 15, text.width + 30, -currLine.fontSize - 22)
            break;
        case 'right':
            gCtx.rect(currLine.offsetX + 15, currLine.offsetY + 15, -text.width - 30, -currLine.fontSize - 22)
            break;
        case 'center':
            gCtx.rect((currLine.offsetX - text.width / 2) - 15, currLine.offsetY + 15, text.width + 30, -currLine.fontSize - 22)
            break;
    }
    gCtx.setLineDash([20, 8])
    gCtx.stroke()
}

function checkAlign() {
    var meme = getMeme()
    meme.lines.forEach(line => {
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
    })
}

function downloadImg(elLink) {
    var currMeme = getMeme()
    currMeme.isMark = false
    renderMeme()
    var imgContent = gCanvas.toDataURL('image/jpeg');
    elLink.href = imgContent
    currMeme.isMark = true
    renderMeme()
}

function renderKeyWords() {
    var keywords = getkeywords()
    var strHtmls = ''
    for (var k in keywords) {
        strHtmls += `<button style="font-size:${keywords[k]}px;" onclick="onKeywordClick(event,'${k}')">${k}</button>`
    }
    strHtmls += `<input oninput="filterKeywords(event,this.value)" type="text" placeholder="Type To Filter">`

    var elImgKeysContainer = document.querySelector('.img-keys')
    elImgKeysContainer.innerHTML = strHtmls
}

function onKeywordClick(ev, keyword) {
    updateKeywordPopularity(keyword)
    showkeywords()
    var imgs = imgsForDisplay(keyword, false)
    renderGallery(ev, imgs)
    renderKeyWords()
}

function focusInput() {
    var elInput = document.querySelector('input')
    elInput.focus()

}


function showkeywords() {
    var elImgKeysContainer = document.querySelector('.img-keys')
    elImgKeysContainer.classList.toggle('open')
}

function filterKeywords(ev, key) {
    var imgs = imgsForDisplay(key.toLowerCase(), true)
    renderGallery(ev, imgs)

}