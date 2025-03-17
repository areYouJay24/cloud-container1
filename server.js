const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const fs = require("fs");

const app = express();
app.use(bodyParser.json());

// Test CICD
// Test CICD
// Test CICD

app.post("/store-file", (req, res) => {
    const { file, data } = req.body;

    if (!file) {
        return res.status(400).json({
            file: null,
            error: "Invalid JSON input."
        });
    }

    const filePath = `/jaykumar_PV_dir/${file}`;

    try {
        fs.writeFileSync(filePath, data);
        return res.json({
            file: file,
            message: "Success."
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            file: file,
            error: "Error while storing the file to the storage."
        });
    }
});

app.post("/calculate", async (req, res) => {
    const { file, product } = req.body;

    if (!file) {
        return res.status(400).json({
            file: null,
            error: "Invalid JSON input."
        });
    }

    try {
        const response = await axios.post("http://container2-service:6001/calculate", {
            file,
            product
        });
        return res.json(response.data);
    } catch (error) {
        if (error.response) {
            return res.status(error.response.status).json(error.response.data);
        }
        return res.status(500).json({
            file,
            error: "Error processing request"
        });
    }
});

const PORT = 6000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Container 1 listening on port ${PORT}`);
});