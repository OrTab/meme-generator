'use strict'

function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

function loadFromStorage(key) {
    var json = localStorage.getItem(key)
    var value = JSON.parse(json)
    return value;
}