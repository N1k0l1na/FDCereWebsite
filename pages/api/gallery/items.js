import { listMedia } from "../../../lib/drive";
export default async function handler(req,res){
  try{
    const { albumId } = req.query;
    if(!albumId) return res.status(400).json({ error:"missing_albumId" });
    const items=await listMedia(albumId);
    res.setHeader("Cache-Control","public, max-age=60");
    res.json({ items });
  }catch(e){ res.status(500).json({ error:"items_failed" }); }
}
