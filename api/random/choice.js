export default function handler(req, res) {
  const { items, count, unique } = req.body;

  let list = [...items];
  let results = [];

  for (let i = 0; i < count; i++) {
    const index = Math.floor(Math.random() * list.length);
    results.push(list[index]);
    if (unique) list.splice(index, 1);
  }

  return res.status(200).json({ success: true, results });
}
