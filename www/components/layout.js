import Meta from "./meta";
import { createClient, TippleProvider } from "tipple";

const client = createClient({ baseUrl: process.env.API_URL });

const Layout = ({ children }) => {
  return (
    <div>
      <Meta />
      <TippleProvider client={client}>{children}</TippleProvider>
    </div>
  );
};

export default Layout;
