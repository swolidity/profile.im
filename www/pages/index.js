import "isomorphic-unfetch";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

const responseFacebook = response => {
  console.log(response);
};

const Index = ({ users }) => (
  <div>
    <FacebookLogin
      appId="2815966931762706"
      fields="name,email,picture"
      callback={responseFacebook}
      redirectUri="http://profile.im/login"
      render={renderProps => (
        <button onClick={renderProps.onClick}>Login with Facebook</button>
      )}
    />

    <div>{users.length} profiles made!</div>

    {users.map(user => (
      <div>{user.username}</div>
    ))}
  </div>
);

Index.getInitialProps = async () => {
  const res = await fetch(`${process.env.API_URL}/users`);
  const users = await res.json();

  return { users };
};

export default Index;
