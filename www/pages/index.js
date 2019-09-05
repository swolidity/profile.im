import "isomorphic-unfetch";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import UserList from "../components/UserList";
import Layout from "../components/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import LoginButton from "../components/LoginButton";

const Index = ({ users }) => (
  <Layout>
    <div className="homepage">
      <div className="center">
        <h1 className="profiles-count">{users.length} PROFILES MADE</h1>

        <LoginButton />
      </div>

      <UserList users={users} />

      <style jsx>{`
        .homepage {
          max-width: 800px;
          margin: 0 auto;
        }
        .center {
          text-align: center;
        }
        .profiles-count {
          text-align: center;
          margin: 24px 0;
        }
      `}</style>
    </div>
  </Layout>
);

Index.getInitialProps = async () => {
  const res = await fetch(`${process.env.API_URL}/users`);
  const users = await res.json();

  return { users };
};

export default Index;
