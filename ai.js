//LOCK by Sourceboxtv
document.getElementById("generateButton").addEventListener("click", async () => {
    try {
        // Replace this with actual API call and model code
        const adName = "mcdonalds.jpg"; // Example ad name
        const prompt = `Generate a pun about ${adName} where AI humorously complains about being charged too much for ads, saying something like, "You’re ripping my company off! I paid so much money for this!"`;

        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result = await model.generateContent(prompt);

        // Display the generated pun in the <p> element
        document.getElementById("punText").innerText = result.response.text();
    } catch (error) {
        console.error("Error generating pun:", error);
    }
});