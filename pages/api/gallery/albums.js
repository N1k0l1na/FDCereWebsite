import { listFolders } from "../../../lib/drive";
export default async function handler(req,res){
  try{
    const years=await listFolders(process.env.DRIVE_ROOT_FOLDER_ID);
    res.setHeader("Cache-Control","public, max-age=60");
    res.json({ years });
  }catch(e){ res.status(500).json({ error:"albums_failed" }); }
}
