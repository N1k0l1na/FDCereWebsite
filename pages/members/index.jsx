import Layout from "../../components/Layout";
import { useLang } from "../../lib/lang-context";

export default function MembersPage(){
  const { t } = useLang();
  return (
    <Layout>
      <main style={{ padding: 24 }}>
        <h1>{t.nav.members}</h1>
        <p>Popis članova i sekcija dolazi uskoro / Members listing coming soon.</p>
      </main>
    </Layout>
  );
}
