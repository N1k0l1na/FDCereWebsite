import Layout from "../../components/Layout";
import { useLang } from "../../lib/lang-context";

export default function AboutPage() {
  const { t, lang } = useLang();

  return (
    <Layout>
      <div className="container" style={{ padding: "40px 0", maxWidth: 800 }}>
        <h1 style={{ color: "var(--fdcere-navy)", marginBottom: 24 }}>
          {lang === "hr" ? "O nama" : "About us"}
        </h1>

        {lang === "hr" ? (
          <div style={{ lineHeight: 1.7, fontSize: "1.05rem" }}>
            <p>
              U našem malom, ali živopisnom selu Ceru, između Žminja i Barbana,
              već osam desetljeća plešemo, sviramo i pjevamo – mi, članovi
              Folklornog društva „Cere“. Ponosni smo što smo najstarije folklorno
              društvo u Istri, osnovano davne 1945. godine, i što sve te godine s
              ljubavlju čuvamo i prenosimo bogatstvo istarske narodne baštine.
            </p>
            <p>
              Sve je počelo zahvaljujući našem mještaninu Antunu (Toni) Rudanu –
              Starini iz sela Rudani. Njegova strast prema sopelama i narodnim
              napjevima potaknula je stvaranje društva koje je s vremenom postalo
              simbol našeg mjesta i cijelog Žminjskog kraja. Već 1956. godine
              preuzeli smo današnje ime – Folklorno društvo „Cere“ – i od tada s
              ponosom nastupamo diljem Hrvatske i Europe.
            </p>
            <p>
              S godinama su se kroz naše redove izmjenjivale generacije svirača,
              pjevača i plesača. Nastupali smo u Zagrebu, Trogiru, Sloveniji,
              Italiji, Belgiji, Švicarskoj, Austriji i mnogim drugim zemljama, a
              posebno smo ponosni što smo kao prvi u Istri snimili gramofonsku
              ploču „Pjesma i svirka iz Istre“.
            </p>
            <p>
              Danas naše društvo okuplja oko 30 djece i 20 odraslih članova.
              Djeca su podijeljena u dvije skupine – mlađu i stariju – a svi
              zajedno učimo i prenosimo istarske plesove i pjesme, od mantinjade
              do našeg prepoznatljivog ceranskog baluna. Na probama i nastupima
              sviraju harmonike, roženice i sopile, a svaka proba završava s puno
              smijeha, prijateljstva i ponosa.
            </p>
            <p>
              Kroz osamdeset godina djelovanja ostali smo vjerni svojoj misiji:
              čuvati tradiciju, okupljati zajednicu i prenositi ljubav prema
              folkloru na nove generacije. Ove, 2025. godine, slavimo velikih 80
              godina našeg postojanja – uz plesnjake, izložbe, projekcije starih
              filmova i početak rada na monografiji koja će objediniti sve što
              jesmo.
            </p>
            <p>
              Naša su vrata uvijek otvorena. Ako želite biti dio naše folklorne
              obitelji, pridružite nam se svakog petka u društvenom domu u Ceru –
              jer folklor za nas nije samo tradicija, nego način života.
            </p>
          </div>
        ) : (
          <div style={{ lineHeight: 1.7, fontSize: "1.05rem" }}>
            <p>
              In our small yet lively village of Cere, between Žminj and Barban,
              we’ve been dancing, playing, and singing for eight decades – we,
              the members of the Folklore Ensemble &quot;Cere&quot;. We are proud to be the
              oldest folklore group in Istria, founded back in 1945, and to have
              lovingly preserved and passed down the richness of Istrian folk
              heritage through all these years.
            </p>
            <p>
              It all began thanks to our villager Antun (Toni) Rudan – “Starina”
              from Rudani. His passion for the sopile and traditional melodies
              inspired the founding of a society that became a symbol of our
              village and the entire Žminj area. In 1956, we adopted our current
              name – Folklore Ensemble “Cere” – and since then have proudly
              performed across Croatia and Europe.
            </p>
            <p>
              Over the years, generations of musicians, singers, and dancers have
              come through our ranks. We have performed in Zagreb, Trogir,
              Slovenia, Italy, Belgium, Switzerland, Austria, and many other
              countries, and we are especially proud to be the first in Istria to
              record a vinyl album: “Song and Music from Istria”.
            </p>
            <p>
              Today, our society brings together around 30 children and 20 adult
              members. The children are divided into two groups – younger and
              older – and together we learn and perform Istrian dances and songs,
              from the mantinjada to our well-known Ceranski balun. Our rehearsals
              and performances feature accordions, roženice, and sopile, and every
              practice ends with plenty of laughter, friendship, and pride.
            </p>
            <p>
              Throughout eight decades of work, we have remained true to our
              mission: to preserve tradition, unite the community, and pass on
              our love for folklore to new generations. In 2025, we celebrate 80
              years of our existence – with dance nights, exhibitions, screenings
              of old films, and the start of work on a monograph that will bring
              together everything we are.
            </p>
            <p>
              Our doors are always open. If you wish to be part of our folklore
              family, join us every Friday at the community hall in Cere – because
              folklore for us is not just tradition, but a way of life.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
