import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";

export default () => (
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

    <style jsx>{`
      .facebook-signup-button {
        display: inline-block;
        margin-bottom: 32px;
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
    `}</style>
  </div>
);
