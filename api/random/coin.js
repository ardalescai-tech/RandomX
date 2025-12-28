export default function handler(req, res) {
  const result = Math.random() < 0.5 ? "Heads" : "Tails";
  return res.status(200).json({ success: true, result });
}

