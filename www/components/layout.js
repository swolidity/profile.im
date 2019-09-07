import Meta from "./meta";
import Link from "next/link";
import LoginButton from "./LoginButton";
import { useLoggedInUser } from "../hooks/useLoggedInUser";

const Layout = ({ children }) => {
  const user = useLoggedInUser();

  return (
    <div>
      <Meta />

      <div className="header">
        <Link href="/">
          <a className="logo">
            <img height="45" src="/static/logo.png" alt="profile.im" />
          </a>
        </Link>

        {user ? (
          <Link href="/[username]" as={`/${user.username}`}>
            <a>
              <img
                className="profile-pic"
                src={user.picture}
                alt={user.username}
              />
            </a>
          </Link>
        ) : (
          <LoginButton />
        )}
      </div>

      <main className="main">{children}</main>

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
          .profile-pic {
            height: 45px;
            width: 45px;
            border-radius: 50%;
          }
        `}
      </style>
    </div>
  );
};

export default Layout;
