import { Helmet } from "react-helmet-async";

/** Keeps private/utility routes (admin, 404) out of search results. */
const NoIndex = ({ title = "Roadlink Tours and Travels" }: { title?: string }) => (
  <Helmet>
    <title>{title}</title>
    <meta name="robots" content="noindex, nofollow" />
  </Helmet>
);

export default NoIndex;
