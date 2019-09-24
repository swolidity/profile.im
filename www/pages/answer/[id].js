import Layout from "../../components/Layout";
import "isomorphic-unfetch";
import Answer from "../../components/Answer";
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

    <div className="answer-page">
      <Answer answer={answer} />
    </div>

    <style jsx>
      {`
        .answer-page {
          max-width: 960px;
          margin: 0 auto;
        }
      `}
    </style>
  </Layout>
);
AnswerPage.getInitialProps = async ({ query: { id } }) => {
  const res = await fetch(`${process.env.API_URL}/answer/${id}`);
  const json = await res.json();

  return { answer: json.answer };
};

export default AnswerPage;
