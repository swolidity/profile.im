import "isomorphic-unfetch";
import Layout from "../components/layout";

const Users = ({ user, answers }) => (
  <Layout>
    <div className="user-profile">
      <div className="profile-top">
        <img src={user.picture} alt={user.name} />
        <div>
          <div className="username">{user.username}</div>
          <div className="views">{user.profile_views} views</div>
          <div className="bio">{user.bio}</div>
        </div>
      </div>

      {answers.map(answer => (
        <div key={answer._id}>
          {answer.title}:{" "}
          <a href={answer.link} target="_blank">
            {answer.answer}
          </a>
        </div>
      ))}

      <style jsx>
        {`
          .user-profile {
            max-width: 800px;
            margin: 0 auto;
          }
          .profile-top {
            display: flex;
            margin: 18px 0;
          }
          img {
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
        `}
      </style>
    </div>
  </Layout>
);

Users.getInitialProps = async ({ query: { username } }) => {
  const res = await fetch(`${process.env.API_URL}/user_profile/${username}`);
  const json = await res.json();

  return { user: json.user, answers: json.answers };
};

export default Users;
