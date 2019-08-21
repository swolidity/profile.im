import Layout from "../../components/layout";
import "isomorphic-unfetch";
import Answer from "../../components/AnswerLarge";
import AddToAnswer from "../../components/AddToAnswer";

const AnswerPage = ({ answer }) => (
  <Layout>
    <AddToAnswer answerID={answer._id} />
    <Answer answer={answer} />
  </Layout>
);
AnswerPage.getInitialProps = async ({ query: { id } }) => {
  const res = await fetch(`${process.env.API_URL}/answer/${id}`);
  const json = await res.json();

  return { answer: json.answer };
};

export default AnswerPage;
