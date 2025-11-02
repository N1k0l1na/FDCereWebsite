import { listFolders } from "../../../lib/drive";
export default async function handler(req,res){
  try{
    const { yearId } = req.query;
    if(!yearId) return res.status(400).json({ error:"missing_yearId" });
    const subs=await listFolders(yearId);
    res.setHeader("Cache-Control","public, max-age=60");
    res.json({ subs });
  }catch(e){ res.status(500).json({ error:"subalbums_failed" }); }
}
