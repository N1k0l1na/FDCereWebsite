import { getDrive } from "../../../lib/drive";
export default async function handler(req,res){
  try{
    const drive=getDrive(); const { id }=req.query;
    const result=await drive.files.get({ fileId:id, alt:"media" }, { responseType:"stream" });
    res.setHeader("Cache-Control","public, max-age=86400, immutable");
    result.data.pipe(res);
  }catch{ res.status(404).end(); }
}
