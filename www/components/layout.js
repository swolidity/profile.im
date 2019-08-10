import Meta from "./meta";
import { createClient, TippleProvider } from "tipple";
import Link from "next/link";

const client = createClient({ baseUrl: process.env.API_URL });

const Layout = ({ children }) => {
  return (
    <div>
      <Meta />

      <div className="header">
        <h1>
          <Link href="/">
            <a className="logo">profile.im</a>
          </Link>
        </h1>
      </div>
      <TippleProvider client={client}>{children}</TippleProvider>

      <style jsx>
        {`
          .header {
            padding: 16px;
          }
          .logo {
            text-decoration: none;
            color: black;
          }
          logo:visited: {
            color: black;
          }
        `}
      </style>
    </div>
  );
};

export default Layout;
