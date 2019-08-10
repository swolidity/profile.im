import "isomorphic-unfetch";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import UserList from "../components/UserList";
import Layout from "../components/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";

const Index = ({ users }) => (
  <Layout>
    <div className="homepage">
      <div className="center">
        <h2 className="profiles-count">{users.length} PROFILES MADE</h2>

        <div className="facebook-signup-button">
          <FacebookLogin
            appId={process.env.FACEBOOK_APP_ID}
            fields="name,email,picture"
            redirectUri={`${process.env.API_URL}/login`}
            isMobile={true}
            render={renderProps => (
              <div onClick={renderProps.onClick}>
                <span className="facebook-icon">
                  <FontAwesomeIcon icon={faFacebookSquare} />
                </span>{" "}
                Sign Up with Facebook
              </div>
            )}
          />
        </div>
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
        }
        .facebook-signup-button {
          display: inline-block;
          margin: 16px 0;
          padding: 12px;
          background-color: #4c6ef5;
          border-radius: 5px;
          font-size: 16px;
          font-weight: bold;
          color: #fff;
          cursor: pointer;
        }
        .facebook-icon {
          color: #fff;
          margin-right: 8px;
        }
        .sign-up {
          text-align: center;
          margin-bottom: 28px;
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
