import "isomorphic-unfetch";

const Users = ({ user, answers }) => (
  <div>
    User: {user.username}
    <ul>
      {answers.map(answer => (
        <li>
          {answer.title}:{" "}
          <a href={answer.link} target="_blank">
            {answer.answer}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

Users.getInitialProps = async ({ query: { username } }) => {
  const res = await fetch(`${process.env.API_URL}/user_profile/${username}`);
  const json = await res.json();

  return { user: json.user, answers: json.answers };
};

export default Users;
