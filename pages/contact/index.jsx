import { useState } from "react";
import Layout from "../../components/Layout";
import { useLang } from "../../lib/lang-context";

export default function ContactPage() {
  const { t } = useLang();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setStatus("loading");

  try {
    const res = await fetch("https://formspree.io/f/xzzkoyrb", { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        message: form.message,
      }),
    });

    if (res.ok) {
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } else {
      setStatus("fail");
    }
  } catch (err) {
    setStatus("fail");
  }
};

  return (
    <Layout>
      <div className="container" style={{ padding: "40px 0", maxWidth: 700 }}>
        <h1 style={{ color: "var(--fdcere-navy)" }}>{t.contact.title}</h1>
        <p>{t.contact.info}</p>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16, marginTop: 20 }}>
          <div>
            <label>{t.contact.name}</label><br />
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
            />
          </div>

          <div>
            <label>{t.contact.email}</label><br />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
            />
          </div>

          <div>
            <label>{t.contact.message}</label><br />
            <textarea
              name="message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            style={{
              border: "1px solid var(--fdcere-gold)",
              background: "var(--fdcere-gold)",
              color: "var(--fdcere-navy)",
              fontWeight: 600,
              padding: "10px 16px",
              borderRadius: 10,
              cursor: "pointer"
            }}
          >
            {t.contact.send}
          </button>

          {status === "success" && (
            <p style={{ color: "green" }}>{t.contact.success}</p>
          )}
          {status === "fail" && (
            <p style={{ color: "crimson" }}>{t.contact.fail}</p>
          )}
        </form>

        <div style={{ marginTop: 40 }}>
          <h3>Folklorno društvo “Cere” - Žminj</h3>
          <p>
            Adresa: Cere 3/A, 52341 Žminj, Hrvatska<br />
            Email: <a href="mailto:folklornodrustvo.cere@gmail.com">folklornodrustvo.cere@gmail.com</a><br />
            Instagram: <a href="https://www.instagram.com/fd_cere/">@fd_cere</a><br />
            Facebook: <a href="https://www.facebook.com/profile.php?id=61559102394950" target="_blank" rel="noreferrer">facebook.com/fdcere</a>
          </p>
        </div>
      </div>
    </Layout>
  );
}
