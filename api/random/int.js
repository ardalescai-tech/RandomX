export default function handler(req, res) {
  const { min = 1, max = 100, count = 1 } = req.query;

  const results = [];
  for (let i = 0; i < Number(count); i++) {
    const n =
      Math.floor(Math.random() * (Number(max) - Number(min) + 1)) +
      Number(min);
    results.push(n);
  }

  res.status(200).json({ results });
}
