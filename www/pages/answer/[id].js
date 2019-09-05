import Layout from "../../components/layout";
import "isomorphic-unfetch";
import Answer from "../../components/AnswerLarge";
import AddToAnswer from "../../components/AddToAnswer";
import Head from "next/head";

const AnswerPage = ({ answer }) => (
  <Layout>
    <Head>
      <title>
        Answer to {answer.title} by {answer.user.username}
      </title>

      <meta
        property="og:title"
        content={`Answer to ${answer.title} by ${answer.user.username}`}
      />

      <meta property="og:image" content={answer.user.picture} />
    </Head>
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