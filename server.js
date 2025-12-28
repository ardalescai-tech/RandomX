const express = require("express");
const path = require("path");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

function randomInt(min, max) {
  return crypto.randomInt(min, max + 1);
}

// RANDOM INTEGER GENERATOR API
// GET /api/random/int?min=&max=&count=
app.get("/api/random/int", (req, res) => {
  try {
    const min = parseInt(req.query.min ?? "0", 10);
    const max = parseInt(req.query.max ?? "100", 10);
    let count = parseInt(req.query.count ?? "1", 10);

    if (isNaN(min) || isNaN(max) || isNaN(count)) {
      return res.status(400).json({ success: false, error: "Invalid parameters" });
    }

    // RANGE LIMITS  ±1,000,000,000
    if (min < -1000000000 || max > 1000000000) {
      return res.status(400).json({
        success: false,
        error: "Values must be between -1,000,000,000 and 1,000,000,000"
      });
    }

    if (max < min) {
      return res.status(400).json({ success: false, error: "Max must be >= Min" });
    }

    // COUNT LIMIT 1 → 20,000
    if (count < 1 || count > 20000) {
      return res.status(400).json({
        success: false,
        error: "Count must be between 1 and 20000"
      });
    }

    const results = [];
    for (let i = 0; i < count; i++) {
      results.push(randomInt(min, max));
    }

    res.json({ success: true, min, max, count, results });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`RandomX server running on http://localhost:${PORT}`);
});
