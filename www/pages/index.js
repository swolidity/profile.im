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
      redirectUri="https://profile.im/login"
      isMobile={true}
      render={renderProps =>
        <button onClick={renderProps.onClick}>Login with Facebook</button> ||
        console.log("Andy")
      }
    />

    <div>{users.length} profiles made!</div>

    {users.map(user => (
      <div key={user._id}>{user.username}</div>
    ))}
  </div>
);

Index.getInitialProps = async () => {
  const res = await fetch(`${process.env.API_URL}/users`);
  const users = await res.json();

  return { users };
};

export default Index;
