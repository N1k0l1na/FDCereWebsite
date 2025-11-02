/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import { useLang } from "../../../lib/lang-context";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function AlbumPage() {
  const router = useRouter();
  const { query } = router;
  const { t, lang } = useLang();
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!query.albumId) return;
    fetch(`/api/gallery/items?albumId=${query.albumId}`)
      .then((r) => r.json())
      .then((d) => {
        setItems(d.items || []);
        setErr(d.error || "");
      })
      .catch((e) => setErr(e.message));
  }, [query.albumId]);
  
  // preload first image (and next one for smoother lightbox)
  useEffect(() => {
    if (!items.length) return;
    const preload = (i) => {
      const img = new Image();
      img.src = `/api/media/${items[i].id}`;
    };
    preload(0);
    if (items.length > 1) preload(1);
  }, [items]);

  return (
    <Layout>
      <div className="container" style={{ padding: "24px 0" }}>
        <button
          onClick={() => router.push(`/gallery/${query.yearId}`)}
          style={{
            marginBottom: 20,
            background: "var(--fdcere-gold)",
            border: "none",
            color: "var(--fdcere-navy)",
            padding: "8px 16px",
            borderRadius: 10,
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          ← {lang === "hr" ? "Natrag" : "Back"}
        </button>

        <h1 style={{ color: "var(--fdcere-navy)" }}>{t.nav.gallery}</h1>
        {err && <p style={{ color: "crimson" }}>{err}</p>}

        <div
          className="grid grid-auto"
          style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))" }}
        >
          {items.map((it, i) => (
            <div
              key={it.id}
              className="tile"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setIndex(i);
                setOpen(true);
              }}
            >
              <img
                src={`/api/media/thumb/${it.id}`}
                alt={it.name}
                loading="lazy"
                style={{ width: "100%", borderRadius: 10, objectFit: "cover" }}
              />
              <div className="cap">{it.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox viewer */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={items.map((it) => ({
          src: `/api/media/${it.id}`,
          alt: it.name,
        }))}
      />
    </Layout>
  );
}
