export default function handler(req, res) {
  let { items, count = 1, unique = "true" } = req.query;

  if (!items) return res.status(400).json({ error: "No items provided" });

  items = items.split("\n").filter(x => x.trim() !== "");
  count = Number(count);

  if (unique === "true" && count > items.length)
    return res.status(400).json({ error: "Not enough unique items" });

  const results = [];
  for (let i = 0; i < count; i++) {
    const index = Math.floor(Math.random() * items.length);
    results.push(items[index]);
    if (unique === "true") items.splice(index, 1);
  }

  res.status(200).json({ results });
}
