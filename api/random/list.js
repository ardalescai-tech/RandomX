export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = typeof req.body === "string"
      ? JSON.parse(req.body)
      : req.body;

    const { items, pick = 1, unique = true } = body;

    let arr = items.split("\n").filter(x => x.trim() !== "");

    if (unique && pick > arr.length) {
      return res.status(400).json({ error: "Too few items for unique picks" });
    }

    const result = [];

    for (let i = 0; i < pick; i++) {
      const index = Math.floor(Math.random() * arr.length);
      result.push(arr[index]);
      if (unique) arr.splice(index, 1);
    }

    res.status(200).json({ results: result });

  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
}

