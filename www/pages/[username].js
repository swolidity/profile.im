import "isomorphic-unfetch";
import Layout from "../components/layout";

import { useFetch } from "tipple";
import Answer from "../components/Answer";

const Users = ({ user, answers }) => {
  return (
    <Layout>
      <div className="user-profile">
        <div className="profile-top">
          <img className="profile-pic" src={user.picture} alt={user.name} />
          <div>
            <div className="username">@{user.username}</div>
            <div className="views">{user.profile_views} views</div>
          </div>
        </div>

        {answers.map(answer => (
          <Answer answer={answer} user={user} key={answer._id} />
        ))}

        <style jsx>
          {`
            .profile-top {
              display: flex;
              margin: 18px 0;
            }
            .profile-pic {
              height: 80px;
              border-radius: 50%;
              margin-right: 40px;
            }
            .username {
              font-size: 36px;
              font-weight: bold;
              margin-bottom: 4px;
            }
            .views {
              font-size: 18px;
            }
            .title {
              font-size: 12px;
              font-weight: bold;
              margin-bottom: 4px;
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
