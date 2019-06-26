import "isomorphic-unfetch";

const Users = ({ user, answers }) => (
  <div>
    <div>
      <img src={user.picture} alt={user.name} />
    </div>
    <div>User: {user.username}</div>
    <div>views: {user.profile_views}</div>
    {answers.map(answer => (
      <div key={answer._id}>
        {answer.title}:{" "}
        <a href={answer.link} target="_blank">
          {answer.answer}
        </a>
      </div>
    ))}
  </div>
);

Users.getInitialProps = async ({ query: { username } }) => {
  const res = await fetch(`${process.env.API_URL}/user_profile/${username}`);
  const json = await res.json();

  return { user: json.user, answers: json.answers };
};

export default Users;
