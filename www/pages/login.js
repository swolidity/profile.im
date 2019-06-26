import "isomorphic-unfetch";

const Index = ({ user }) => {
  return <div>login</div>;
};

Index.getInitialProps = async ({ query: { code } }) => {
  const res = await fetch(`${process.env.API_URL}/login?code=${code}`);
  const user = await res.json();

  return { user };
};

export default Index;
