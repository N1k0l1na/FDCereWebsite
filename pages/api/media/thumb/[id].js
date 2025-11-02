import { getDrive } from "../../../../lib/drive";
import fetch from "node-fetch";

export const config = { api: { responseLimit: "8mb" } };

export default async function handler(req,res){
  try{
    const drive=getDrive(); const { id }=req.query;
    const meta = await drive.files.get({ fileId:id, fields:"thumbnailLink" });
    const url = meta.data.thumbnailLink;
    if(!url) return res.redirect(307, `/api/media/${id}`);
    // fetch with auth header (thumbnailLink requires auth)
    const token = await drive.context._options.auth.getAccessToken();
    const r = await fetch(url, { headers:{ Authorization:`Bearer ${token}` } });
    if(!r.ok) return res.redirect(307, `/api/media/${id}`);
    res.setHeader("Cache-Control","public, max-age=86400, immutable");
    r.body.pipe(res);
  }catch{ res.status(404).end(); }
}
