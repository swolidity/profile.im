import "isomorphic-unfetch";
import Layout from "../components/Layout";

import Answer from "../components/Answer";

const Users = ({ user, answers }) => {
  return (
    <Layout>
      <div className="user-profile">
        <div className="profile-top">
          <div className="container">
            <img className="profile-pic" src={user.picture} alt={user.name} />
            <div>
              <div className="name">Andy Kay</div>
              <div className="username">@{user.username}</div>
            </div>
          </div>
        </div>

        <div className="stuffs">
          <div className="bio">{user.bio}</div>

          <div className="views">
            <span className="bold">{user.profile_views}</span> views
          </div>

          {answers.map(answer => (
            <Answer answer={answer} user={user} key={answer._id} />
          ))}
        </div>

        <style jsx>
          {`
            .profile-top {
              background: aliceblue;
            }
            .profile-top > .container {
              max-width: 960px;
              margin: 0 auto;
              display: flex;
              padding: 32px 16px;
              margin-bottom: 32px;
            }
            .profile-pic {
              height: 80px;
              border-radius: 50%;
              margin-right: 24px;
            }
            .name {
              font-size: 34px;
              font-weight: bold;
            }
            .username {
              font-size: 24px;
              font-weight: 500;
              margin-bottom: 4px;
            }
            .stuffs {
              max-width: 960px;
              margin: 0 auto;
              padding: 16px;
            }
            .bio {
              margin-bottom: 16px;
            }
            .views {
              margin-bottom: 32px;
            }
            .title {
              font-size: 12px;
              font-weight: bold;
              margin-bottom: 4px;
            }
            .bold {
              font-weight: bold;
            }
          `}
        </style>
      </div>
    </Layout>
  );
};

Users.getInitialProps = async ({ query: { username } }) => {
  const res = await fetch(`${process.env.API_URL}/user_profile/${username}`);
  const json = await res.json();

  return { user: json.user, answers: json.answers };
};

export default Users;
