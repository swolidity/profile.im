import Meta from "./meta";
import { createClient, TippleProvider } from "tipple";
import Link from "next/link";

const client = createClient({ baseUrl: process.env.API_URL });

const Layout = ({ children }) => {
  return (
    <div>
      <Meta />

      <div className="header">
        <Link href="/">
          <a className="logo">profile.im</a>
        </Link>
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
            font-size: 25px;
            font-weight: bold;
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
