//LOCK by Sourceboxtv
document.getElementById("generateButton").addEventListener("click", async () => {
    try {
        const apiKey = "AIzaSyCzB9WKTpbtITUut1hTZzSV72aoMbL990A"; // Your actual API key
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
        const prompt = `Generate a pun about ads where AI humorously complains about being charged too much for ads, saying something like, "You’re ripping my company off! I paid so much money for this!"`;
        const requestBody = {
            contents: [{
                parts: [{ text: prompt}]
            }]
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        const data = await response.json();

        if (response.ok) {
            const generatedText = data.contents[0].parts[0].text; // Adjust this based on the actual response structure
            document.getElementById("contentText").innerText = generatedText;
        } else {
            document.getElementById("contentText").innerText = `Error: ${data.error.message}`;
        }

    } catch (error) {
        console.error('Error:', error);
        document.getElementById("contentText").innerText = 'Error generating content.';
    }
});