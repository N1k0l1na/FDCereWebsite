// pages/api/home/hero.js
import { listMedia } from "../../../lib/drive";

export default async function handler(req, res) {
  try {
    const id = process.env.DRIVE_HOME_FOLDER_ID;
    if (!id) return res.status(400).json({ error: "missing_HOME_folder_id" });
    const items = await listMedia(id);
    // keep only images
    const images = items.filter(i => i.type === "image");
    res.setHeader("Cache-Control", "public, max-age=60");
    res.json({ images });
  } catch (e) {
    res.status(500).json({ error: "hero_failed" });
  }
}
