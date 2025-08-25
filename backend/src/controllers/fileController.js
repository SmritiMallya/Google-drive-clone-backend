import supabase from "../services/supabaseClient.js";
import { uploadToStorage, listFromStorage, deleteFromStorage } from "../services/fileService.js";

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    if (!req.user || !req.user.id) return res.status(401).json({ error: "User not authenticated" });

    const path = `${req.user.id}/${req.file.originalname}`;
    const result = await uploadToStorage(path, req.file.buffer);

    res.json({ success: true, path: result.path });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const listFiles = async (req, res) => {
  try {
    if (!req.user || !req.user.id) return res.status(401).json({ error: "User not authenticated" });
    const files = await listFromStorage(req.user.id + "/");
    res.json({ files });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteFile = async (req, res) => {
  try {
    if (!req.user || !req.user.id) return res.status(401).json({ error: "User not authenticated" });
    const filename = req.params.filename;
    await deleteFromStorage(`${req.user.id}/${filename}`);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const shareFile = async (req, res) => {
  try {
    if (!req.user || !req.user.id) return res.status(401).json({ error: "User not authenticated" });
    const { filename, recipientId } = req.body;
    if (!filename || !recipientId) return res.status(400).json({ error: "Missing fields" });

    // Save share record in DB (custom table: shares)
    const { error } = await supabase.from("shares").insert({
      owner_id: req.user.id,
      recipient_id: recipientId,
      file: filename,
    });

    if (error) throw error;
    res.json({ success: true, message: "File shared!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
