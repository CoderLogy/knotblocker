// LOCK by Jamie
adBlk = document.getElementById("ad-box");
arr = ['ad0.png','ad1.png','ad2.jpg','ad3.webp','ad4.avif','ad5.png','ad6.jpg','ad7.png','ad8.png','ad9.webp','ad10.png','ad11.jpg']

for (let i = 0; i < 12; i++) {
    adBlk.innerHTML += '<div class="ad"><img src="imgs/'+ arr[i] +'" style="max-width:100%; max-height:100%;" alt="Advertisement"></div>'
}