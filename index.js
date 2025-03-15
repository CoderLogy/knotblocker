// LOCK by Jamie
adBlk = document.getElementById("ad-box");
arr = ['ad1.png','ad2.jpg','ad3.webp','ad4.avif','ad5.png','ad6.jpg','ad7.png','ad8.png','ad9.webp','ad10.png','ad11.jpg'];

for (let i = 0; i < 10; i++) {
     adBlk.innerHTML += '<div id="ad'+i+'" style="display: inline-block; padding: 0;"><img src="imgs/'+ arr[i] +'" onclick="resetAd('+i+')" style="max-width:300px; max-height:300px; display: block;" alt="Advertisement"></div>';
     
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function resetAd(count) {
    console.log(count);
    adBlk2 = document.getElementById("ad"+count);
    adBlk2.innerHTML = '<img src="imgs/'+ arr[getRandomInt(0, arr.length - 1)] +'" style="max-width:300px; max-height:300px;" alt="Advertisement">';
}
// UNLOCK by Jamie

