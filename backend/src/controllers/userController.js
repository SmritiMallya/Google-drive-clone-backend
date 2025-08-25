export const getProfile = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ error: "User not authenticated" });
    res.json({ user: req.user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
