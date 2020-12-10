'use strict'
var gMemes;
var gMeme;
var gCountLines = 0;
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

function setNewLine(height) {
    var currLine = gMeme.lines[gMeme.lineIdx]
    var newLine = {...currLine }
    newLine.txt = 'Create Your Meme'
    newLine.offsetX = currLine.offsetX
    if (gMeme.lines.length) gMeme.lineIdx++
        if (gMeme.lineIdx === 1) {
            newLine.offsetY = (height - currLine.fontSize - 10)
        }
    gMeme.lines.push(newLine)
    gCountLines++
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
    gMeme.lines.forEach(line => {
        line.align = direc
    })
}

function changeStrokeColor(strokeColor) {
    gMeme.lines[gMeme.lineIdx].strokeColor = strokeColor;

}

function changeFillColor(fillColor) {
    gMeme.lines[gMeme.lineIdx].fillColor = fillColor

}

function setChangeTxt(txt) {
    if (txt === '') txt = 'Create Your Meme'
    gMeme.lines[gMeme.lineIdx].txt = txt
}

function createMeme(imgId) {
    gMeme = {
        id: makeId(),
        imgId,
        lineIdx: 0,
        lines: [{
            txt: 'Create Your Meme',
            fontSize: 35,
            fontWidth: '2',
            fontStyle: 'Impact',
            align: 'left',
            fillColor: 'black',
            strokeColor: 'black',
            offsetX: 0,
            offsetY: 0,
        }]

    }
    gCountLines = 0
        // if (!gMemes) gMemes = [gMeme]
        // else gMemes.push(gMeme)
        // console.log(gMemes);
}

function setCanvasSizes(width, height) {
    var currLine = gMeme.lines[gMeme.lineIdx]
    if (!gCountLines) currLine.offsetY = (height + currLine.fontSize + 10) / 8
    gMeme.lines.forEach(line => {
        // var currLine = gMeme.lines[gMeme.lineIdx]

        var x;
        switch (line.align) {
            case 'right':
                line.offsetX = width - 60
                    // if (!line.countsLines) line.offsetY = (height + line.fontSize + 10) / 8
                break;

            case 'center':
                line.offsetX = width / 2
                    // if (!line.countsLines) line.offsetY = (height + line.fontSize + 10) / 8
                break;
            case 'left':
                line.offsetX = width * 0.12
                    // if (!line.countsLines) line.offsetY = (height + line.fontSize + 10) / 8
                break;
        }
    })
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