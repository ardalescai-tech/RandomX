export default function handler(req, res) {
  const flip = Math.random() < 0.5 ? "Heads" : "Tails";
  res.status(200).json({ result: flip });
}
