// LOCK by Jamie
adBlk = document.getElementById("ad-box");
arr = ['ad1.png','ad2.jpg','ad3.webp','ad4.avif','ad5.png','ad6.jpg','ad7.png','ad8.png','ad9.webp','ad10.png','ad11.jpg']

for (let i = 0; i < 12; i++) {
    adBlk.innerHTML += '<div id="ad'+i+'" onclick="resetAd('+i+')"><img src="imgs/'+ arr[i] +'" style="max-width:100%; max-height:100%;" alt="Advertisement"></div>'
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function resetAd(count) {
    console.log(count)
    adBlk2 = document.getElementById("ad"+count);
    adBlk2.innerHTML = '<img src="imgs/'+ arr[getRandomInt(0,arr.length-1)] +'" style="max-width:100%; max-height:100%;" alt="Advertisement">'
}
// UNLOCK by Jamie
