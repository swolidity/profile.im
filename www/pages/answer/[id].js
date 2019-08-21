import Layout from "../../components/layout";
import "isomorphic-unfetch";

const Answer = ({ answer }) => <Layout>{answer.title}</Layout>;

Answer.getInitialProps = async ({ query: { id } }) => {
  const res = await fetch(`${process.env.API_URL}/answer/${id}`);
  const json = await res.json();

  return { answer: json.answer };
};

export default Answer;
