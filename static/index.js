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

function resetAd(count) {
    console.log(count);
    const adBlk2 = document.getElementById("ad" + count);
    const randomImage = arr[getRandomInt(0, arr.length - 1)];

    // Reset the ad with a new image and its corresponding click event
    adBlk2.innerHTML = '<img src="static/images/' + randomImage + '" onclick="resetAd(' + count + ')" style="max-width:100px; max-height:100px;" alt="Advertisement">';

    // Directly attach the speech functionality on click without adding a new event listener
    adBlk2.querySelector('img').onclick = async function () {
        const prompt = "Generate a pun where an AI humorously reacts to a user closing their ads after spending a lot on them, saying something like: 'After all that money I paid, you really have the audacity to close my ads? Talk about a budget cut! use this prompt as example generate unique message and please don't say something like this at starting Okay, here's a pun-filled reaction an AI might give after a user closes its ads after spending a lot of money on them. Also make sure it not more than 20 words.'";

        function speakText(text) {
            let speech = new SpeechSynthesisUtterance(text);
            speech.lang = "en-US"; // Change language if needed
            speech.rate = 1.7; // Adjust speed (0.5 = slow, 2 = fast)
            speech.pitch = 0.5; // Adjust pitch
            speech.volume = 1; // Adjust volume (0 to 1)

            window.speechSynthesis.speak(speech);
        }

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
                speakText(data.text);
                document.getElementById('punOutput').textContent = data.text;
            } else {
                document.getElementById('punOutput').textContent = 'Error: ' + (data.error || 'Unknown error');
            }

        } catch (error) {
            console.error('Error:', error);
            document.getElementById('punOutput').textContent = 'Error: ' + error.message;
        }
    };
}
