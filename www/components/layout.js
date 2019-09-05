import Meta from "./meta";
import { createClient, TippleProvider } from "tipple";
import Link from "next/link";
import LoginButton from "./LoginButton";

const client = createClient({ baseUrl: process.env.API_URL });

const Layout = ({ children }) => {
  return (
    <div>
      <Meta />

      <div className="header">
        <Link href="/">
          <a className="logo">
            <img height="45" src="/static/logo.png" alt="profile.im" />
          </a>
        </Link>

        <LoginButton />
      </div>
      <TippleProvider client={client}>
        <main className="main">{children}</main>
      </TippleProvider>

      <style jsx>
        {`
          .header {
            padding: 32px;
            display: flex;
            justify-content: space-between;
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
          .main {
            max-width: 800px;
            margin: 0 auto;
          }
        `}
      </style>
    </div>
  );
};

export default Layout;
