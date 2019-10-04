import Layout from "../../components/Layout";
import "isomorphic-unfetch";
import AnswerLarge from "../../components/AnswerLarge";
import Head from "next/head";

const QuestionPage = ({ question }) => (
  <Layout>
    <Head>
      <title>{question.title}</title>

      <meta property="og:title" content={`${question.title}`} />

      <meta property="og:image" content={question.user.picture} />
    </Head>

    <div className="question-page">
      <h2>{question.title}</h2>
    </div>

    <style jsx>
      {`
        .question-page {
          padding-top: 32px;
          max-width: 600px;
          margin: 0 auto;
        }
      `}
    </style>
  </Layout>
);
QuestionPage.getInitialProps = async ({ query: { id } }) => {
  const res = await fetch(`${process.env.API_URL}/question/${id}`);
  const json = await res.json();

  return { question: json.question };
};

export default QuestionPage;
