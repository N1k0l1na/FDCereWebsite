import Link from "next/link";
import { useLang } from "../lib/lang-context";
import "yet-another-react-lightbox/styles.css";


export default function Layout({ children }) {
  const { lang, setLang, t } = useLang();

  return (
    <div style={{ minHeight: "100dvh", display: "grid", gridTemplateRows: "auto 1fr auto" }}>
      <header className="fdcere-header">
        <div className="container" style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 0" }}>
          <Link href="/" className="fdcere-brand">
            <img src="/logo-fdcere.png" alt="FD Cere" width="42" height="42" style={{ display:"block" }} />
            <span>FD Cere</span>
          </Link>

          <nav className="fdcere-nav">
            <Link href="/" className="fdcere-link">{t.nav.home}</Link>
            <Link href="/gallery" className="fdcere-link">{t.nav.gallery}</Link>
            <Link href="/events" className="fdcere-link">{t.nav.events}</Link>
            <Link href="/members" className="fdcere-link">{t.nav.members}</Link>
            <Link href="/contact" className="fdcere-link">{t.nav.contact}</Link>
            <Link href="/about" className="fdcere-link">{t.nav.about}</Link>
            <div style={{ marginLeft:12 }}>
              <button className="fdcere-badge" onClick={() => setLang("hr")} aria-pressed={lang==="hr"}>HR</button>
              <button className="fdcere-badge" onClick={() => setLang("en")} aria-pressed={lang==="en"} style={{ marginLeft:8 }}>EN</button>
            </div>
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer className="fdcere-footer">
        <div className="container" style={{ padding:"12px 0", fontSize:12 }}>
          © {new Date().getFullYear()} Folklorno društvo &quot;Cere&quot; - Žminj · {t.footer?.rights || ""}
        </div>
      </footer>
    </div>
  );
}
