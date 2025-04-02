const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 9876;
const WINDOW_SIZE = 10;
const windowNumbers = [];

const API_URLS = {
  p: "http://20.244.56.144/evaluation-service/primes",
  f: "http://20.244.56.144/evaluation-service/fibo",
  e: "http://20.244.56.144/evaluation-service/even",
  r: "http://20.244.56.144/evaluation-service/rand",
};

const fetchNumbers = async (type, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
        console.log(`Fetching numbers for type: ${type} (Attempt ${i + 1})`);
      const response = await axios.get(API_URLS[type], { timeout: 500 });

      console.log("API Response:", response.data); // Debugging Log

      if (response.data && Array.isArray(response.data.numbers)) {
        return response.data.numbers;
      } else {
        console.error("Unexpected API Response Format:", response.data);
      }
    } catch (error) {
        console.warn(`Attempt ${i + 1} failed: ${error.message}`);

    }
  }
  return []; 
};


const calculateAverage = (arr) => {
  if (arr.length === 0) return 0;
  const sum = arr.reduce((acc, num) => acc + num, 0);
  return parseFloat((sum / arr.length).toFixed(2));
};


app.get("/numbers/:numberid", async (req, res) => {
  const { numberid } = req.params;

  if (!API_URLS[numberid]) {
    return res.status(400).json({ error: "Invalid number type" });
  }

  const newNumbers = await fetchNumbers(numberid);
  const windowPrevState = [...windowNumbers];

  if (newNumbers.length > 0) {
    newNumbers.forEach((num) => {
      if (!windowNumbers.includes(num)) {
        if (windowNumbers.length >= WINDOW_SIZE) {
          windowNumbers.shift(); // Remove oldest number
        }
        windowNumbers.push(num);
      }
    });
  }

  res.json({
    windowPrevState,
    windowCurrState: [...windowNumbers],
    numbers: newNumbers,
    avg: calculateAverage(windowNumbers),
  });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
