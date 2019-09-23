import "isomorphic-unfetch";
import Layout from "../components/Layout";

import Answer from "../components/Answer";

const Users = ({ user, answers }) => {
  return (
    <Layout>
      <div className="user-profile">
        <div className="profile-top">
          <img className="profile-pic" src={user.picture} alt={user.name} />
          <div>
            <div className="name">Andy Kay</div>
            <div className="username">@{user.username}</div>
          </div>
        </div>

        <div className="bio">{user.bio}</div>

        <div className="views">
          <span className="bold">{user.profile_views}</span> views
        </div>

        {answers.map(answer => (
          <Answer answer={answer} user={user} key={answer._id} />
        ))}

        <style jsx>
          {`
            .user-profile {
              max-width: 960px;
              margin: 0 auto;
              padding: 16px;
            }
            .profile-top {
              display: flex;
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
