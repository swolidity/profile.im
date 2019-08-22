import "isomorphic-unfetch";
import Layout from "../components/layout";
import AddToProfile from "../components/AddToProfile";
import { useFetch } from "tipple";
import Answer from "../components/Answer";

const Users = ({ user, answers }) => {
  return (
    <Layout>
      <div className="user-profile">
        <div className="profile-top">
          <img className="profile-pic" src={user.picture} alt={user.name} />
          <div>
            <div className="username">{user.username}</div>
            <div className="views">{user.profile_views} views</div>
            <div className="bio">{user.bio}</div>
          </div>
        </div>

        <AddToProfile />

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
              height: 100px;
              border-radius: 50%;
              margin-right: 40px;
            }
            .username {
              font-size: 22px;
              font-weight: bold;
            }
            .views {
              font-size: 14px;
            }
            .bio {
              margin: 14px 0;
              font-size: 14px;
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
