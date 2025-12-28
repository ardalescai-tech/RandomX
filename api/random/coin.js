export default function handler(req, res) {
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const flip = Math.random() < 0.5 ? "Heads" : "Tails";
  res.status(200).json({ result: flip });
}

