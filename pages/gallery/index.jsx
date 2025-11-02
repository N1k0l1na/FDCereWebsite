import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useLang } from "../../lib/lang-context";

export default function GalleryHome() {
  const [years, setYears] = useState([]);
  const { t } = useLang();
  useEffect(()=>{ fetch("/api/gallery/albums").then(r=>r.json()).then(d=>setYears(d.years||[])); },[]);
  return (
    <Layout>
      <div className="container" style={{ padding:"24px 0" }}>
        <h1 style={{ color:"var(--fdcere-navy)" }}>{t.nav.gallery}</h1>
        <div className="grid grid-auto">
          {years.map(y=>(
            <Link key={y.id} href={`/gallery/${y.id}`} className="tile">
              <div className="cap">{y.name}</div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
