export default function handler(req, res) {
  const faces = parseInt(req.query.faces || "6");
  const count = parseInt(req.query.count || "1");

  const results = Array.from({ length: count }, () =>
    Math.floor(Math.random() * faces) + 1
  );

  return res.status(200).json({ success: true, results });
}
