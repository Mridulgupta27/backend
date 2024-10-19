const express = require("express");
const axios = require("axios");
const cors = require("cors"); // To handle cross-origin requests
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const port = 8000;

app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json()); // Parse JSON data

app.get("/", (req, res) => {
  res.send("Hello, World! This is the backend server.");
});

app.post("/generate_calendar", async (req, res) => {
  // Destructure parameters from the request body
  const { url, platform, from_date, to_date, input_text } = req.body;
  let data = req.body;
  console.log(req.body, "Params");
  console.log({ url, platform, from_date, to_date, input_text });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `https://ai-sm-calendar-api-357644217967.us-central1.run.app/generate_calendar`,
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      // Use params instead of embedding in URL
      url: `${url}/`,
      platform,
      from_date,
      to_date,
      input_text,
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    console.log(response.data);
    res.json(response.data); // Send the generated data back to the frontend
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error generating calendar data" });
  }
});

app.post("/generate_blog", async (req, res) => {
  // Destructure parameters from the request body
  const { topic, tone, word_count, reference_link, custom_keywords } = req.body;
  let data = req.body;
  console.log(req.body, "Params");
  console.log({ topic, tone, word_count, reference_link, custom_keywords });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `https://ai-blog-writer-api-357644217967.us-central1.run.app/generate_blog`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    console.log(response.data);
    res.json(response.data); // Send the generated data back to the frontend
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error generating blog data" });
  }
});


app.listen(port, () => {
  console.log(`Server started at port: ${port}`);
});
