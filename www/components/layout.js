import Meta from "./meta";
import { createClient, TippleProvider } from "tipple";

const client = createClient({ baseUrl: process.env.API_URL });

export default ({ children }) => (
  <div>
    <Meta />

    <TippleProvider client={client}>{children}</TippleProvider>
  </div>
);
