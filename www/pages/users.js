import "isomorphic-unfetch";

const Users = ({ user }) => <div>User: {user.username}</div>;

Users.getInitialProps = async ({ query: { username } }) => {
  const res = await fetch(`${process.env.API_URL}/user_profile/${username}`);
  const json = await res.json();

  return { user: json };
};

export default Users;
