import Link from "next/link";
import Linkify from "react-linkify";
import Card from "./Card";
import AnswerBy from "./AnswerBy";

const Answer = ({ answer }) => {
  return (
    <div>
      <div className="answer">
        <div className="question-header">
          <Link href="/answer/[id]" as={`/answer/${answer._id}`}>
            <a>{answer.title}</a>
          </Link>

          <AnswerBy user={answer.user} answer_id={answer._id} />
        </div>

        <div className="content">
          <Linkify properties={{ target: "_blank" }}>{answer.content}</Linkify>
        </div>

        {answer.oembed ? <Card data={answer.oembed} /> : null}
      </div>

      <a className="add-answer-button" href="#">
        Answer this question
      </a>

      <style jsx>
        {`
          .answer {
            margin-bottom: 32px;
            background: #fff;
          }
          .answer a {
            font-size: 28px;
            margin-bottom: 8px;
            text-decoration: none;
            display: block;
          }
          .question-header {
            font-size: 18px;
            padding-bottom: 8px;
            font-weight: 600;
            margin-bottom: 10px;
            border-bottom: 1px solid #f8f8f8;
          }
          .question-header a {
            color: #000;
          }
          .answer img {
            width: 80px;
            height: 80px;
            margin-right: 16px;
          }

          .content {
            margin-bottom: 8px;
          }
          .content-title {
            margin-bottom: 6px;
          }
          .content-description {
            font-size: 12px;
          }
          .add-answer-button {
            padding: 12px;
            border: 1px solid #005aff;
            color: #005aff;
            font-weight: bold;
            border-radius: 6px;
            text-decoration: none;
          }
        `}
      </style>
    </div>
  );
};

export default Answer;
