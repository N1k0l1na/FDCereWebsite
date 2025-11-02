import { google } from "googleapis";

let driveClient;
const memCache = new Map();

function cacheGet(key){const hit=memCache.get(key);if(!hit)return null;if(Date.now()>hit.expires){memCache.delete(key);return null;}return hit.value;}
function cacheSet(key,val,ttl=300){memCache.set(key,{value:val,expires:Date.now()+ttl*1000});}

export function getDrive(){
  if (driveClient) return driveClient;
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  });
  driveClient = google.drive({ version: "v3", auth });
  return driveClient;
}

export async function listFolders(parentId){
  const k=`folders:${parentId}`;const c=cacheGet(k);if(c)return c;
  const drive=getDrive();
  const res=await drive.files.list({
    q: `'${parentId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
    fields:"files(id,name,createdTime,modifiedTime)",
    orderBy:"name_natural",
    pageSize:1000
  });
  cacheSet(k,res.data.files,Number(process.env.CACHE_TTL_SECONDS)||300);
  return res.data.files;
}

export async function listMedia(albumId){
  const k=`media:${albumId}`;const c=cacheGet(k);if(c)return c;
  const drive=getDrive();
  const res=await drive.files.list({
    q: `'${albumId}' in parents and trashed = false and (mimeType contains 'image/' or mimeType contains 'video/')`,
    fields:"files(id,name,mimeType,imageMediaMetadata(width,height),videoMediaMetadata(width,height),modifiedTime)",
    orderBy:"modifiedTime desc",
    pageSize:1000
  });
  const items=(res.data.files||[]).map(f=>{
    const dims=f.imageMediaMetadata||f.videoMediaMetadata||{};
    return { id:f.id, name:f.name, type:f.mimeType?.startsWith("image/")?"image":"video", width:dims.width||null, height:dims.height||null };
  });
  cacheSet(k,items,Number(process.env.CACHE_TTL_SECONDS)||300);
  return items;
}
