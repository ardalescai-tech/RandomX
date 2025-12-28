export default function handler(req, res) {
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { faces = 6, count = 1 } = req.query;
  const rolls = [];

  for (let i = 0; i < count; i++) {
    rolls.push(Math.floor(Math.random() * faces) + 1);
  }

  res.status(200).json({ results: rolls });
}

