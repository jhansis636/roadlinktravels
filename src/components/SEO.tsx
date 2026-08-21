import { Helmet } from "react-helmet-async";

const SITE_URL = "https://roadlinktoursandtravels.com";
const DEFAULT_DESC =
  "Roadlink Tours and Travels — best taxi service in Coimbatore. 24/7 cab booking, airport taxi, outstation trips to Ooty, Munnar, Kodaikanal, Mysore, Valparai, luxury sedan rentals & tour packages.";

interface SEOProps {
  title: string;
  description?: string;
  path?: string;
  keywords?: string;
  schema?: Record<string, unknown> | Record<string, unknown>[];
  image?: string;
}

const SEO = ({ title, description = DEFAULT_DESC, path = "/", keywords, schema, image }: SEOProps) => {
  const url = `${SITE_URL}${path}`;
  const schemaArr = schema ? (Array.isArray(schema) ? schema : [schema]) : [];
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
      {schemaArr.map((s, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(s)}</script>
      ))}
    </Helmet>
  );
};

export default SEO;