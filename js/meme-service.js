'use strict'
var gMemes;
var gMeme;
var gCountLines = 0;
var gKeywordsMap;

var gImgs = [
    { id: 1, url: 'imgs-canvas/2.jpg', keywords: ['All', 'Happy', 'Nature'] },
    { id: 2, url: 'imgs-canvas/003.jpg', keywords: ['All', 'Funny', 'Celeb', 'Men', 'Angry'] },
    { id: 3, url: 'imgs-canvas/004.jpg', keywords: ['All', 'Love', 'Animals', 'Cute'] },
    { id: 4, url: 'imgs-canvas/005.jpg', keywords: ['All', 'Love', 'Animals', 'Sleep', 'Cute'] },
    { id: 5, url: 'imgs-canvas/006.jpg', keywords: ['All', 'Funny', 'Succes'] },
    { id: 6, url: 'imgs-canvas/5.jpg', keywords: ['All', 'Funny', 'Angry', 'Cute'] },
    { id: 7, url: 'imgs-canvas/8.jpg', keywords: ['All', 'Men', 'Love'] },
    { id: 8, url: 'imgs-canvas/9.jpg', keywords: ['All', 'Funny'] },
    { id: 9, url: 'imgs-canvas/12.jpg', keywords: ['All', 'Men'] },
    { id: 10, url: 'imgs-canvas/19.jpg', keywords: ['All', 'Men', 'Funny', 'Angry'] },
    { id: 11, url: 'imgs-canvas/Ancient-Aliens.jpg', keywords: ['All', 'Men', 'Movies', 'Explanation'] },
    { id: 12, url: 'imgs-canvas/drevil.jpg', keywords: ['All', 'Victory', 'Funny', 'Men'] },
    { id: 13, url: 'imgs-canvas/img2.jpg', keywords: ['All', 'Funny', 'Victory'] },
    { id: 14, url: 'imgs-canvas/img4.jpg', keywords: ['All', 'Funny', 'Men', 'Angry', 'Celeb'] },
    { id: 15, url: 'imgs-canvas/img5.jpg', keywords: ['All', 'Cute', 'Happy'] },
    { id: 17, url: 'imgs-canvas/img11.jpg', keywords: ['All', 'Happy', 'Funny', 'Men', 'Celeb'] },
    { id: 18, url: 'imgs-canvas/img12.jpg', keywords: ['All', 'Men', 'Akward'] },
    { id: 19, url: 'imgs-canvas/leo.jpg', keywords: ['All', 'Happy', 'Men', 'Celeb'] },
    { id: 20, url: 'imgs-canvas/meme1.jpg', keywords: ['All', 'Men', 'Mystery', 'Movies'] },
    { id: 21, url: 'imgs-canvas/One-Does-Not-Simply.jpg', keywords: ['All', 'Explanation', 'Men'] },
    { id: 22, url: 'imgs-canvas/Oprah-You-Get-A.jpg', keywords: ['All', 'Women', 'Victory', 'Happy', 'Celeb'] },
    { id: 23, url: 'imgs-canvas/patrick.jpg', keywords: ['All', 'Akward', 'Funny'] },
    { id: 24, url: 'imgs-canvas/putin.jpg', keywords: ['All', 'Men', 'Explanation', 'Celeb'] },
    { id: 25, url: 'imgs-canvas/X-Everywhere.jpg', keywords: ['All', 'Explanation', 'Movies'] }
];


function getMeme() {
    return gMeme;
}

function setNewLine(height) {
    gCountLines++
    var currLine = gMeme.lines[gMeme.lineIdx]
    var newLine = {...currLine }
    newLine.txt = 'Create Your Meme'
    newLine.offsetX = currLine.offsetX
    if (gMeme.lines.length >= 1) {
        gMeme.lineIdx++
            gMeme.lineIdx = gCountLines
    }
    if (gCountLines === 1) {
        newLine.offsetY = (height - currLine.fontSize - 10)
    }
    if (gMeme.lineIdx === 2) {
        newLine.offsetY = gMeme.lines[0].offsetY + 50
    }
    if (gCountLines > 2) {
        newLine.offsetY = gMeme.lines[gMeme.lines.length - 1].offsetY + 50
    }
    gMeme.lines.push(newLine)
}

function changeLine() {
    gMeme.lineIdx++
        if (!gMeme.lines[gMeme.lineIdx]) gMeme.lineIdx = 0;
}

function deleteLine() {
    if (gMeme.lines.length === 1) gMeme.lines[gMeme.lineIdx].txt = 'Create Your Meme'
    else {
        gMeme.lines.splice(gMeme.lineIdx, 1)
        if (gMeme.lineIdx) gMeme.lineIdx--
    }
    if (gCountLines) gCountLines--
}

function changeFont(font) {
    console.log(font);
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

function createMeme(imgId, height) {
    gMeme = {
        id: makeId(),
        imgId,
        isMark: true,
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
    var currLine = gMeme.lines[gMeme.lineIdx]
    if (!gCountLines) currLine.offsetY = (height + currLine.fontSize + 10) / 8

}

function setLinesCords(width) {
    gMeme.lines.forEach(line => {

        switch (line.align) {
            case 'right':
                line.offsetX = width - 60
                break;

            case 'center':
                line.offsetX = width / 2
                break;

            case 'left':
                line.offsetX = width * 0.12
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


function imgsKeyWords() {
    var keywords = gImgs.map(img => {
        return img.keywords
    })

    var keywords = keywords.reduce((acc, key) => {
        key.forEach(word => {
            acc.push(word)
        })
        return acc
    }, [])

    gKeywordsMap = keywords.reduce((acc, key) => {
        if (!acc[key]) acc[key] = 1
        else acc[key] += 1
        return acc
    }, {})
}

function imgsForDisplay(keyword) {
    var imgs = []
    gImgs.forEach(img => {
        img.keywords.forEach((key) => {
            if (key === keyword)
                imgs.push(img)

        })
    })
    return imgs
}

function getkeywords() {
    imgsKeyWords()
    var keywords = Object.keys(gKeywordsMap)
    return keywords
}

function uploadImg(elForm, ev) {
    ev.preventDefault();
    document.getElementById('imgData').value = gCanvas.toDataURL("image/jpeg");

    function onSuccess(uploadedImgUrl) {
        uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.share-container').innerHTML = `
        <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share To Facebook </a>`
    }
    doUploadImg(elForm, onSuccess);
}

function doUploadImg(elForm, onSuccess) {
    var formData = new FormData(elForm);
    fetch('http://ca-upload.com/here/upload.php', {
            method: 'POST',
            body: formData
        })
        .then(function(res) {
            return res.text()
        })
        .then(onSuccess)
        .catch(function(err) {
            console.error(err)
        })
}