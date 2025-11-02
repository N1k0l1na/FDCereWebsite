import { getDrive } from "../../../../lib/drive";

export const config = { api: { responseLimit: "8mb" } };

export default async function handler(req, res) {
  const { id } = req.query;
  try {
    const drive = getDrive();

    // ask Drive for thumbnail URL
    const meta = await drive.files.get({ fileId: id, fields: "thumbnailLink" });
    let url = meta.data.thumbnailLink;

    // request a sensible size for the grid (Drive supports =s###)
    // e.g. ...=s220 ⇒ change to 400px (crisper but still small)
    if (url.includes("=s")) url = url.replace(/=s\d+/, "=s400");
    else url += (url.includes("?") ? "&" : "?") + "s=400";

    // fetch with auth
    const auth = drive.context._options.auth;
    const tokenObj = await auth.getAccessToken();
    const token = typeof tokenObj === "string" ? tokenObj : tokenObj?.token;
    const r = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });

    if (!r.ok || !r.body) return res.redirect(307, `/api/media/${id}`);

    // CDN cache for a week, clients can cache a day
    res.setHeader("Cache-Control", "public, max-age=86400, s-maxage=604800, stale-while-revalidate=604800");
    r.body.pipe(res);
  } catch {
    res.redirect(307, `/api/media/${id}`);
  }
}
