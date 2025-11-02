import Layout from "../../components/Layout";
import { useLang } from "../../lib/lang-context";

export default function EventsPage(){
  const { t } = useLang();
  return (
    <Layout>
      <main style={{ padding: 24 }}>
        <h1>{t.nav.events}</h1>
        <p>Kalendar dolazi uskoro... / Events calendar coming soon...</p>
      </main>
    </Layout>
  );
}
