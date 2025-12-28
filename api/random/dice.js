export default function handler(req, res) {
  try {
    const { items, pick = 1, unique = true } = req.body;
    let arr = items.split("\n").filter(x => x.trim() !== "");

    const result = [];
    for (let i = 0; i < pick; i++) {
      const index = Math.floor(Math.random() * arr.length);
      result.push(arr[index]);
      if (unique) arr.splice(index, 1);
    }

    res.status(200).json({ results: result });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
}
