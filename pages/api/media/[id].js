import { getDrive } from "../../../lib/drive";

export default async function handler(req, res) {
  try {
    const drive = getDrive();
    const { id } = req.query;

    // stream original file
    const result = await drive.files.get({ fileId: id, alt: "media" }, { responseType: "stream" });

    // Cache at the CDN (Vercel) for a day, allow stale while revalidating
    res.setHeader("Cache-Control", "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800");
    res.setHeader("Content-Disposition", "inline");

    result.data.pipe(res);
  } catch {
    res.status(404).end();
  }
}
