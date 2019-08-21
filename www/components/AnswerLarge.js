import Link from "next/link";
import AnsweredBy from "../components/AnsweredBy";

const Answer = ({ answer }) => (
  <div className="answer">
    <div className="question-header">
      <Link href="/answer/[id]" as={`/answer/${answer._id}`}>
        <a>{answer.title}</a>
      </Link>
    </div>

    <div className="answered-by">
      <AnsweredBy user={answer.user} />
    </div>

    {answer.items.map((item, index) => (
      <div key={index}>
        {item.meta ? (
          <a href={item.meta.url} target="_blank">
            <div className="card">
              <div
                className="image box"
                style={{
                  width: "80px",
                  minWidth: "80px",
                  height: "80px",
                  backgroundImage: `url(${item.meta.image})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                  marginRight: "16px"
                }}
              />
              <div className="box content">
                <div className="content-title">{item.meta.title}</div>
              </div>
            </div>
          </a>
        ) : null}

        <div
          className="answer-content"
          dangerouslySetInnerHTML={{ __html: answer.content }}
        />
      </div>
    ))}

    <style jsx>
      {`
        .answer {
          margin-bottom: 18px;
        }
        .answer a {
          text-decoration: none;
          color: #000;
        }
        .question-header {
          padding: 8px 0;
          margin-bottom: 12px;
        }
        .question-header a {
          color: #000;
          font-size: 32px;
          font-weight: bold;
        }
        .answered-by {
          margin-bottom: 28px;
        }
        .answer img {
          width: 80px;
          height: 80px;
          margin-right: 16px;
        }
        .answer-content {
          padding: 8px;
        }
        .card {
          display: flex;
        }
        .card box {
          display: flex;
        }
        .content {
          padding: 8px 8px 8px 0;
        }
        .content-title {
          margin-bottom: 6px;
          font-weight: bold;
        }
        .content-description {
          font-size: 12px;
        }
      `}
    </style>
  </div>
);

export default Answer;
