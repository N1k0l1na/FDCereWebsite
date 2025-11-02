import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "../../components/Layout";
import { useLang } from "../../lib/lang-context";

export default function YearPage() {
  const router = useRouter();
  const { query } = router;
  const { t, lang } = useLang();
  const [subs, setSubs] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!query.yearId) return;
    fetch(`/api/gallery/subalbums?yearId=${query.yearId}`)
      .then(r => r.json())
      .then(d => { setSubs(d.subs || []); setErr(d.error || ""); })
      .catch(e => setErr(e.message));
  }, [query.yearId]);

  return (
    <Layout>
      <div className="container" style={{ padding: "24px 0" }}>
        <button
          onClick={() => router.push("/gallery")}
          style={{
            marginBottom: 20, background: "var(--fdcere-gold)", border: "none",
            color: "var(--fdcere-navy)", padding: "8px 16px", borderRadius: 10,
            cursor: "pointer", fontWeight: 600
          }}
        >
          ← {lang === "hr" ? "Natrag" : "Back"}
        </button>

        <h1 style={{ color: "var(--fdcere-navy)" }}>{t.nav.gallery}</h1>
        {err && <p style={{ color: "crimson" }}>{err}</p>}

        <div className="grid" style={{ gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:16 }}>
          {subs.map(s => (
            <Link key={s.id} href={`/gallery/${query.yearId}/${s.id}`} className="tile">
              <div className="cap">{s.name}</div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
