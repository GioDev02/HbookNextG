import Head from "next/head";

export function Seo(props) {
    const {
        title = "Libros - Tus lecturas favoritas",
        description = "Encuentra novelas, textos académicos y libros de todo tipo al mejor precio.",
    } = props;

    return ( //TODO: Todas las metaetiquetas que quiera
        <Head>
            <title>{title}</title>
            <meta property="description" content={description} />
        </Head>
    );
}