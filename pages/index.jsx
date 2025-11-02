import Layout from "../components/Layout";
import Link from "next/link";
import { useLang } from "../lib/lang-context";
import { useEffect, useMemo, useRef, useState } from "react";

export default function HomePage() {
  const { t } = useLang();
  const [slides, setSlides] = useState([]);
  const [idx, setIdx] = useState(0);
  const timer = useRef(null);

  useEffect(() => {
    fetch("/api/home/hero").then(r=>r.json()).then(d=>{
      const imgs = (d.images || []).slice(0, 12); // cap to 12 for perf
      setSlides(imgs);
      // preload first two
      imgs.slice(0,2).forEach(s => { const i=new Image(); i.src=`/api/media/${s.id}`; });
    });
    return () => clearInterval(timer.current);
  }, []);

  useEffect(() => {
    clearInterval(timer.current);
    if (slides.length < 2) return;
    timer.current = setInterval(() => setIdx(i => (i + 1) % slides.length), 4000);
    return () => clearInterval(timer.current);
  }, [slides]);

  const go = (n) => setIdx(i => (i + n + slides.length) % slides.length);

  return (
    <Layout>
      {/* hero slider */}
      <section className="hero" role="region" aria-label="Slideshow">
        {slides.map((s, i) => (
          <div
            key={s.id}
            className={`hero-slide ${i === idx ? "active" : ""}`}
            style={{ "--bg": `url('/api/media/${s.id}')` }}
          >
            <img src={`/api/media/${s.id}`} alt={s.name} loading={i === 0 ? "eager" : "lazy"} />
          </div>
        ))}
        {slides.length > 1 && (
          <>
            <button className="hero-btn hero-prev" onClick={() => go(-1)} aria-label="Previous">‹</button>
            <button className="hero-btn hero-next" onClick={() => go(+1)} aria-label="Next">›</button>
            <div className="hero-controls">
              {slides.map((_, i) => (
                <button
                  key={i}
                  className={`hero-dot ${i === idx ? "active" : ""}`}
                  onClick={() => setIdx(i)}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </section>
      <section style={{ padding: "56px 0", textAlign: "center", background:"linear-gradient(180deg, rgba(11,29,58,.06), transparent)" }}>
        <div className="container">
          <h1 style={{ margin: 0, fontSize: 40, color: "var(--fdcere-navy)" }}>{t.hero?.title}</h1>
          <p style={{ marginTop: 8, color: "#555" }}>{t.hero?.subtitle}</p>
          <div style={{ marginTop: 24 }}>
            <Link href="/gallery" className="btn">{t.gallery?.cta}</Link>
          </div>
        </div>
      </section>
      <section id="about" className="container" style={{ padding:"28px 0" }}>
        <h2 style={{ color:"var(--fdcere-navy)" }}>{t.about.title}</h2>
        <p>{t.about.body}</p>
      </section>

      <section className="container" style={{ padding:"28px 0" }}>
        <div className="grid" style={{ gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))", gap:16 }}>
          <div className="card"><h3>{t.gallery.title}</h3><Link className="btn" href="/gallery">{t.gallery.cta}</Link></div>
          <div className="card"><h3>{t.events.title}</h3><Link className="btn" href="/events">{t.events.cta}</Link></div>
          <div className="card"><h3>{t.members.title}</h3><Link className="btn" href="/members">{t.members.cta}</Link></div>
        </div>
      </section>
    </Layout>
  );
}
