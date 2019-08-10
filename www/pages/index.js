import "isomorphic-unfetch";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import UserList from "../components/UserList";
import Layout from "../components/layout";

const Index = ({ users }) => (
  <Layout>
    <div className="homepage">
      <h2 className="profiles-count">{users.length} PROFILES MADE</h2>

      <div className="sign-up">
        <FacebookLogin
          appId={process.env.FACEBOOK_APP_ID}
          fields="name,email,picture"
          redirectUri={`${process.env.API_URL}/login`}
          isMobile={true}
          render={renderProps => (
            <button onClick={renderProps.onClick}>Login with Facebook</button>
          )}
        />
      </div>

      <UserList users={users} />

      <style jsx>{`
        .homepage {
          max-width: 800px;
          margin: 0 auto;
        }
        .profiles-count {
          text-align: center;
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
