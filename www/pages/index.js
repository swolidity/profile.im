import "isomorphic-unfetch";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

const responseFacebook = response => {
  console.log(response);
};

const Index = ({ users }) => (
  <div>
    <FacebookLogin
      appId={process.env.FACEBOOK_APP_ID}
      fields="name,email,picture"
      callback={responseFacebook}
      redirectUri={`${process.env.API_URL}/login`}
      isMobile={true}
      render={renderProps => (
        <button onClick={renderProps.onClick}>Login with Facebook</button>
      )}
    />

    <div>{users.length} profiles made!</div>

    {users.map(user => (
      <div key={user._id}>
        <a href={`/${user.username}`}>{user.username}</a>
      </div>
    ))}
  </div>
);

Index.getInitialProps = async () => {
  const res = await fetch(`${process.env.API_URL}/users`);
  const users = await res.json();

  return { users };
};

export default Index;
