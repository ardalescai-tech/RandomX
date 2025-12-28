export default function handler(req, res) {
  const { items } = JSON.parse(req.body);

  const results = [...items].sort(() => Math.random() - 0.5);

  return res.status(200).json({ success: true, results });
}
