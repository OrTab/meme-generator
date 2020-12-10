'use strict'
var gMemes;
var gMeme;

var gImgs = [
    { id: 1, url: 'imgs-canvas/2.jpg', keywords: ['Happy', 'Nature'] },
    { id: 2, url: 'imgs-canvas/003.jpg', keywords: ['Funny', 'Celeb', 'Men', 'Angry'] },
    { id: 3, url: 'imgs-canvas/004.jpg', keywords: ['Love', 'Animals'] },
    { id: 4, url: 'imgs-canvas/005.jpg', keywords: ['Love', 'Animals', 'Sleep'] },
    { id: 5, url: 'imgs-canvas/006.jpg', keywords: ['Funny', 'Succes'] },
    { id: 6, url: 'imgs-canvas/5.jpg', keywords: ['Funny', 'Sleep', 'Animals'] },
    { id: 7, url: 'imgs-canvas/8.jpg', keywords: ['Men', 'Love'] },
    { id: 8, url: 'imgs-canvas/9.jpg', keywords: ['Funny'] },
    { id: 9, url: 'imgs-canvas/12.jpg', keywords: ['Men'] },
    { id: 10, url: 'imgs-canvas/19.jpg', keywords: ['Men', 'Funny', 'Angry'] },
    { id: 11, url: 'imgs-canvas/Ancient-Aliens.jpg', keywords: ['Men', 'Movies', 'Explanation'] },
    { id: 12, url: 'imgs-canvas/drevil.jpg', keywords: ['Victory', 'Funny', 'Men'] },
    { id: 13, url: 'imgs-canvas/img2.jpg', keywords: ['Funny', 'Victory'] },
    { id: 14, url: 'imgs-canvas/img4.jpg', keywords: ['Funny', 'Men', 'Angry', 'Celeb'] },
    { id: 15, url: 'imgs-canvas/img5.jpg', keywords: ['Cute', 'Happy'] },
    { id: 16, url: 'imgs-canvas/img6.jpg', keywords: ['Animals', 'Cute', 'Funny'] },
    { id: 17, url: 'imgs-canvas/img11.jpg', keywords: ['Happy', 'Funny', 'Men', 'Celeb'] },
    { id: 18, url: 'imgs-canvas/img12.jpg', keywords: ['Men', 'Akward'] },
    { id: 19, url: 'imgs-canvas/leo.jpg', keywords: ['Happy', 'Men', 'Celeb'] },
    { id: 20, url: 'imgs-canvas/meme1.jpg', keywords: ['Men', 'Mystery', 'Movies'] },
    { id: 21, url: 'imgs-canvas/One-Does-Not-Simply.jpg', keywords: ['Explanation', 'Men'] },
    { id: 22, url: 'imgs-canvas/Oprah-You-Get-A.jpg', keywords: ['Women', 'Victory', 'Happy', 'Celeb'] },
    { id: 23, url: 'imgs-canvas/patrick.jpg', keywords: ['Akward', 'Funny'] },
    { id: 24, url: 'imgs-canvas/putin.jpg', keywords: ['Men', 'Explantion', 'Celeb'] },
    { id: 25, url: 'imgs-canvas/X-Everywhere.jpg', keywords: ['Explanation', 'Movies'] }
];


function getMeme() {
    return gMeme;
}


function setNewLine() {
    var currLine = gMeme.lines[gMeme.lineIdx]
    var newLine = {...currLine }
    newLine.txt = ''
    if (gMeme.lines.length) gMeme.lineIdx++
        gMeme.lines.push(newLine)
}


function changeLine() {
    gMeme.lineIdx++
        if (!gMeme.lines[gMeme.lineIdx]) gMeme.lineIdx = 0;

}


function deleteLine() {
    if (gMeme.lineIdx === 0) gMeme.lines[gMeme.lineIdx].txt = ''
    else {
        gMeme.lines.splice(gMeme.lineIdx, 1)
        gMeme.lineIdx--
    }
}



function changeFont(font) {
    gMeme.lines[gMeme.lineIdx].fontStyle = font
}


function changeFontSize(incOrDec) {
    gMeme.lines[gMeme.lineIdx].fontSize
    gMeme.lines[gMeme.lineIdx].fontSize += (incOrDec === 'inc') ? 1 : -1
}

function changeAlign(direc) {
    gMeme.lines[gMeme.lineIdx].align = direc
}

function changeStrokeColor(strokeColor) {
    gMeme.lines[gMeme.lineIdx].strokeColor = strokeColor;

}

function changeFillColor(fillColor) {
    gMeme.lines[gMeme.lineIdx].fillColor = fillColor

}


function setChangeTxt(ev, txt) {
    console.log(gMeme.lines[gMeme.lineIdx]);
    gMeme.lines[gMeme.lineIdx].txt = txt
}


function createMeme(imgId) {
    gMeme = {
            id: makeId(),
            imgId,
            lineIdx: 0,
            lines: [{
                txt: '',
                fontSize: 40,
                fontWidth: '2',
                fontStyle: 'Impact',
                align: 'left',
                fillColor: 'black',
                strokeColor: 'black',
                offsetX: 80,
                offsetY: 80
            }]

        }
        // if (!gMemes) gMemes = [gMeme]
        // else gMemes.push(gMeme)
        // console.log(gMemes);
}


function setCanvasSizes(width, height) {
    var currLine = gMeme.lines[gMeme.lineIdx]
    var x;
    var y;
    console.log(currLine.align);
    switch (currLine.align) {
        case 'right':
            x = width - 90
            y = (height + currLine.fontSize + 10) / 6
            break;

        case 'center':
            x = width / 2
            y = (height + currLine.fontSize + 10) / 6
            break;
        case 'left':
            x = 80
            y = (height + currLine.fontSize + 10) / 6
            break;

    }
    console.log(x, y);
    gMeme.lines[gMeme.lineIdx].offsetX = x
    gMeme.lines[gMeme.lineIdx].offsetY = y

    // gMeme.canvasWidth = width
    // gMeme.canvasHeight = height
    // console.log(width, height);
}

function getImgs() {
    return gImgs;
}


function findImgById(id) {
    var img = gImgs.find(img => {
        return img.id === id
    })
    return img

}