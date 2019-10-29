const Page = ({ page }) => {
  return <div>{page.title}</div>;
};

Page.getInitialProps = async ({ query: { username, slug } }) => {
  const res = await fetch(`${process.env.API_URL}/item/${slug}`);
  return await res.json();
};

export default Page;
