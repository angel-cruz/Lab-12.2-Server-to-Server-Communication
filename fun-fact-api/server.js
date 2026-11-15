
const express = require("express");
const axios = require("axios");

// Create the Express application
const app = express();

// Set the server port
const PORT = 3000;

// Create a GET route for a random fun fact
app.get("/api/fun-fact", async (req, res) => {

    try {
        // URL of the external API
        const apiUrl =
            "https://uselessfacts.jsph.pl/api/v2/facts/random";

        // Fetch a random fact using Axios
        const response = await axios.get(apiUrl);

        // Extract only the text from the API response
        const fact = response.data.text;

        // Send the fact back as JSON
        res.json({
            fact: fact
        });

    } catch (error) {

        // Log the error in the terminal
        console.error("Error fetching fact:", error.message);

        // Send an error response to the client
        res.status(500).json({
            error: "Could not fetch fun fact"
        });

    }

});
// Redirect the homepage to the fun fact API
app.get("/", (req, res) => {
    res.redirect("/api/fun-fact");
});

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
