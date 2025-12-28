export default function handler(req, res) {
  const min = parseInt(req.query.min || "1");
  const max = parseInt(req.query.max || "100");
  const count = parseInt(req.query.count || "1");

  const results = Array.from({ length: count }, () =>
    Math.floor(Math.random() * (max - min + 1)) + min
  );

  return res.status(200).json({ success: true, results });
}
