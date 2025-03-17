// LOCK by Jamie
adBlk = document.getElementById("ad-box");
arr = ['ad1.png', 'ad2.jpg', 'ad3.webp', 'ad4.avif', 'ad5.png', 'ad6.jpg', 'ad7.png', 'ad8.png', 'ad9.webp', 'ad10.png', 'ad11.jpg'];

for (let i = 0; i < 12; i++) {
    adBlk.innerHTML += '<div id="ad' + i + '" onclick="resetAd(' + i + ')" style="display: inline-block; padding: 0;"><img src="static/images/' + arr[i] + '" style="max-width:100px; max-height:100px;"></div>';
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function speakText(text) {
    let speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US"; // Change language if needed
    speech.rate = 1.9; // Adjust speed (0.5 = slow, 2 = fast)
    speech.pitch = 0.3; // Adjust pitch
    speech.volume = 1; // Adjust volume (0 to 1)

    window.speechSynthesis.speak(speech);
}
async function timedResponse(){
    {
        const prompt = "Create a unique, under-20-word pun where corporations humorously mock a user for blocking ads or avoiding data tracking. Occasionally, criticize users for trusting corporations while exposing corporate greed for money and data. Avoid repeating the corporate spending angle, and do not reference AI or its background operations. Use first-person narration that makes the user feel mocked by corporations for not allowing their data to be mined and ripping user off for millions of dollars and please ask user to stop this behaviour.";
        try {
            const response = await fetch('/generate-pun', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ prompt: prompt })
            });

            if (!response.ok) {
                console.error(`HTTP error! status: ${response.status}`);
                document.getElementById('punOutput').textContent = `Error: HTTP ${response.status}`;
                return;
            }

            const responseText = await response.text();
            console.log("Raw response:", responseText); // Log the raw response

            if (!responseText) {
                document.getElementById('punOutput').textContent = "Error: Empty response from server.";
                return;
            }

            const data = JSON.parse(responseText);

            if (data.text) {
                setTimeout(() => {
                    speakText(data.text);
                    Swal.fire({
                        title: 'Stop it!',
                        text: data.text,
                        icon: 'warning',
                        confirmButtonText: 'Cool',
                        backdrop: false
                    })
                }, 1000);
            } else {
                document.getElementById('punOutput').textContent = 'Error: ' + (data.error || 'Unknown error');
            }

        } catch (error) {
            console.error('Error:', error);
            document.getElementById('punOutput').textContent = 'Error: ' + error.message;
        }
    };
};

function resetAd(count) {
    console.log(count);
    const adBlk2 = document.getElementById("ad" + count);
    const randomImage = arr[getRandomInt(0, arr.length - 1)];

    // Reset the ad with a new image and its corresponding click event
    setTimeout(() => {
        // Add the image to the element
        adBlk2.innerHTML = `
        <img src="static/images/${randomImage}" onclick="resetAd(${count})" style="max-width:100px; max-height:100px;" alt="Advertisement" class="advertisement">
    `;

        // After 3 seconds, add the 'snap' class to the image to trigger the animation
        const adImage = adBlk2.querySelector('img');

        setTimeout(() => {
            adImage.classList.add('snap');
        }, 100); // Small delay to ensure the image is displayed before starting the animation
        setTimeout(() => {
            adImage.classList.remove('snap'); // Remove the 'snap' class to stop the animation
            adImage.classList.add('reverse-snap'); // Add the 'reverse-snap' class to reverse the animation
        }, 3000); // Reverse the effect after 3 seconds
    }, 500);
    // Directly attach the speech functionality on click without adding a new event listener
    adBlk2.querySelector('img').onclick = timedResponse()
}
