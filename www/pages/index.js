import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

const responseFacebook = response => {
  console.log(response);
};

export default () => (
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
  </div>
);
