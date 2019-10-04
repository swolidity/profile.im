import Link from "next/link";
import Linkify from "react-linkify";
import Card from "./Card";
import { formatDistanceToNow } from "date-fns";

const Answer = ({ answer }) => {
  return (
    <div className="answer">
      <div className="question-header">
        <Link href="/answer/[id]" as={`/answer/${answer._id}`}>
          <a>{answer.title}</a>
        </Link>

        <div className="created_at">
          {formatDistanceToNow(new Date(answer.created_at))}
        </div>
      </div>

      <div className="content">
        <Linkify properties={{ target: "_blank" }}>{answer.content}</Linkify>
      </div>

      {answer.oembed ? <Card data={answer.oembed} /> : null}

      <style jsx>
        {`
          .answer {
            margin-bottom: 32px;
            background: #fff;
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
              0 1px 2px 0 rgba(0, 0, 0, 0.06) !important;
            padding: 16px;
            border-radius: 5px;
          }
          .answer a {
            font-size: 16px;
            text-decoration: none;
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
          .created_at {
            font-size: 12px;
            font-weight: 400;
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
        `}
      </style>
    </div>
  );
};

export default Answer;
